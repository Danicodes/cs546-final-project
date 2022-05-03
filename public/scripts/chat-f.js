// chat-f.js
// Author: Ethan Grzeda
// I pledge my honor that I have abided by the Stevens Honor System.

(function () {
    const messageForm = document.getElementById('message-form');
    if(messageForm){
        // Get elements
        const messageInput = document.getElementById('message');

        // Add event listener that does error checking
        messageForm.addEventListener('submit', (event) => {
            event.preventDefault();
        });
    }
})();