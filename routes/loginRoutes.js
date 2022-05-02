const express = require("express");
const router = express.Router();
const { login_users } = require("../data/index");
const login_validations = require("../validations/login_validations");

// ERROR CHECKING STARTS
async function typeCheck(username, password) {
  if (!username || !password)
    throw { code: 400, error: `Username or Password cannot be empty` };
  if (typeof username != "string")
    throw { code: 400, error: `Username needs to be a string` };
  let myUsername = username.split(" ");
  if (myUsername.length > 1)
    throw { code: 400, error: `Username cannot have spaces` };
  if (/[^\w\s]/.test(username))
    throw { code: 400, error: `Username can only be alphanumeric characters` };
  if (username.length < 4)
    throw { code: 400, error: `Username must be at least 4 characters long` };

  if (typeof password != "string")
    throw { code: 400, error: `Password needs to be a string` };
  let myPassword = password.split(" ");
  if (myPassword.length > 1)
    throw { code: 400, error: `Password cannot have spaces` };
  if (password.length < 6)
    throw { code: 400, error: `Password must be at least 4 characters long` };
}

async function checkNames(firstName, lastName) {
  if (!firstName || typeof firstName != "string")
    throw { code: 400, error: "Names cam only be strings" };
  if (!lastName || typeof lastName != "string")
    throw { code: 400, error: "Names cam only be strings" };
  let myFirstName = firstName.split(" ");
  let myLastName = lastName.split(" ");
  if (myFirstName.length > 1 || myLastName.length > 1)
    throw { code: 400, error: `Name cannot have spaces` };
  if (/[^\w\s]/.test(firstName && lastName))
    throw { code: 400, error: `Name can only be alphanumeric characters` };
}
// ERROR CHECKING ENDS

router.get("/", async (req, res) => {
  // res.json('Login page')
  if (!req.session.login) {
    return res.render("pages/login", { title: "Login" });
  }
  res.redirect("/private");
});

router.get("/signup", async (req, res) => {
  // res.json('signpup page')
  if (!req.session.login) {
    return res.render("pages/signup", { title: "Signup" });
  }
  res.redirect("/private");
});

router.post("/signup", async (req, res) => {
  let signUpDetails = req.body;
  let { username, password } = signUpDetails;
  let confirm_password = signUpDetails.password2;
  let firstName = signUpDetails.firstName;
  let lastName = signUpDetails.lastName;

  try {
    await login_validations.typeCheck(username, password);
    await checkNames(firstName, lastName);
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
      res.status(e.code).render("pages/signup", {
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
    await typeCheck(username, password);
    let result = await login_users.checkUser(username, password);
    req.session.login = result;
    req.session.username = username;
    res.redirect("/private");
  } catch (e) {
    if (e.code) {
      res.status(e.code).render("pages/login", {
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
  res.render("pages/private", {
    username: req.session.username,
    title: "Private Page",
  });
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
  res.render("pages/logout", { title: "Logged Out" });
});
module.exports = router;
