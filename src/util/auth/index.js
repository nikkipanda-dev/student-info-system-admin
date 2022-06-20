import Cookies from "js-cookie";

export function isAuthCookie() {
    let hasCookie = false;

    if (Cookies.get('auth_admin') && Cookies.get('auth_admin_token')) {
        hasCookie = true;
    }

    return hasCookie;
}