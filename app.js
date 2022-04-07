// Basic server structure
// Adding comment to force initial branch commit for dev branch -- please remove later
const express = require('express');
const hbars = require('express-handlebars');

const app = express();
const static = express.static('./public');
const configRoutes = require('./routes');

app.use('/public', static);
app.use(express.json()); // To ensure that req.body is properly parsed
app.use(express.urlencoded({extended: true}));


app.engine('handlebars', hbars.engine({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars'); // views will use handlebars
app.set('views', __dirname + '/views'); // point to the views folder

configRoutes(app);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
