import { useNavigate, } from "react-router-dom";
import Container from "../../core/Container";
import { Dropdown, Menu, } from "antd";
import { request, } from "../../../util/request";
import { styled, } from "../../../stitches.config";
import Cookies from "js-cookie";
import Sidebar from "../Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, } from "@fortawesome/free-solid-svg-icons";
import { getToken } from "../../../util/auth";

import Text from "../../core/Text";

const Nav = styled('nav', {
    position: 'sticky',
    top: 0,
    background: '$white',
    padding: '$30 $20',
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
        isAuth && authUser && (Object.keys(authUser).length > 0) &&
        <Nav>
            {/* Click to trigger for mobile view */}
            <Container className="d-flex flex-column-reverse flex-sm-column">
                <Container className="d-flex justify-content-center justify-content-sm-end align-items-center flex-grow-1 flex-sm-grow-0">
                    <Dropdown
                    overlay={menu}
                    className="align-self-center"
                    trigger={['click', 'hover']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Container className="d-flex align-items-center">
                                <FontAwesomeIcon
                                icon={faUser}
                                className={`fa-fw ${!(isMobileView) ? "fa-3x" : "fa-2x"}`}
                                style={{ color: '#00B4D8', }} />
                                <Text
                                type="span"
                                color="info"
                                css={{
                                    marginLeft: '$5',
                                    display: 'none',
                                    '@media screen and (max-width: 575px)': {
                                        display: 'inline-block',
                                    },
                                }}>{authUser.first_name}</Text>
                            </Container>
                        </a>
                    </Dropdown>
                </Container>
                {
                    isMobileView &&
                    <Sidebar
                    isAuth={isAuth}
                    authUser={authUser}
                    className="d-flex flex-wrap justify-content-center"
                    css={{ 
                        marginTop: '$20',
                        '> a:nth-child(n+2)': {
                            marginLeft: '$10',
                        },
                        '@media screen and (max-width: 575px)': {
                            marginTop: '0px',
                        },
                     }} />
                }
            </Container>
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