// TODO: Check when the user has selected a mentor and then

//  load the relevant info for that mentor workspace
let mentorButton = document.getElementsByClassName('mentor-workspace');
let menteeButton = document.getElementsByClassName('mentee-workspace');

async function getWorkSpace(relationshipId){
    let relationship = await $.getJSON(`/workspaces/relationships/${relationshipId}`);
    return relationship;
}

console.log("AJAX HAPPENS HERE");
(function ($){ 
    // This script will control the display when on /workspaces
    let workspaceDiv = $('#workspace-div'); // /workspaces/:userID
    let relationshipsDiv = $('#relationships-div'); // /workspaces/:userID -- this is nested in workspaceDiv

    let singleWorkspaceDiv = $('#single-workspace-div'); // /workspaces/relationships/:relationshipId
    
    let currEndpoint = window.location.pathname;


    if (window.location.pathname.startsWith('/workspaces/')) {
        singleWorkspaceDiv.hide();
        workspaceDiv.show();
        relationshipsDiv.show();

        // Mentors and mentees
        let userID = window.location.pathname.match(/[\w\d]{1,}$/)[0];

        // Get the mentors
        let getMentorEndpoint = `/relationships/${userID}/mentors`; 
        
        workspaceDiv.append($("<h2>Mentors</h2>"));
        let mentorUl = $(`<ul class='mentor-list'></ul>`);
        workspaceDiv.append(mentorUl);
        
        $.getJSON(getMentorEndpoint).then(function(res) {
            let relationships = res.relationships;
        
            for (let mentorRel of relationships){
                let element = document.createElement('li');
                element.innerHTML = `<a href="/workspaces/relationships/${mentorRel._id}">${mentorRel.mentor.name}</a>`;
                bindDisplayWorkspaceEvent(element);
                mentorUl.append(element);
            }
        });

        // Get the mentees
        workspaceDiv.append($("<h2>Mentees</h2>"));
        let getMenteeEndpoint = `/relationships/${userID}/mentees`; 
        let menteeUl = $(`<ul class='mentee-list'></ul>`);
        workspaceDiv.append(menteeUl);

        $.getJSON(getMenteeEndpoint).then(function(res) {
            let relationships = res.relationships;

            for (let menteeRel of relationships){
                let element = document.createElement('li');
                element.innerHTML = `<a href="/workspaces/relationships/${menteeRel._id}">${menteeRel.mentee.name}</a>`;
                bindDisplayWorkspaceEvent(element);
                menteeUl.append(element);
            }
        });


        relationshipsDiv.append($(`<h2>All Relationships</h2>`)); // TODO: Improve by making these collapsable or otherwise hide-able somehow

        // Display the rest of the relationships based on status
        let statuses = ['pending', 'rejected', 'completed'];

        for (let status of statuses) {
            let statusendpoint = `/relationships/${userID}/${status}`;
            $.getJSON(statusendpoint).then(function(res) {
                let relationships = res.relationships;
                // Get all relationships per status
                relationshipsDiv.append($(`<h3>${status[0].toUpperCase() + status.substring(1)}</h3>`));
                let currUl = $(`<ul class='${status}-relationship-list'></ul>`);
                relationshipsDiv.append(currUl);
                
                // TODO bind link to the user's profile
                for (let relationshipObject of relationships){
                    if (userID.toString() === relationshipObject.mentor._id.toString()){
                        // return a mentee
                        let element = document.createElement('li');
                        element.innerHTML = relationshipObject.mentee.name;
                        currUl.append(element)
                    }
                    else {
                        currUl.append($(`<li>${relationshipObject.mentor.name}</li>`));
                    }
                        
                }
                
            });
        }

        workspaceDiv.append(relationshipsDiv);
    }

    function getWorkSpaceDataCallback(res){
        let chat = res.chatChannel;
        let files = res.files;
        let chatWindow, fileWindow;

        if (chat == null){ // null or undefined
            // When there is no chat yet
            chatWindow = $("<p class='chat-window'>No chat to display yet</p>");
        }
        else {
            chatWindow = $(`<p class='chat-window'>${chat.toString()}</p>`); // placeholder
        }

        if (files == null){
            //when there are no files yet
            fileWindow = $(`<p class='file-window'>No files to display yet</p>`);
        }
        else {
            fileWindow = $(`<p class='file-window'>${files.toString()}</p>`);
        }

        singleWorkspaceDiv.append(chatWindow);
        singleWorkspaceDiv.append(workspaceWindow);
    }

    function getWorkSpaceData(url, callback) {
        $.getJSON(url,callback).fail(function(error) {
            console.log(error);
        });
    }

    function bindDisplayWorkspaceEvent(listItem) {
        $(listItem).children('a').on('click', function(event) {
            event.preventDefault();
            workspaceDiv.hide(); // this should hide the relationshipsDiv as well
            singleWorkspaceDiv.show();

            let userID = window.location.pathname.match(/[\w\d]{1,}$/)[0];
            let backtoall = `<a href="/workspaces/${userID}">Back to all workspaces</a>`;
            singleWorkspaceDiv.append(backtoall); // Add back to all workspaces/relationships
            

            let h2 = $(`<h2 class='selected-user'>${this.innerHTML}</h2>`); // User's name
            singleWorkspaceDiv.append(h2);

            var currentLink = $(this).attr("href"); // workspaces/relationships/:relationshipID
            
            // Do things to display a single workspace
            let res = getWorkSpaceData(currentLink, getWorkSpaceDataCallback);

            // TODO: Display chat
            // TODO: Display files

        });
    }

    
})(window.jQuery);