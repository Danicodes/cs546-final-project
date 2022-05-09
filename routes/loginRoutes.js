const express = require("express");
const { HOME_PAGE_URL } = require("../constants/constants");
const router = express.Router();
const { login_users } = require("../data/index");
const login_validations = require("../validations/login_validations");

router.get("/login", async (req, res) => {
  // res.json('Login page')
  if (!req.session.user) {
    return res.render("frames/login", { title: "Login" });
  }
  res.redirect(HOME_PAGE_URL);
});

router.get("/signup", async (req, res) => {
  // res.json('Signup page')
  if (!req.session.user) {
    return res.render("frames/signup", { title: "Signup" });
  }
  res.redirect(HOME_PAGE_URL);
});

router.post("/signup", async (req, res) => {
  let signUpDetails = req.body;
  let { username, password } = signUpDetails;
  username = username.trim();
  let confirm_password = signUpDetails.password2;
  let firstName = signUpDetails.firstName;
  let lastName = signUpDetails.lastName;

  try {
    await login_validations.typeCheck(username, password);
    await login_validations.checkNames(firstName, lastName);
    if (confirm_password !== password)
      throw { code: 400, error: `Passwords didn't match` };

    let result = await login_users.createUsers(
      username,
      password,
      firstName,
      lastName
    );
    // Set the Session details to redirect the page to about page
    req.session.user = {
        id: result.user._id,
        username: result.user.username
    };
    res.cookie('user', result.user._id.toString()).redirect("/");
  } catch (e) {
      if (e.code) {
        res.status(e.code).render("frames/signup", { // Have form persist
          errors: true,
          error: e.error,
          title: "Signup",
        });
      } else {
        res.status(500).json("Internal Server Error " + e);
      }
  }
});

router.post("/login", async (req, res) => {
  let loginDetails = req.body;
  let { username, password } = loginDetails;
  let result;
  try {
    await login_validations.typeCheck(username, password);
    result = await login_users.checkUser(username, password);
    req.session.user = {
      id: result.user._id,
      username: result.user.username
    };
    res.cookie('user', result.user._id.toString()).redirect("/"); 
  } catch (e) {
    if (e.code) {
      res.status(e.code).render("frames/login", {
        errors: true,
        error: e.error,
        title: "Login",
      });
    } else {
      res.status(500).json("Internal Server Error");
    }
  }
});

router.get("/private", async (req, res) => {
  res.render("frames/private", {
    title: ""
  });
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
  res.render("frames/logout", { pageTitle: "Logged Out" });
});
module.exports = router;
