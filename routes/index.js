const chatRoutes = require("./chat");
const relationships = require("./relationships");
const postsRoutes = require("./posts");
const loginRoutes = require("./loginRoutes");
//const workspaces = require("./workspaces");
const usersRoutes = require("./users");
const searchRoutes = require("./search");
const xss = require("xss");
const { RESTRICTED_PATHS_REGEX } = require("../constants/constants");

function constructRoutes(app) {
  // LOGGING MIDDLEWARE
  app.use('*', (req, res, next) => {
    let timeStamp = new Date().toUTCString();
    let reqMethod = req.method;
    let reqRoute = req.originalUrl;
    console.log(`[${timeStamp}]: ${reqMethod} ${reqRoute} (Authenticated User: ${req.session.user != null})`);
    next();
  });

  app.use('*', (req, res, next) => {
    // TODO: test if we can wrap req.body in xss
    // Thought 1
    //req.body = xss(req.body);
    // Thought 2 //if  req._body === true then
    for (let item in req.body) {
      item = xss(item);
    }
    next();
  });

  // Authentication Middleware
  app.use('^/$', (req, res, next) => {
    res.redirect('/login');
  });

  app.use(RESTRICTED_PATHS_REGEX, (req, res, next) => {
    if (!req.session.user) {
        return res.status(403).render("frames/errors", { notLogged: true, title: "403: Forbidden" });
    }
    next();
  });
  

  app.use("/posts", postsRoutes);
  app.use("/relationships", relationships);
  //app.use("/workspaces", workspaces);
  app.use('/users', usersRoutes);
  app.use("/chats", chatRoutes);
  app.use("/search", searchRoutes);
  app.use("/", loginRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Page not found, sorry" });
  });
}

module.exports = constructRoutes;
