const chatRoutes = require("./chat");
const relationships = require("./relationships");
const postsRoutes = require("./posts");
const loginRoutes = require("./loginRoutes");

const usersRoutes = require("./users");

function constructRoutes(app) {
  // Example: app.use('/', <middleware name or router name>); // Mounts router or other middleware at path '/'
  app.use("/posts", postsRoutes);
  app.use("/relationships", relationships);
  app.use("/users", usersRoutes);
  app.use("/chats", chatRoutes);
  app.use("/", loginRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Page not found, sorry" });
  });
}

module.exports = constructRoutes;
