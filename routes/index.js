const postsRoutes = require("./posts");
const usersRoutes = require("./users");

function constructRoutes(app){
    // Example: app.use('/', <middleware name or router name>); // Mounts router or other middleware at path '/'
    app.use('/posts', postsRoutes);
    app.use('/users', usersRoutes);
    app.use('*', (req, res) => {
        res.status(404).render('page/error', { error: 'Page not found, sorry' });
      });
}

module.exports = constructRoutes;
