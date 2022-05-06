const express = require("express");
const app = express();
const static = express.static(__dirname + "/public");
const configRoutes = require("./routes");
const { engine } = require("express-handlebars");
const session = require("express-session");
const fileUpload = require("express-fileupload");

app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());

app.engine(
  "handlebars",
  engine({ extname: ".handlebars", defaultLayout: "main" })
);
app.set("view engine", "handlebars");

app.use(
  session({
    name: "AuthCookie",
    secret: "some secret string!",
    resave: false,
    saveUninitialized: true,
  })
);

// AUTHENTICATION MIDDLEWARE
app.use("/private", (req, res, next) => {
  if (!req.session.login) {
    return res
      .status(403)
      .render("frames/errors", { notLogged: true, title: "403: Forbidden" });
  }
  // res.render('users/private')
  next();
});

// LOGGING MIDDLEWARE
app.use((req, res, next) => {
  let timeStamp = new Date().toUTCString();
  let reqMethod = req.method;
  let reqRoute = req.originalUrl;
  if (req.session.login) {
    console.log(
      `[${timeStamp}]: ${reqMethod} ${reqRoute} (Authenticated User: true)`
    );
  } else {
    console.log(
      `[${timeStamp}]: ${reqMethod} ${reqRoute} (Authenticated User: false)`
    );
  }
  next();
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
