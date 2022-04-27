const relationships = require("./relationships");
const postsRoutes = require("./posts");

function constructRoutes(app){
    // Example: app.use('/', <middleware name or router name>); // Mounts router or other middleware at path '/'
    app.use('/posts', postsRoutes);
    app.use('/relationships', relationships);
    app.use('*', (req, res) => {
        res.status(404).json({error: 'Page not found, sorry' });
      });
}

module.exports = constructRoutes;
