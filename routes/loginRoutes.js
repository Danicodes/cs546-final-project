const express = require("express");
const { HOME_PAGE_URL } = require("../constants/constants");
const router = express.Router();
const { login_users } = require("../data/index");
const login_validations = require("../validations/login_validations");

router.get("/", async (req, res) => {
  // res.json('Login page')
  if (!req.session.login) {
    return res.render("frames/login", { title: "Login" });
  }
  res.redirect("/About");
  res.redirect(HOME_PAGE_URL);
});

router.get("/signup", async (req, res) => {
  // res.json('Signup page')
  if (!req.session.login) {
    return res.render("frames/signup", { title: "Signup" });
  }
  res.redirect("/About");
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
    res.redirect("/");
  } catch (e) {
    if (e.code) {
      res.status(e.code).render("frames/signup", {
        errors: true,
        error: e.error,
        title: "Signup",
      });
    } else {
      res.status(500).json("Internal Server Error");
    }
  }
});

router.post("/login", async (req, res) => {
  let loginDetails = req.body;
  let { username, password } = loginDetails;
  try {
    await login_validations.typeCheck(username, password);
    let result = await login_users.checkUser(username, password);
    req.session.login = result;
    req.session.username = username;
    res.redirect("/About");
    res.redirect("/");
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

router.get("/About", async (req, res) => {
  res.render("frames/About", {
    username: req.session.username,
    title: "Private Page",
  });
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
  res.render("frames/logout", { title: "Logged Out" });
});
module.exports = router;
