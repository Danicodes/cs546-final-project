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
/*(function ($){  
})(window.jQuery);*/