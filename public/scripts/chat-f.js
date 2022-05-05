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
        //const messageInput = document.getElementById('message');
        let messageInput = $('#message');
        //console.log("messageValue: " + messageValue);
        const errorElement = document.getElementById('error-message');
        const chatSection = document.getElementById('chat-section');

        // Add event listener that does error checking
        messageForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // <ERROR CHECKING>

            let errorFlag = false;

            let messageValue = messageInput.val();

            // Check that the message exists, is not empty, and is not just spaces
            if(!errorFlag && !messageValue){
                errorFlag = true;
                //console.log("Hello! The message input element is this:"); // debug
                //console.log(messageInput.val()); // debug
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

            // Create a timestamp
            let datetime = new Date();
            datetime = datetime.getTime();

            datetime = "1651782831157"; // Placeholder value that works for testing
            
            // Get user id of current user (change this later so that it gets this from the user session)
            let userId = "6273eda70e9866f8270a384a"; // A placeholder value that works for testing
            let relationshipId = "6273eda70e9866f8270a3859"; // A placeholder value that works for testing

            // Send a POST "/chats/:id/messages" request to server, then display updated message page
            var requestConfig = {
                method: "POST",
                url: "/chats/" + relationshipId + "/messages",
                data: {
                    timestamp: datetime,
                    author: userId,
                    message: messageValue
                }
            };

            $.ajax(requestConfig).then(function (responseMessage) {
                var newElement = $(responseMessage);
                console.log(responseMessage); // debug
                $("#chat-section").replaceWith(newElement);
            })
        });
    }
})(window.jQuery);