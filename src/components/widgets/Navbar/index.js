import { useState, useEffect, } from "react";
import Container from "../../core/Container";
import { request, } from "../../../util/request";
import { useNavigate, } from "react-router-dom";
import { styled, fadeIn, } from "../../../stitches.config";
import Cookies from "js-cookie";

const Nav = styled('nav', {
    position: 'sticky',
    top: 0,
    background: 'blue',
    transition: '$default',
    opacity: 0,
    animation: `${fadeIn} .2s ease-in-out .2s 1 normal forwards`,
});

export const Navbar = ({ isAuth, handleLoggedOut, }) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleHideSpinner = () => setIsLoading(false);

    const onLogOut = () => {
        if (!(isAuth)) {
            console.error("Not logged in.");
            return;
        }

        const form = new FormData();
        form.append('email', JSON.parse(Cookies.get('auth_admin')).email);

        logout(form).then(response => {
            console.info('res ', response);
            if (!(response.data.is_success)) {
                console.error('failed to log out');
                return;
            }

            Cookies.remove('auth_admin');
            Cookies.remove('auth_admin_token');

            handleLoggedOut();
        })

        .catch(err => {
            console.error('err ', err);
        });
    }

    useEffect(() => {
        let loading = true;

        if (loading && isAuth) {
            handleHideSpinner();
        }

        return () => {
            loading = false;
        }
    }, []);

    return (
        !(isLoading) && 
        <Nav>
            <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, molestias!
            </span>
            <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, molestias!
            </span>
            <button type="button" onClick={() => onLogOut()}>Logout</button>
        </Nav>
    )
}

async function logout(form) {
    const authToken = JSON.parse(Cookies.get('auth_admin_token'));

    return request.post("logout", form, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        }
    });
}

export default Navbar;