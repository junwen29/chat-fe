export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

export function jwtQueryString() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return '?jwt=' + user.token ;
    } else {
        return '';
    }
}