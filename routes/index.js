const chatRoutes = require("./chat");
const relationships = require("./relationships");
const postsRoutes = require("./posts");
const loginRoutes = require("./loginRoutes");
const workspaces = require("./workspaces");
const usersRoutes = require("./users");
const searchRoutes = require("./search");

function constructRoutes(app) {
  // Example: app.use('/', <middleware name or router name>); // Mounts router or other middleware at path '/'
  app.use("/posts", postsRoutes);
  app.use("/relationships", relationships);
  app.use("/users", usersRoutes);
  app.use("/workspaces", workspaces);
  app.use("/users", usersRoutes);
  app.use("/workspaces", workspaces);
  app.use("/users", usersRoutes);
  app.use("/chats", chatRoutes);
  app.use("/search", searchRoutes);
  app.use("/", loginRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Page not found, sorry" });
  });
}

module.exports = constructRoutes;
