const chatRoutes = require('./chat')
const relationships = require("./relationships");
const postsRoutes = require("./posts");
const loginRoutes = require("./loginRoutes");
<<<<<<< HEAD

function constructRoutes(app){
    // Example: app.use('/', <middleware name or router name>); // Mounts router or other middleware at path '/'
    app.use('/posts', postsRoutes);
    app.use('/relationships', relationships);
    app.use('/chats', chatRoutes);
    app.use("/", loginRoutes);
    app.use('*', (req, res) => {
        res.status(404).json({error: 'Page not found, sorry' });
      });
}

module.exports = constructRoutes;
=======
const constructRoutes = (app) => {
  app.use("/", loginRoutes);
  // Example: app.use('/', <middleware name or router name>); // Mounts router or other middleware at path '/'
  app.use("*", (req, res) => {
    res.status(404).render("page/error", { error: "Page not found, sorry" });
  });
};

module.exports = constructRoutes;
>>>>>>> e8de899 (constructRoutes - reverted name)
