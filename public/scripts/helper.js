function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

// if only I'd realized I could do this sooner

const CHECKMARK = '✓';
function get_successful_request_element(){
    return $(`<i class="successful-request material-icons">check_circle</i>`);
}