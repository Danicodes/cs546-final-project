// TODO: Check when the user has selected a mentor and then

//  load the relevant info for that mentor workspace
console.log("script started");
let mentee = document.getElementById('profile-mentee-ID');
let mentor = document.getElementById('profile-mentor-ID');


function toggleUserView() {
    if ($('#profile-mentee-ID').is(":visible")){
        $('#profile-mentee-ID').hide();
        $('#profile-mentor-ID').show();
    }
    else{
        $('#profile-mentor-ID').hide();
        $('#profile-mentee-ID').show();
    }
}

$('#new-relationship').on('click', function(event){
    let mentee = getUserFromCookie();
    if ($('#new-relationship').children('#menteeId-value').length > 0){
        $($('#new-relationship').children('#menteeId-value')[0].replaceWith($(`<input id="menteeId-value" type="text" name="menteeId" value="${mentee}" hidden>`)));
    }
    else {
        $('#new-relationship').append($(`<input id="menteeId-value" type="text" name="menteeId" value="${mentee}" hidden>`));
    }
    
    //$($('#new-relationship').children('input')[0]).replaceWith($("<p>testing</p>"))
});
/*(function ($){  
})(window.jQuery);*/