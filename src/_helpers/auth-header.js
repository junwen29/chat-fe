export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

// used for adding jwt as a string to the requestURL of websocket connection
export function jwtQueryString() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return '?jwt=' + user.token;
    } else {
        return '';
    }
}