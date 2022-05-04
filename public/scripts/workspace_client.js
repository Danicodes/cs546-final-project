// TODO: Check when the user has selected a mentor and then
//  load the relevant info for that mentor workspace
let mentorButton = document.getElementsByClassName('mentor-workspace');
let menteeButton = document.getElementsByClassName('mentee-workspace');

async function getWorkSpace(relationshipId){
    let relationship = await $.getJSON(`/workspaces/relationships/${relationshipId}`);
    return relationship;
}

// if (mentorButton) {
//     mentorButton.addEventListener('click', getWorkSpace);
    
// }

console.log("AJAX HAPPENS HERE");
(function ($){ 
    // This script will control the display of the relationships widget when on /workspaces or /relationships
    let relationshipsDiv = $('#relationships-div');
    let relationshipsWorkspaceDiv = $('relationships-workspace-div');

    let currEndpoint = window.location.pathname;

    if (window.location.pathname.startsWith("/workspaces/")){
        //relationshipsDiv
        // hit relationships endpoint
        //todo: hide the workspace div, empty the previous content
        let jsonRes;
        $.getJSON(currEndpoint).then(function(res) {
            jsonRes = res.data;
        }); 

        console.log(jsonRes);
        // list of relationshipObjs
        let mentorIds = jsonRes.users.mentorList;
        let mentorObjects = [];
        for (let mentorId of mentorIds) {
            let userendpoint = `/users/${mentorId}`;
            let response;
            $.getJSON(userendpoint).then(function(res) {
                response = res.data;
            });
            mentorObjects.push(response); 
        }

        let menteeIds = jsonRes.users.menteeList;
        // TODO get user lists

        let mentorH2 = $("h2");
        relationshipsDiv.append(mentorH2);

        let mentors = {'approved': null, 'pending': null, 'completed': null, 'rejected': null }; 
        let currUl;
        for (let key of mentors){
            relationshipsDiv.append($(`<h3>${key.toUpperCase()+key.substring(1)}</h3>`)) // transform key to title case
            
            currUl = $("ul");

            mentors[key] = [];
            mentors[key].push(...mentorRelationships.map((relationshipObj) => {
                if (relationshipObj.status.name === key){
                    // new li
                    currUl.append($(`<li class="approved-mentors">${relationshipObj.name}</li>`));
                    return relationshipObj;
                }
            }));
        }

        let mentees = {'approved': null, 'pending': null, 'completed': null, 'rejected': null};
        for (let key of mentees){
            mentees[key] = [];
            mentees[key].push(...menteeRelationships.map((relationshipObj) => {
                if (relationshipObj.status.name === key){
                    return relationshipObj
                }
            }));
        }





    }
    

})(window.jQuery);