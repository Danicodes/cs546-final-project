// chat-f.js (chat frontend script)
// Author: Ethan Grzeda
// I pledge my honor that I have abided by the Stevens Honor System.

/*
* I could add an event listener that activates on page load and refreshes the
* messages periodically by requesting the updated chat messages. This is not
* strictly necessary, so I have not done it yet.
*/

(function ($) {
    const messageForm = document.getElementById('workspace-message-form');
    if(messageForm){
        // Get elements
        let messageInput = $('#message');
        const errorElement = document.getElementById('error-message');
        const chatSection = document.getElementById('chat-section');
        let refreshButton = document.getElementById("refresh-messages");
        const MAX_MESSAGE_LENGTH = 256;

        // Add event listener for the message input form that does error checking
        messageForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // <ERROR CHECKING>

            let errorFlag = false; // Set to true if any error occurs. Used to prevent multiple errors from triggering and from a faulty message being sent.

            let messageValue = messageInput.val();

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
                errorElement.textContent = "Error: The message must not be just spaces.";
                errorElement.setAttribute('class', "visible");
            }
            if(!errorFlag){
                messageValue = messageValue.trim();
            }
            if(!errorFlag && messageValue.length > MAX_MESSAGE_LENGTH){
                errorFlag = true;
                errorElement.textContent = "Error: The message must not be too long.";
                errorElement.setAttribute('class', "visible");
            }

            // </ERROR CHECKING>

            if(!errorFlag){
                errorElement.setAttribute('class', "hidden");

                // Create a timestamp
                let datetime = new Date();
                datetime = datetime.getTime();
            
                // Get user id of current user (change this later so that it gets this from the user session)
                let userId = getUserFromCookie();
                let relationshipId = getElementFromCookie('selected_relationship'); 

                // Send a "POST /chats/:id/messages" request to server, then display updated message page
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

                    if (window.localStorage.relationships) {
                        let currauthor;
                        let curr_relationhsips = JSON.parse(window.localStorage.relationships);
                        let thisRelationship = curr_relationhsips.filter(function(relationship) {
                                                        return (relationshipId === relationship._id);
                                                    });
                        thisRelationship = thisRelationship[0];
                        if (thisRelationship) {                          
                            if (getUserFromCookie() === thisRelationship.mentor._id){
                                currauthor = thisRelationship.mentor.username;
                            }
                            else {
                                currauthor = thisRelationship.mentee.username;
                            }
                                                    
                            for (let element of $(newElement).find('li:has(>p)')){
                                if (element.innerHTML.includes(`${currauthor}`)) {
                                    element.setAttribute('style', 'text-align:right;');
                                }
                            }
                        }
                        console.log("Current Author" + currauthor);
                    }

                    $("#chat-section").replaceWith(newElement);
                })
            }
            
        });

        // Add event listener to "Refresh Messages" button that refreshes chat messages without reloading the whole page
        refreshButton.addEventListener('click', (event) => {
            event.preventDefault();

            let relationshipId = getElementFromCookie('selected_relationship'); 

            // Create a timestamp
            let datetime = new Date();
            datetime = datetime.getTime();

            // Send a "GET /chats/:id/messages" request to server, then display the updated chat messages page
            var requestConfig = {
                method: "GET",
                url: "/chats/" + relationshipId + "/messages",
                contentType: 'application/json',
                data: {
                    timestamp: datetime
                }
            }
            /***
             * (this.children[0].innerHTML.includes('(Mentee):')) this.setAttribute('style', 'text-align:right;') });
             */

            $.ajax(requestConfig).then(function (responseMessage) {
                var newElement = $(responseMessage);
                
                if (window.localStorage.relationships) {
                    let currauthor;
                    let curr_relationhsips = JSON.parse(window.localStorage.relationships);
                    let thisRelationship = curr_relationhsips.filter(function(relationship) {
                                                    return (relationshipId === relationship._id);
                                                });
                    thisRelationship = thisRelationship[0];
                    if (thisRelationship) {                             
                        if (getUserFromCookie() === thisRelationship.mentor._id){
                            currauthor = thisRelationship.mentor.username;
                        }
                        else {
                            currauthor = thisRelationship.mentee.username;
                        }

                        for (let element of $(newElement).find('li:has(>p)')){

                            if (element.innerHTML.includes(`${currauthor}`)) {
                                element.setAttribute('style', 'text-align:right;');
                            }
                        }
                    }
                } 
                
                $("#chat-section").replaceWith(newElement);
            })
        });
    }
})(window.jQuery);