const username = document.getElementById("username");
const password = document.getElementById("password");
const form = document.getElementById("signup-form");

form.addEventListener("submit", (e) => {
  let messages = [];
  if (username.value == "" || username.value == null) {
    messages.push("Username is required");
  }
});
