function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function getUserFromCookie(){
    let user;
    if  (document.cookie.match(/user=/)){
        user = document.cookie
        .split('; ')
        .find(row => row.startsWith('user='));

        if (user.length > 0){
            user = user.split('=', 1)[1]; // limit the regex to single match
        }
        return user;
    }
    else {
        return null;
    }
}

// if only I'd realized I could do this sooner

const CHECKMARK = '✓';
function get_successful_request_element(){
    return $(`<i class="successful-request material-icons">check_circle</i>`);
}