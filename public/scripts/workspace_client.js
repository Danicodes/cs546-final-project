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

/**
 * 
 * @param {String} userId User id of the person whose profile it is that we want 
 * @param {String} name Name of the user to be displayed in the link 
 * @returns 
 */
function createUserProfileLink(userId, name){
    return $(`<a class=\"user-profile-link\" href="/profile/${userId}">${name ? name : ""}</a>`);
}

/**
 * Creates a show workspace link element
 * @param {String} relationshipId : Relationship Object Id as string 
 * @returns 
 */
function createShowWorkspaceLink(relationshipId){
    return $(`<a class=\"show-workspace-link link-that-looks-like-button\" 
                href=\"/workspaces/relationships/${relationshipId}\">Show workspace</a>`); // workspace/relationships/relid
}

function createNotificationElement(item){
    return $(`<input type=\"checkbox\" class=\"workspace-notification workspace-notification-useritem\" id=\"workspace-notification-${item._id}\" style=\"display:none;\"/>
    <label for=\"workspace-notification-${item._id}\">
    </label>`); //        <i class=\"material-icons\">face</i>
}


(function ($){ 
    function bindDisplayPendingWS(item){
        //INSIDE workspace details for PENDING users - show the accept or reject function
        $(item).children('a.show-workspace-link').on('click', function(event){
            event.preventDefault();
            workspaceDiv.hide(); // this should hide the relationshipsDiv as well
            singleWorkspaceDiv.show();

            let userId = getUserFromCookie();
            if (!userId){
                alert('Could not find user');
            }
            // if (!userId) {
            //     userId = window.location.pathname.match(/[\w\d]{1,}$/)[0]; //proxy for now, will break when route changes
            // }

            let backtoall = `<a href="/workspaces">Back to all workspaces</a>`;
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
            
            //let relationshipRoute = `/relationships/${selected_relationship}/`;
            //let acceptroute = `/relationships/accept/${selected_user ? selected_user : ''}`; // /relationships/relationshipId/status
            //let acceptroute = relationshipRoute + "approved";
    
            //let rejectroute = `/relationships/reject/${selected_user ? selected_user : ''}`;
            //let rejectroute = relationshipRoute + "rejected";
    
            let acceptbtn = $(`<button class=\"accept-pending-request btn btn-primary\">Accept</button>`);
            let rejectbtn = $(`<button class=\"reject-pending-request btn btn-secondary\">Reject</button>`);
    
            acceptbtn.on('click', function(e){
                e.preventDefault();
                let selected_relationship = getElementFromCookie('selected_relationship');
                let acceptroute = `/relationships/${selected_relationship}/`  + "approved";
                $.ajax({
                    type: 'POST',
                    url: acceptroute,
                    success: function(result) {
                        acceptbtn.addClass('disabled');
                        acceptbtn.attr('disabled', 'true');
                        let successful_check = get_successful_request_element();
                        successful_check.addClass('style=\'color:grey\'');
                        acceptbtn.append(successful_check);
    
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
                let selected_relationship = getElementFromCookie('selected_relationship');
                let rejectroute = `/relationships/${selected_relationship}/`  + "rejected";
                $.ajax({
                    type: 'POST',
                    url: rejectroute,
                    success: function(result) {
                        acceptbtn.addClass('disabled');
                        acceptbtn.attr('disabled', 'true');
    
                        rejectbtn.addClass('disabled');
                        rejectbtn.attr('disabled', 'true');
                        let successful_check = get_successful_request_element();
                        successful_check.addClass('style=\'color:grey\'');
                        rejectbtn.append(successful_check);
                        //Disable both buttons
                    },
                    error: function(result,  message) {
                        alert(`${message ? message : "Could not process request"}`);
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


    if (window.location.pathname.startsWith('/workspaces')) {
        singleWorkspaceDiv.hide();
        workspaceDiv.show();
        relationshipsDiv.show();

        // Mentors and mentees
        let userID = getUserFromCookie();
        // Get current user's mentors
        let getMentorEndpoint = `/relationships/mentors`; 
        
        workspaceDiv.append($("<h2>Mentors</h2>"));
        let mentorUl = $(`<ul class='mentor-list'></ul>`);
        workspaceDiv.append(mentorUl);
        
        $.getJSON(getMentorEndpoint).then(function(res) {
            let relationships = res.relationships;
            
            for (let mentorRel of relationships){
                if (mentorRel.status.name.toLowerCase() != "approved"){
                    continue;
                }
                let element = $("<li></li>");
                //element.classList.add(`workspace-notification-${mentorRel.mentor._id}`);
                // Add a button for show workspace
                // button and user profile link will be siblings in tree
                let ws = createShowWorkspaceLink(mentorRel._id);
                element.append(ws);
                element.append(createUserProfileLink(mentorRel.mentor._id, mentorRel.mentor.name));
                let notificationElement = createNotificationElement(mentorRel.mentor);

                //element.append($(`<a class=\"show-workspace-link link-that-looks-like-button\" href=\"/workspaces/relationships/${mentorRel.mentee}/${mentorRel._id}\">Show workspace</a>`)); 
                //element.append($(`<a class=\"user-profile-link\" href="/profile/${mentorRel._id}">${mentorRel.mentor.name}</a>`)); // this should instead link to user profile
                
                // let notificationElement  = $(`<input type=\"checkbox\" class=\"workspace-notification workspace-notification-useritem\" id=\"workspace-notification-${mentorRel.mentor._id}\"/>
                //                             <label for=\"workspace-notification-${mentorRel.mentor._id}\">
                //                                 <i class=\"fas fa-circle\"></i>
                //                             </label>`);
                
                // if (mentorRel.lastCheckInTime && (Date.now() > Date.parse(mentorRel.lastCheckInTime) - ONE_MINUTE)){
                //     notificationElement.show();
                // }
                // else {
                //     notificationElement.hide();
                // }
                ws.append(notificationElement);
                bindClearNotifyElement(ws);

                bindDisplayWorkspaceEvent(element);
                mentorUl.append(element);
            }
        });

        // Get the mentees
        workspaceDiv.append($("<h2>Mentees</h2>"));
        let getMenteeEndpoint = `/relationships/mentees`; 
        let menteeUl = $(`<ul class='mentee-list'></ul>`);
        workspaceDiv.append(menteeUl);

        $.getJSON(getMenteeEndpoint).then(function(res) {
            let relationships = res.relationships;

            for (let menteeRel of relationships){
                let element = $("<li></li>"); //document.createElement('li');
                //element.classList.add(`workspace-notification-${menteeRel.mentee._id}`);
                let ws = createShowWorkspaceLink(menteeRel._id);
                
                element.append(ws);
                element.append(createUserProfileLink(menteeRel.mentee._id, menteeRel.mentee.name));
                let notificationElement = createNotificationElement(menteeRel.mentor);
                // element.append($(`<a class=\"show-workspace-link link-that-looks-like-button\" href=\"/workspaces/relationships/${menteeRel.mentor}/${menteeRel._id}\">Show workspace</a>`)); 
                // element.append($(`<a class=\"user-profile-link\" href="/profile/${menteeRel._id}">${menteeRel.mentee.name}</a>`));
                // let notificationElement  = $(`<input type=\"checkbox\" class=\"workspace-notification workspace-notification-useritem\" id=\"workspace-notification-${menteeRel.mentee._id}\"/>
                //                             <label for=\"workspace-notification-${menteeRel.mentee._id}\">
                //                                 <i class=\"fas fa-circle\"></i>
                //                             </label>`);
                // if (menteeRel.lastCheckInTime && (Date.now() > (Date.parse(menteeRel.lastCheckInTime) - ONE_MINUTE))){
                //     notificationElement.show();
                // }
                // else {
                //     notificationElement.hide();
                // }
                ws.append(notificationElement);
                bindClearNotifyElement(ws); // clears the child notification elem
                bindDisplayWorkspaceEvent(element);
                menteeUl.append(element);
            }
        });


        relationshipsDiv.append($(`<h2>All Relationships</h2>`)); // TODO: Improve by making these collapsable or otherwise hide-able somehow

        // Display the rest of the relationships based on status
        let statuses = ['pending', 'rejected', 'completed'];

        for (let status of statuses) {
            let statusendpoint = `/relationships/${status}`;
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
                        let menteeLink = createUserProfileLink(relationshipObject.mentee._id, relationshipObject.mentee.name + "(Mentee)");
                        $(element).append(menteeLink);
                        currUl.append(element)
                        workspaceName = relationshipObject.mentee;
                    }
                    else {
                        $(element).append(createUserProfileLink(relationshipObject.mentor._id, relationshipObject.mentor.name + "(Mentor)"));
                        currUl.append(element);
                        workspaceName = relationshipObject.mentor;
                    }
                    
                    // TODO::: ADD VALIDATION ON THE BACKEND TO PREVENT A USER FROM 
                    // ACCESSING A WORKSPACE RELATIONSHIP IF THE STATUS IS IN PENDING/REJECTED STATE
                    let showWS = createShowWorkspaceLink(relationshipObject._id);
                    $(element).append(showWS);
                    if (status === 'pending'){
                        // ------ DO within the bindDisplayPending function - check if user is a mentor or mentee. Mentors can do this, mentee cannot use this with this state 
                        // showWS.addClass('disabled'); // displays the btn as disabled
                        bindDisplayPendingWS(element);
                    }
                    else if (status === 'completed') {
                        bindDisplayWorkspaceEvent(element);
                    }
                    else {
                        showWS.attr('href', '#'); 
                    }
                        
                }
                
            });
        }

        workspaceDiv.append(relationshipsDiv);
    }

    function createRelationshipDetailsElement(relationship){
        return $(`<div class='relationship-description'>
                <h3>Relationship Description</h3>
                    <p class='relationship-description'>${relationship.relationshipDescription}<p>
                <h3>Relationship Category</h3>
                     <p class='relationship-category'>${relationship.relationshipCategory.name}<p>
                </div>`);
    }

    function getWorkSpaceDataCallback(res){
        let chat = res.relationship.chatChannel;
        let thisStatus = res.relationship.status.name.toLowerCase();
        let chatWindow, fileWindow;
        let showRelationshipDetails = $('#show-relationship-details');
        showRelationshipDetails.append(createRelationshipDetailsElement(res.relationship));

        if (thisStatus === 'approved'){
            // Include a date submission form
            $('#edit-timeline-interval').show();
            $('#submit-timeline-interval-form').on('click', function(event){
                event.preventDefault();
                let newtime;
                let setting = $('input[name="interval-setting"]:checked').val();

                if (setting === "days"){
                    newtime = ONE_DAY;
                }
                else if (setting === "hours") {
                    newtime = ONE_HOUR;
                }
                else if (setting === "minutes"){
                    newtime = ONE_MINUTE;
                }

                let multiple = $('#input-timeline-interval').val();
                newtime *= parseInt(multiple);

                $.ajax({
                    method: 'post',
                    url: `/relationships/interval/${res.relationship._id}`,
                    data: {
                        timeline: newtime
                    },
                    success: function(response) {
                        if (response.success === true){
                            let btn = $('#submit-timeline-interval-form');
                            let successful_check = get_successful_request_element();
                            successful_check.addClass('style=\'color:grey\'');
                            btn.append(successful_check);
                        }
                    },
                    failure: function(err, errMessage){
                        console.log(errMessage);
                    }
                })
                
            });

        }

        let endBtn = createEndRelationshipBtn();
        if (thisStatus === 'completed'){
            endBtn = $(`<button class=\"end-status-request-btn btn btn-secondary\">Relationship Was Archived</button>`);
            endBtn.addClass('disabled');
            endBtn.attr('disabled', 'true');
        }
        
        showRelationshipDetails.append(endBtn);

        if (chat == null){ // null or undefined
            // When there is no chat yet
            chatWindow = $("<p class='chat-window-placeholder'>No chat to display yet</p>");
        }
        else {
            let selected_relationship = getElementFromCookie('selected_relationship');
            //let newtimeStamp = (new Date()).getTime();
            $.ajax({
                url: `/chats/${selected_relationship}/messages`,
                method: 'GET',
                data: {
                    timestamp: (new Date()).getTime().toString()
                },
                success: function(response) {
                    let element = $(`<div class=\"workspace-chat-window\"></div>`);
                    element.append($(response));
                    if (element.find('script').length > 1){
                        element.find('script')[0].remove(); // Doesn't seem to be removing ***** @10:35AM
                    }
                    singleWorkspaceDiv.append(element);
                    if (thisStatus === 'completed'){
                        $('#submit-chat-message-btn').attr('type', 'button'); // Override submit
                        $('#submit-chat-message-btn').attr('disabled'); // Override submit
                        $('#submit-chat-message-btn').addClass('disabled'); 
                    }
                   
                },
                failure: function(err, errMessage){
                    singleWorkspaceDiv.append($(`<p class='chat-window-placeholder'>Could not load chat window ${errMessage}</p>`));
                }
            }); // chats/:relationshipId/mesages
           // chatWindow = $(`<p class='chat-window'>${chat.toString()}</p>`); // placeholder
        }

        let selected_relationship = getElementFromCookie('selected_relationship');
        //let newtimeStamp = (new Date()).getTime();
        $.ajax({
            url: `/workspaces/${selected_relationship}/files`,
            method: 'GET',
            success: function(response) {
                let element = $(`<div class=\"workspace-file-window\"></div>`);
                element.append($(response));
                singleWorkspaceDiv.append(element);
                if (thisStatus === 'completed'){
                    $('#label-for-uploadfile').text("File Upload Unavailable in Archived Relationship");
                    // Override submit
                    $('#submit-file-upload-btn').attr('type', 'button');
                    $('#submit-file-upload-btn').addClass('disabled'); 
                    $('#submit-file-upload-btn').attr('disabled'); 

                    $('#uploadfile').attr('type', 'button'); 
                    $('#uploadfile').addClass('disabled'); 
                    $('#uploadfile').attr('disabled'); 
                } 
            },
            failure: function(err, errMessage){
                singleWorkspaceDiv.append($(`<p class='file-window-placeholder'>Could not load files ${errMessage}</p>`)); // /:relationshipId/files"
            }
        }); // chats/:relationshipId/mesages
    

        singleWorkspaceDiv.append(chatWindow);
        singleWorkspaceDiv.append(fileWindow);
    }

    function getWorkSpaceData(url, callback) {
        $.getJSON(url,callback).fail(function(error) {
            console.log(error);
        });
    }

    function bindClearNotifyElement(linkItem){
        $(linkItem).on('click', function(event){
            let notificationElem = $(linkItem).children('input');
            notificationElem.hide();
        })
    }

    function createEndRelationshipBtn(){
        let btn = $(`<button class=\"end-status-request-btn btn btn-secondary\">End Relationship</button>`);
    
        btn.on('click', function(e){
            e.preventDefault();
            let selected_relationship = getElementFromCookie('selected_relationship');
            let endroute = `/relationships/${selected_relationship}/`  + 'completed';
            $.ajax({
                type: 'POST',
                url: endroute,
                success: function(result) {
                    btn.addClass('disabled');
                    btn.attr('disabled', 'true');
                    let successful_check = get_successful_request_element();
                    successful_check.addClass('style=\'color:grey\'');
                    btn.append(successful_check);
                },
                error: function(result, message) {
                    alert(`${message ? message : "Could not process request"}`);
                }

            });
        });

        return btn;
    }


    function bindDisplayWorkspaceEvent(listItem) {
        $(listItem).children('a.show-workspace-link').on('click', function(event) {
            event.preventDefault();
            workspaceDiv.hide(); // this should hide the relationshipsDiv as well
            singleWorkspaceDiv.show();

            let userId = getUserFromCookie();
            if (!userId) {
                window.alert('Cannot find user id');
                // userId = window.location.pathname.match(/[\w\d]{1,}$/)[0]; //proxy for now, will break when route changes
            }

            let backtoall = `<a href="/workspaces">Back to all workspaces</a>`;
            singleWorkspaceDiv.append(backtoall); // Add back to all workspaces/relationships
            
            // this passes a NODE element so dom manipulation here is fine
            let h2 = $(`<h2 class='selected-user'>${$(listItem).children('a.user-profile-link')[0].innerHTML}</h2>`); // Other user's name 
            let profile_link = $(listItem).children('a.user-profile-link').attr('href');
            let otherUser = profile_link.match(/(?<=\/profile\/).*$/)[0];
            let setCookieExpression = `document.cookie = \'selected_user=${otherUser}\'; `;
            $(this).attr('onclick', `${setCookieExpression}`);

            singleWorkspaceDiv.append(h2);

            let showRelationshipDetails = $(`<div id='show-relationship-details'></div>`);
            singleWorkspaceDiv.append(showRelationshipDetails);
            var currentLink = this.getAttribute("href"); // workspaces/relationships/:relationshipID
            
            // Do things to display a single workspace
            getWorkSpaceData(currentLink, getWorkSpaceDataCallback);

            $('.workspace-content-placeholder').hide(); // Hide the placeholder class
            $(listItem).children('input:not(:checked)').hide(); // hide notification when pressed

            // TODO: Display chat
            // TODO: Display files

        });
    }

    
})(window.jQuery);