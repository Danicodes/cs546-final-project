const postsRoutes = require("./posts");
const usersRoutes = require("./users");
const relationships = require("./relationships");

function constructRoutes(app){
    // Example: app.use('/', <middleware name or router name>); // Mounts router or other middleware at path '/'
    app.use('/posts', postsRoutes);
    app.use('/users', usersRoutes);
    app.use('/relationships', relationships);
    app.use('*', (req, res) => {
        res.status(404).json({error: 'Page not found, sorry' });
      });
}

module.exports = constructRoutes;
