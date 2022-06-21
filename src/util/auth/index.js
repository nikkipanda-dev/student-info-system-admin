import Cookies from "js-cookie";

export function isAuthCookie() {
    let hasCookie = false;

    if (Cookies.get('auth_admin') && Cookies.get('auth_admin_token')) {
        hasCookie = true;
    }

    return hasCookie;
}

export function getToken() {
    return JSON.parse(Cookies.get('auth_admin_token'));
}

export function getAuthEmail() {
    return JSON.parse(Cookies.get('auth_admin')).email;
}