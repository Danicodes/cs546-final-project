// TODO: Check when the user has selected a mentor and then

//  load the relevant info for that mentor workspace
let mentorButton = document.getElementsByClassName('mentor-workspace');
let menteeButton = document.getElementsByClassName('mentee-workspace');

function getElementFromCookie(elementName){
    let element;
    if  (document.cookie.match(`${elementName}=`)){
        element = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${elementName}=`));
        if (element.split('=').length > 0){
            return element.split('=')[1];
        }
    }
    return null;
}

function createUserProfileLink(item, name){
    return $(`<a class=\"user-profile-link\" href="/profile/${item._id}">${name ? name : ""}</a>`);
}

function createShowWorkspaceLink(item, name){
    return $(`<a class=\"show-workspace-link link-that-looks-like-button\" 
                href=\"/workspaces/relationships/${item._id}/${name ? name : "" }\">Show workspace</a>`); // workspace/rship/userid/relid
}

function createNotificationElement(item){
    return $(`<input type=\"checkbox\" class=\"workspace-notification workspace-notification-useritem\" id=\"workspace-notification-${item._id}\"/>
    <label for=\"workspace-notification-${item._id}\">
        <i class=\"fas fa-circle\"></i>
    </label>`);
}

console.log("AJAX HAPPENS HERE");
(function ($){ 
    function bindDisplayPendingWS(item){
        //INSIDE workspace details for PENDING users - show the accept or reject function
        $(item).children('a.show-workspace-link').on('click', function(event){
            event.preventDefault();
            workspaceDiv.hide(); // this should hide the relationshipsDiv as well
            singleWorkspaceDiv.show();

            let userId = getUserFromCookie();
            if (!userId) {
                userId = window.location.pathname.match(/[\w\d]{1,}$/)[0]; //proxy for now, will break when route changes
            }

            let backtoall = `<a href="/workspaces/${userId}">Back to all workspaces</a>`;
            singleWorkspaceDiv.append(backtoall); // Add back to all workspaces/relationships
            
            // this passes a NODE element so dom manipulation here is fine
            let h2 = $(`<h2 class='selected-user'>${$(item).children('a.user-profile-link')[0].innerHTML}</h2>`); // Other user's name 
            let profile_link = $(item).children('a.user-profile-link').attr('href');
            let otherUser = profile_link.match(/(?<=\/profile\/).*$/)[0];
            //document.cookie = `selected_user=${otherUser}`; 

            singleWorkspaceDiv.append(h2);

            let selected_user = getElementFromCookie('selected_user');
            let selected_relationship = getElementFromCookie('selected_relationship');
            // onclick=\"location.href=\'/workspaces/accept/${selected_user ? selected_user : ''}\';\"
            let requestDiv = $(`<div class='workspace-request-div' style='display:none'></div>`);
            
            let relationshipRoute = `/relationships/${userId}/${selected_relationship}/`;
            //let acceptroute = `/relationships/accept/${selected_user ? selected_user : ''}`; // /relationships/relationshipId/status
            let acceptroute = relationshipRoute + "approved";
    
            //let rejectroute = `/relationships/reject/${selected_user ? selected_user : ''}`;
            let rejectroute = relationshipRoute + "rejected";
    
            let acceptbtn = $(`<button class=\"accept-pending-request btn btn-primary\">Accept</button>`);
            let rejectbtn = $(`<button class=\"accept-pending-request btn btn-secondary\">Reject</button>`);
    
            acceptbtn.on('click', function(e){
                e.preventDefault();
                $.ajax({
                    type: 'POST',
                    url: acceptroute,
                    success: function(result) {
                        acceptbtn.removeClass('btn-primary');
                        acceptbtn.addClass('btn-success');
                        acceptbtn.addClass('disabled');
                        acceptbtn.attr('disabled', 'true');
    
                        rejectbtn.removeClass('btn-secondary');
                        rejectbtn.addClass('btn-danger');
                        rejectbtn.addClass('disabled');
                        rejectbtn.attr('disabled', 'true');
                        //Disable both buttons
                        console.log("Accepted user");
                    },
                    error: function(result) {
                        alert(`${result.error ? result.error : "Could not process request"}`);
                    }
    
                })
            });
    
            rejectbtn.on('click', function(e){
                e.preventDefault();
                $.ajax({
                    type: 'POST',
                    url: rejectroute,
                    success: function(result) {
                        acceptbtn.removeClass('btn-primary');
                        acceptbtn.addClass('btn-danger');
                        acceptbtn.addClass('disabled');
                        acceptbtn.attr('disabled', 'true');
    
                        rejectbtn.removeClass('btn-secondary');
                        rejectbtn.addClass('btn-success');
                        rejectbtn.addClass('disabled');
                        rejectbtn.attr('disabled', 'true');
                        //Disable both buttons
                        console.log("Rejected user");
                    },
                    error: function(result) {
                        alert(`${result.error ? result.error : "Could not process request"}`);
                    }
    
                })
            });
            
            
            requestDiv.append(acceptbtn);
            requestDiv.append(rejectbtn);
    
            if (!selected_user){
                acceptbtn.addClass('disabled');
                acceptbtn.attr('disabled', 'true');
                rejectbtn.addClass('disabled');
                rejectbtn.attr('disabled', 'true');
            }
    
            singleWorkspaceDiv.append(requestDiv);
            requestDiv.show();

            var currentLink = this.getAttribute("href"); // workspaces/relationships/:relationshipID
            
            // Do things to display a single workspace
            let res = getWorkSpaceData(currentLink, getWorkSpaceDataCallback);
    
            // let userId = getUserFromCookie();
            // if (!userId) {
            //     //redirect to login instead
            //     return;
            // }
    
            // let backtoall = `<a href="/workspaces/${userId}">Back to all workspaces</a>`;
            // singleWorkspaceDiv.append(backtoall);
    
            // let h2 = $(`<h2 class='selected-user'>${$(item).children('a.user-profile-link')[0].innerHTML}</h2>`);
            // singleWorkspaceDiv.append(h2)
    
    
        });
    }
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
                if (mentorRel.status.name != "Approved"){
                    continue;
                }
                let element = $("<li></li>");
                //element.classList.add(`workspace-notification-${mentorRel.mentor._id}`);
                // Add a button for show workspace
                // button and user profile link will be siblings in tree
                element.append(createShowWorkspaceLink(mentorRel.mentee, mentorRel._id));
                element.append(createUserProfileLink(mentorRel, mentorRel.mentor.name));
                let notificationElement = createNotificationElement(mentorRel.mentor);

                //element.append($(`<a class=\"show-workspace-link link-that-looks-like-button\" href=\"/workspaces/relationships/${mentorRel.mentee}/${mentorRel._id}\">Show workspace</a>`)); 
                //element.append($(`<a class=\"user-profile-link\" href="/profile/${mentorRel._id}">${mentorRel.mentor.name}</a>`)); // this should instead link to user profile
                
                // let notificationElement  = $(`<input type=\"checkbox\" class=\"workspace-notification workspace-notification-useritem\" id=\"workspace-notification-${mentorRel.mentor._id}\"/>
                //                             <label for=\"workspace-notification-${mentorRel.mentor._id}\">
                //                                 <i class=\"fas fa-circle\"></i>
                //                             </label>`);
                
                if (mentorRel.lastCheckInTime && (Date.now() > Date.parse(mentorRel.lastCheckInTime) - ONE_MINUTE)){
                    notificationElement.show();
                }
                else {
                    notificationElement.hide();
                }
                element.append(notificationElement);
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
                let element = $("<li></li>"); //document.createElement('li');
                //element.classList.add(`workspace-notification-${menteeRel.mentee._id}`);
                element.append(createShowWorkspaceLink(menteeRel.mentor, menteeRel._id));
                element.append(createUserProfileLink(menteeRel, menteeRel.mentee.name));
                let notificationElement = createNotificationElement(menteeRel.mentor);
                // element.append($(`<a class=\"show-workspace-link link-that-looks-like-button\" href=\"/workspaces/relationships/${menteeRel.mentor}/${menteeRel._id}\">Show workspace</a>`)); 
                // element.append($(`<a class=\"user-profile-link\" href="/profile/${menteeRel._id}">${menteeRel.mentee.name}</a>`));
                // let notificationElement  = $(`<input type=\"checkbox\" class=\"workspace-notification workspace-notification-useritem\" id=\"workspace-notification-${menteeRel.mentee._id}\"/>
                //                             <label for=\"workspace-notification-${menteeRel.mentee._id}\">
                //                                 <i class=\"fas fa-circle\"></i>
                //                             </label>`);
                if (menteeRel.lastCheckInTime && (Date.now() > (Date.parse(menteeRel.lastCheckInTime) - ONE_MINUTE))){
                    notificationElement.show();
                }
                else {
                    notificationElement.hide();
                }
                element.append(notificationElement);
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
                //menteeRel, menteeRel.mentor
                let workspaceName;
                for (let relationshipObject of relationships){
                    let element = document.createElement('li');
                  
                    if (userID.toString() === relationshipObject.mentor._id.toString()){
                        // return a mentee
                        let menteeLink = createUserProfileLink(relationshipObject.mentee, relationshipObject.mentee.name);
                        $(element).append(menteeLink);
                        currUl.append(element)
                        workspaceName = relationshipObject.mentee;
                    }
                    else {
                        $(element).append(createUserProfileLink(relationshipObject.mentor, relationshipObject.mentor.name));
                        currUl.append(element);
                        workspaceName = relationshipObject.mentor;
                    }
                    
                    // TODO::: ADD VALIDATION ON THE BACKEND TO PREVENT A USER FROM 
                    // ACCESSING A WORKSPACE RELATIONSHIP IF THE STATUS IS IN PENDING/REJECTED STATE
                    let showWS = createShowWorkspaceLink(workspaceName, relationshipObject._id);
                    $(element).append(showWS);
                    if (status === 'pending'){
                        // ------ DO within the bindDisplayPending function - check if user is a mentor or mentee. Mentors can do this, mentee cannot use this with this state 
                        // showWS.addClass('disabled'); // displays the btn as disabled
                        bindDisplayPendingWS(element);
                    }
                    else if (status === 'completed') {
                        showWS.attr('disabled', true); // Double check this
                        bindDisplayWorkspaceEvent(element);
                    }
                    else {
                        showWS.attr('disabled', true);
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
            chatWindow = $();
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
        singleWorkspaceDiv.append(fileWindow);
    }

    function getWorkSpaceData(url, callback) {
        $.getJSON(url,callback).fail(function(error) {
            console.log(error);
        });
    }

    function bindDisplayWorkspaceEvent(listItem) {
        $(listItem).children('a.show-workspace-link').on('click', function(event) {
            event.preventDefault();
            workspaceDiv.hide(); // this should hide the relationshipsDiv as well
            singleWorkspaceDiv.show();

            let userId = getUserFromCookie();
            if (!userId) {
                userId = window.location.pathname.match(/[\w\d]{1,}$/)[0]; //proxy for now, will break when route changes
            }

            let backtoall = `<a href="/workspaces/${userId}">Back to all workspaces</a>`;
            singleWorkspaceDiv.append(backtoall); // Add back to all workspaces/relationships
            
            // this passes a NODE element so dom manipulation here is fine
            let h2 = $(`<h2 class='selected-user'>${$(listItem).children('a.user-profile-link')[0].innerHTML}</h2>`); // Other user's name 
            let profile_link = $(listItem).children('a.user-profile-link').attr('href');
            let otherUser = profile_link.match(/(?<=\/profile\/).*$/)[0];
            document.cookie = `selected_user=${otherUser}`; 

            singleWorkspaceDiv.append(h2);

            var currentLink = this.getAttribute("href"); // workspaces/relationships/:relationshipID
            
            // Do things to display a single workspace
            let res = getWorkSpaceData(currentLink, getWorkSpaceDataCallback);

            $('.workspace-content-placeholder').hide(); // Hide the placeholder class
            $(listItem).children('input:not(:checked)').hide(); // hide notification when pressed

            // TODO: Display chat
            // TODO: Display files

        });
    }

    
})(window.jQuery);