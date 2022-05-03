let count = 10;

async function checkInput(username, password) {
  if (!username || !password)
    throw { code: 400, error: `Username or Password cannot be empty` };
  if (typeof username != "string")
    throw { code: 400, error: `Username needs to be a string` };
  let myUsername = username.split(" ");
  if (myUsername.length > 1)
    throw { code: 400, error: `Username cannot have spaces` };
  if (/[^\w]/.test(username))
    throw { code: 400, error: `Username can only be alphanumeric characters` };
  if (username.length < 4)
    throw { code: 400, error: `Username must be at least 4 characters long` };

  if (typeof password != "string")
    throw { code: 400, error: `Password needs to be a string` };
  let myPassword = password.split(" ");
  if (myPassword.length > 1)
    throw { code: 400, error: `Password cannot have spaces` };
  if (password.length < 6)
    throw { code: 400, error: `Password must be at least 6 characters long` };
}

async function typeCheck(username, password) {
  if (!username || !password)
    throw { code: 400, error: `Username or Password cannot be empty` };
  if (typeof username != "string")
    throw { code: 400, error: `Username needs to be a string` };
  let myUsername = username.split(" ");
  if (myUsername.length > 1)
    throw { code: 400, error: `Username cannot have spaces` };
  if (/[^\w]/.test(username))
    throw { code: 400, error: `Username can only be alphanumeric characters` };
  if (username.length < 4)
    throw { code: 400, error: `Username must be at least 4 characters long` };

  if (typeof password != "string")
    throw { code: 400, error: `Password needs to be a string` };
  let myPassword = password.split(" ");
  if (myPassword.length > 1)
    throw { code: 400, error: `Password cannot have spaces` };
  if (password.length < 6)
    throw { code: 400, error: `Password must be at least 6 characters long` };
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
  if (/[^\w]/.test(firstName && lastName))
    throw { code: 400, error: `Name can only be alphanumeric characters` };
}

module.exports = {
  checkInput,
  checkNames,
  typeCheck,
};
