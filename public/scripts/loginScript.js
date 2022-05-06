// loginScript.js
// Author: Ethan Grzeda
// I pledge my honor that I have abided by the Stevens Honor System.

// This script is built upon the foundation of login_dom.js, written by Yash

(function () {
    const username = document.getElementById("username-login-input");
    const password = document.getElementById("password-login-input");
    //const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");
    const errorContainer = document.getElementById("login-error-container");

    loginForm.addEventListener('submit', (event) => {
        
        //console.log("The front-end event listener for login form submission was triggered."); // debug
        
        let errorMessages = [];
        if(username.value == "" || username.value == null){
            errorMessages.push("Username is required.");
        }
        if(password.value == "" || password.value == null){
            errorMessages.push("Password is required.");
        }
        if(username.value.trim() == ""){
            errorMessages.push("Username must not be just spaces.");
        }
        if(password.value.trim() == ""){
            errorMessages.push("Password must not be just spaces.");
        }
        if(username.value.length < 4){
            errorMessages.push("Username must be at least 4 characters long.");
        }
        if(password.value.length < 6){
            errorMessages.push("Password must be at least 6 characters long.");
        }

        if(errorMessages.length !== 0) {
            event.preventDefault();
            // Put error messages in the container, and don't send a request to the server
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
})();