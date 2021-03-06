// User Login and sign-up

const mongoCollections = require("../config/mongoCollections");
let { ObjectId } = require("mongodb");
const users = mongoCollections.users;
const bcrypt = require("bcryptjs");
const login_validations = require("../validations/login_validations");

// Create user function that initiates the user

let count = 10;

const createUsers = async function createUsers(
  username,
  password,
  firstName,
  lastName
) {
  await login_validations.checkInput(username, password);
  const userDatabase = await users();
  username = username.toLowerCase();
  let getUser = await userDatabase.findOne({ username: username });
  if (getUser) {
    throw { code: 400, error: "Username already exists in the database" };
  }
  hashedPassword = await bcrypt.hash(password, count);
  let newUser = {
    _id: ObjectId(), // new user object which includes firstName and lastName [input by user during signup]
    username: username,
    password: hashedPassword,
    name: firstName + lastName,
  };
  let insertedUser = await userDatabase.insertOne(newUser);
  if (insertedUser.insertedCount == 0) {
    throw { code: 500, error: "Unable to create new user" };
  }
  newUser._id = newUser._id.toString();
  return { insertedUser: true, insertedId: insertedUser.insertedId, user: newUser };
};

// Check User function

// if the user is matched returns authenticated as true

const checkUser = async function checkUser(username, password) {
  await login_validations.checkInput(username, password);
  const userDatabase = await users();
  username = username.toLowerCase();
  let getUser = await userDatabase.findOne({ username: username });
  if (!getUser) {
    throw { code: 400, error: " Either the username or password is invalid" };
  }
  let passMatch = await bcrypt.compare(password, getUser.password);

  if (!passMatch) {
    throw { code: 400, error: `Either the username or password is invalid` };
  }
  return { authenticated: true, user: getUser };
};

module.exports = {
  createUsers,
  checkUser,
};
