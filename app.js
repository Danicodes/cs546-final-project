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
    secret: "dakjsfgokj34io2j3i2hjr8h0d9hadjaf!!a11213", // some difficult to decode string
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 30 * 600 * 1000} // 30 minutes
  })
);

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
