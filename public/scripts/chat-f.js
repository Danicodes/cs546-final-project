// chat-f.js (chat frontend script)
// Author: Ethan Grzeda
// I pledge my honor that I have abided by the Stevens Honor System.

/*
* I could add an event listener that activates on page load and refreshes the
* messages periodically by requesting the updated chat messages.
* 
* Should I do this?
*/

(function ($) {
    const messageForm = document.getElementById('message-form');
    if(messageForm){
        // Get elements
        const messageInput = document.getElementById('message');
        let messageValue = messageInput.value;
        const errorElement = document.getElementById('error-message');

        // Add event listener that does error checking
        messageForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // <ERROR CHECKING>

            let errorFlag = false;

            // Check that the message exists, is not empty, and is not just spaces
            if(!errorFlag && !messageValue){
                errorFlag = true;
                errorElement.textContent = "Error: A message must be provided.";
                errorElement.setAttribute('class', "visible");
            }
            if(!errorFlag && messageValue === ""){
                errorFlag = true;
                errorElement.textContent = "Error: The message must not be empty.";
                errorElement.setAttribute('class', "visible");
            }
            if(!errorFlag && messageValue.trim() === ""){
                errorFlag = true;
                errorElement.textContent = "Error: The message must not be just spaces";
                errorElement.setAttribute('class', "visible");
            }
            messageValue = messageValue.trim();

            // </ERROR CHECKING>

            errorElement.setAttribute('class', "hidden");
            // Send a POST "/chats/:id/messages" request to server
            // Get response back and display updated messages page
        });
    }
})();