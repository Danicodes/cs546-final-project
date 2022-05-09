const DEFAULT_PAGE_NO = 0;
const DEFAULT_POSTS_PER_PAGE = 4;
const BCRYPT_VAL = 8;
const MAX_FILE_SIZE = 10 * 1000 * 1000; // 10 MB
const MIN_CHECKIN_INTERVAL = 2*1000; // 2 seconds in ms
const MAX_CHECKIN_INTERVAL = 864000*1000; // 10 days in ms
const HOME_PAGE_URL = "/posts/html";
// const RESTRICTED_PATHS_REGEX = /^\/(?!login|signup|\/).*$/; // For use in auth middleware, check any route that is not /login or signup
const RESTRICTED_PATHS_REGEX = /^\/(?!login|signup|posts|posts\/html\/|user\/post\/\[\w\d\]\/).*$/;

module.exports = {
    DEFAULT_PAGE_NO,
    DEFAULT_POSTS_PER_PAGE,
    BCRYPT_VAL,
    MAX_FILE_SIZE,
    MIN_CHECKIN_INTERVAL,
    MAX_CHECKIN_INTERVAL,
    HOME_PAGE_URL,
    RESTRICTED_PATHS_REGEX,
    BCRYPT_VAL
}