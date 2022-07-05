import { useState, useEffect, } from "react";
import { useNavigate, } from "react-router-dom";
import Container from "../../core/Container";
import { Dropdown, Menu, } from "antd";
import { request, } from "../../../util/request";
import { styled, } from "../../../stitches.config";
import Cookies from "js-cookie";
import Sidebar from "../Sidebar";
import { getToken } from "../../../util/auth";

import Text from "../../core/Text";

const Nav = styled('nav', {
    position: 'sticky',
    top: 0,
    background: '$white',
    padding: '$15',
    transition: '$default',
    zIndex: '99999',
});

export const Navbar = ({ 
    isAuth,
    authUser, 
    isMobileView,
    handleLoggedOut,
}) => {
    const navigate = useNavigate();

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

    const navigator = pathname => {
        navigate(pathname, {replace: true});
    }

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    type: 'group',
                    label: <Text type="span">Settings</Text>,
                    children: [
                        {
                            key: '1-1',
                            label: <Container onClick={() => navigator("/settings")}><Text type="span" color="info">Settings</Text></Container>,
                        },
                    ],
                },
                {
                    type: 'divider',
                },
                {
                    key: '2',
                    label: <Container onClick={() => onLogOut()}><Text type="span" color="info">Sign out</Text></Container>,
                },
            ]}
        />
    );

    return (
        <Nav>
            {/* Click trigger for mobile view */}
            <Dropdown overlay={menu} trigger={['click', 'hover']}>
                <a onClick={(e) => e.preventDefault()}>
                    Click me
                </a>
            </Dropdown>
            {
                isMobileView && 
                <Sidebar 
                isAuth={isAuth} 
                authUser={authUser}
                className="d-flex flex-column flex-sm-row" />
            }
        </Nav>
    )
}

async function logout(form) {
    return request.post("logout", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

export default Navbar;