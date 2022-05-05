// get-chat-page.js (chat frontend script)
// Author: Ethan Grzeda
// I pledge my honor that I have abided by the Stevens Honor System.

// THIS SCRIPT IS ONLY FOR TESTING PURPOSES
// It is designed to test the functionlity of the chat page by displaying it in the browser without the workspaces page

(function ($) {
    if(true){
        // Get elements

        const chatLink = document.getElementById("chat-link");
        const container = document.getElementById("container");
        const wrapper = document.getElementById('wrapper');

        // Add event listener that does error checking
        chatLink.addEventListener('click', (event) => {
            event.preventDefault();

            // Create a timestamp
            let datetime = new Date();
            datetime = datetime.getTime();
            
            // Get user id of current user (change this later so that it gets this from the user session)
            let relationshipId = "6273eda70e9866f8270a3859"; // A placeholder value that works for testing

            // Send a POST "/chats/:id/messages" request to server, then display updated message page
            var requestConfig = {
                method: "GET",
                url: "/chats/" + relationshipId + "/messages",
                contentType: 'application/json',
                data: {
                    timestamp: datetime,
                    testParam: "testParamText"
                }
            };

            $.ajax(requestConfig).then(function (responseMessage) {
                var newElement = $(responseMessage);
                console.log(responseMessage);
                $("#container").replaceWith(newElement);
            })
        });
    }
})(window.jQuery);