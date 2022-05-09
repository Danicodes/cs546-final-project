// Milliseconds vars
const FIVE_MINUTES = 300000;
const FIVE_SECONDS = 5000;
const ONE_DAY = 86400 * 1000; // One day 86400 * 1000 ms
const ONE_HOUR = 3600 * 1000;
const ONE_MINUTE = 60000; 

const CHECKMARK = '✓';

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


function get_successful_request_element(){
    return $(`<i class="successful-request material-icons">check_circle</i>`);
}