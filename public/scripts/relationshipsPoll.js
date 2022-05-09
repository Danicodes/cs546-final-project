function getUserFromCookie(){
    let user;
    if  (document.cookie.match(/user=/)){
        user = document.cookie
        .split('; ')
        .find(row => row.startsWith('user='));

        if (user.length > 0){
            let userSplit = user.split('=')[1]; // limit the regex to single match
            if (userSplit.includes('=')){
                user = user.split('=', 1)[1];
            }
            else{
                return userSplit;
            }
        }
        return user;
    }
    else {
        return null;
    }
}

function relationshipPollAjax(){
    console.log("Poll is working");
    let thisRelationships =JSON.parse(window.localStorage.getItem('relationships')); // convert to object
    if (thisRelationships){
        if (thisRelationships
            .some(function(item) {
                return (item.timelineInterval && ( Date.now() - Date.parse(item.lastCheckInTime) ) > (item.timelineInterval - ONE_MINUTE) );
                    //(item.timelineInterval + Date.parse(item.lastCheckInTime)) > ((new Date()).getTime() - ONE_MINUTE));
                })
            ) { // if one element in the array has a checkin time within one minute show the main workspace notif
                // check window.location to determine which should show???
                console.log("At least one checkin upcoming");
                $(`#nav-workspace-notification`).show(); // Just show the main nav notif here
            }
        // else { // Don't hide here, this should persist til clicked
        //     console.log("No upcoming checkins");
        //     $(`.workspace-notification`).hide(); // If no upcoming checkins then there shouldn't be anything displayed I think
        //     //return; // No checkin time don't continue
        // }

        for (let relationship of thisRelationships){
            if (relationship.timelineInterval){
                let interval = relationship.timelineInterval; //number
                let scheduledcheckin = relationship.lastCheckInTime;

                let timeDiff = (Date.now() - Date.parse(scheduledcheckin) );
                if (timeDiff > (interval - ONE_MINUTE)) {
                    $(`#workspace-notification-${relationship.mentor._id}`).css('color', 'orange'); // Show both only the relevant one will appear
                    $(`#workspace-notification-${relationship.mentee._id}`).css('color', 'orange');
                } 
                else if (timeDiff >= interval) {
                    $(`#workspace-notification-${relationship.mentor._id}`).css('color', 'red'); // Show both only the relevant one will appear
                    $(`#workspace-notification-${relationship.mentee._id}`).css('color', 'red');
                }
                // Date.parse lastcheckin = time in ms
                let nextCheckin = new Date();
                nextCheckin.setTime(Date.parse(scheduledcheckin) + interval)
                //(lastcheckinDate.getMilliseconds() + interval); //Date.parse(lastcheckin) + interval;
                let nowtime = new Date();
                console.log(`last -- ${(new Date(Date.parse(scheduledcheckin))).toLocaleString()} : next -- ${nextCheckin.toLocaleString()}`);

                if ((Date.now() - Date.parse(scheduledcheckin)) > (interval - ONE_MINUTE) ){ 
                //if (nowtime > nextCheckin){   
                    //$(`.workspace-notification`).show(); // .css("color", "red");
                    $(`#workspace-notification-${relationship.mentor._id}`).show(); // Show both only the relevant one will appear
                    $(`#workspace-notification-${relationship.mentee._id}`).show();
                    
                    // If a user is not on a workspace related page, then show in nav bar as well
                    if (!window.location.pathname.startsWith('/workspaces')){
                        $(`#nav-workspace-notification`).show();
                    }

                    // --------------------------------------       ADD attr checked in atxxx

                    nextCheckin.setTime(nowtime.getTime() + interval); // if nexttime < nowtime we have to set the interval according to the current time

                    let user = getUserFromCookie();
                    //make request to update last checkin time to next checkin
                    if (user === relationship.mentor._id){ // Prevent constant 403s
                    $.ajax(
                        {
                            method: 'POST',
                            url: `/relationships/updateCheckin/`,
                            data: { relationshipId: relationship._id,
                                     lastCheckIn: nextCheckin,
                                      userId: user },
                            success: function() {
                                console.log("Updated check in time");
                            }
                        }   
                    );
                    }

                }

            }

        }
    }
}

var pollInterval = setInterval(function (){
    relationshipPollAjax();

}, ONE_MINUTE); // Every 1 minute call the poll function

function getUsersRelationships(){
    if (document.getElementById('#refresh-messages')){
        $('#refresh-messages').trigger('click');
    }
    let user = getUserFromCookie();
    if (user == null){
        return;
    }

    // Ajax req to get all active user relationships for me
    $.ajax({
        method: 'GET',
        url: `/relationships/approved`,
        success: function(res){
            console.log("Updating relationships");
            if (res.relationships.length > 0){
                window.localStorage.setItem('relationships', JSON.stringify(res.relationships)); // Store a list of relationships
                $('.workspace-content-placeholder')[0].innerHTML = "Select a workspace to join";
            }
            else {
                $('.workspace-content-placeholder')[0].innerHTML = "No workspaces to show";
            }
            return;
        } 
    });

    // callback will add an array of relationshipObjs
    //[ { relId: id , mentor: id, mentee: id, 
    //      lastCheckintime: date, timeInterval: time } ]

}

setInterval(getUsersRelationships, ONE_MINUTE) //
getUsersRelationships();
// "Bind" some sort of polling function to mentors and mentees
// Initially get all active relationships for my user id
// store in localstorage or something
// poll everyfew 30 seconds or so
// AS long as this script is being loaded it will start to fire so we 
// don't necessarily need to add it everywhere explicitly