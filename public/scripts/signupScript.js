// signupScript.js
// Author: Ethan Grzeda
// I pledge my honor that I have abided by the Stevens Honor System.

// This script is largely based on the loginScript.js, the frontend validation script for the login page

(function () {
    const signupForm = document.getElementById("signup-form");
    const username = document.getElementById("username-signup-input");
    const password = document.getElementById("password-signup-input");
    const password2 = document.getElementById("password2-signup-input");
    const firstName = document.getElementById("firstName-signup-input");
    const lastName = document.getElementById("lastName-signup-input");
    const errorContainer = document.getElementById("signup-error-container");
    
    if(signupForm){
        signupForm.addEventListener('submit', (event) => {

            let usernameInput = username.value;
            let passwordInput = password.value;
            let password2Input = password2.value;
            let firstNameInput = firstName.value;
            let lastNameInput = lastName.value;

            let errorMessages = [];

            // Check that username is provided, it does not contain spaces, it is at least 4 characters long, and it only includes alphanumeric characters
            if(usernameInput == "" || usernameInput == null){
                errorMessages.push("Username is required.");
                usernameInput = "";
            }
            let usernameSpacesFlag = false;
            for(let i = 0; i < usernameInput.length; i++){
                if(usernameInput[i] === " "){
                    usernameSpacesFlag = true;
                    break;
                }
            }
            if(usernameSpacesFlag){
                errorMessages.push("Username must not contain spaces.");
            }
            if(usernameInput.length < 4){
                errorMessages.push("Username must be at least 4 characters long.");
            }
            if (/[^\w]/.test(usernameInput)){
                errorMessages.push("Username must only contain alphanumeric characters.");
            }

            // Check that password is provided, it does not contain spaces, it is at least 6 characters long, and it only includes alphanumeric characters
            if(passwordInput == "" || passwordInput == null){
                errorMessages.push("Password is required.");
                passwordInput = "";
            }
            let passwordSpacesFlag = false;
            for(let i = 0; i < passwordInput.length; i++){
                if(passwordInput[i] === " "){
                    passwordSpacesFlag = true;
                    break;
                }
            }
            if(passwordSpacesFlag){
                errorMessages.push("Password must not contain spaces.");
            }
            if(passwordInput.length < 6){
                errorMessages.push("Password must be at least 6 characters long.");
            }
            if (/[^\w]/.test(passwordInput)){
                errorMessages.push("Password must only contain alphanumeric characters.");
            }

            // Check that password2 is provided, and that it matches password
            if(password2Input == "" || password2Input == null){
                errorMessages.push("You must confirm your password.");
                password2Input = "";
            }
            if(password2Input.localeCompare(passwordInput) !== 0){
                errorMessages.push("Passwords must match.");
            }

            // Check that firstName is supplied, it does not contain spaces, and that it only includes alphanumeric characters
            if(firstNameInput == "" || firstNameInput == null){
                errorMessages.push("First Name is required.");
                firstNameInput = "";
            }
            let firstNameSpacesFlag = false;
            for(let i = 0; i < firstNameInput.length; i++){
                if(firstNameInput[i] === " "){
                    firstNameSpacesFlag = true;
                    break;
                }
            }
            if(firstNameSpacesFlag){
                errorMessages.push("First Name must not contain spaces.");
            }
            if (/[^\w]/.test(firstNameInput)){
                errorMessages.push("First Name must only contain alphanumeric characters.");
            }

            // Check that lastName is supplied, it does not contain spaces, and that it only includes alphanumeric characters
            if(lastNameInput == "" || lastNameInput == null){
                errorMessages.push("Last Name is required.");
                lastNameInput = "";
            }
            let lastNameSpacesFlag = false;
            for(let i = 0; i < lastNameInput.length; i++){
                if(lastNameInput[i] === " "){
                    lastNameSpacesFlag = true;
                    break;
                }
            }
            if(lastNameSpacesFlag){
                errorMessages.push("Last Name must not contain spaces.");
            }
            if (/[^\w]/.test(lastNameInput)){
                errorMessages.push("Last Name must only contain alphanumeric characters.");
            }

            // Check whether there are any errors. If there are, prevent the sending of a request and display the error(s)
            if(errorMessages.length !== 0) {
                event.preventDefault();
                
                let combinedErrorMessage = "";
                for(let i = 0; i < errorMessages.length; i++){
                    if(i === 0){
                        if(errorMessages.length === 1){
                            combinedErrorMessage += "Error: ";
                        }
                        else{
                            combinedErrorMessage += "Errors: ";
                        }
                    }
                    else{
                        combinedErrorMessage += " ";
                    }
                    combinedErrorMessage += errorMessages[i];
                }
    
                errorContainer.textContent = combinedErrorMessage;
            }
            else{
                errorContainer.textContent = ""; // Clears out any previous errors from this script
                // Since there's no event.preventDefault() line here, it'll send the request like normal
            }
        });
    }
})();