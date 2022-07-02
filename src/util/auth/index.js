import Cookies from "js-cookie";

export function isAuthCookie() {
    let hasCookie = false;

    if (Cookies.get('auth_admin') && Cookies.get('auth_admin_token')) {
        hasCookie = true;
    }

    return hasCookie;
}

export function getToken(secret) {
    const cookieExpiration = 0.5;

    if (secret && Cookies.get('auth_admin') && Cookies.get('auth_admin_token')) {
        Cookies.set('auth_admin_token', JSON.stringify(secret), {
            expires: cookieExpiration,
            sameSite: 'strict',
            secure: true,
        });
    }

    return JSON.parse(Cookies.get('auth_admin_token'));
}

export function getAuthEmail() {
    return JSON.parse(Cookies.get('auth_admin')).email;
}