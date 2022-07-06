import { useState, } from "react";
import { request, } from "../../../util/request";
import { getErrorMessage, getAlertComponent, } from "../../../util";
import Cookies from "js-cookie";
import { Form, } from "antd";
import { sectionStyle, } from "../../../stitches.config";

import Login from "../../widgets/Login";
import Section from "../../core/Section";
import Container from "../../core/Container";
import Image from "../../core/Image";

export const LandingPage = ({ isAuth, handleLoggedIn, }) => {
    const [form] = Form.useForm();

    const [alert, setAlert] = useState('');
    const [emailHelp, setEmailHelp] = useState('');
    const [passwordHelp, setPasswordHelp] = useState('');

    const handleAlertComponent = payload => setAlert(payload);
    const handleEmailHelp = message => setEmailHelp(message);
    const handlePasswordHelp = message => setPasswordHelp(message);

    const onLogIn = values => {
        const form = new FormData();
        for (let i in values) {
            values[i] && form.append(i, values[i]);
        }
        
        login(form).then(response => {
            if (!(response.data.is_success)) {
                handleAlertComponent(getAlertComponent("Login failed", "danger", response.data.data, {
                    marginTop: '0',
                }));
                return;
            }

            handleAlertComponent(getAlertComponent("Login successful", "success", "Redirecting...", {
                marginTop: '0',
            }));

            const cookieExpiration = 0.5;

            Cookies.set('auth_admin', JSON.stringify(response.data.data.details.user), {
                expires: cookieExpiration,
                sameSite: 'strict',
                secure: true,
            });

            Cookies.set('auth_admin_token', JSON.stringify(response.data.data.details.token), {
                expires: cookieExpiration,
                sameSite: 'strict',
                secure: true,
            });

            setTimeout(() => {
                handleLoggedIn();                
            }, 1000);
        })

        .catch(err => {
            if (err.response && err.response.data.errors) {
                err.response.data.errors.email && handleEmailHelp(getErrorMessage(err.response.data.errors.email[0]));
                err.response.data.errors.password && handlePasswordHelp(getErrorMessage(err.response.data.errors.password[0]));
            }
        });
    }

    return (
        <Section 
        className="d-flex justify-content-center align-items-center" 
        css={{ minHeight: '90vh', }}>
            <Container css={{
                ...sectionStyle,
                width: '35%',
                '@media screen and (max-width: 1500px)': {
                    width: '40%',
                },
                '@media screen and (max-width: 1200px)': {
                    width: '50%',
                },
                '@media screen and (max-width: 900px)': {
                    width: '70%',
                },
                '@media screen and (max-width: 767px)': {
                    width: '80%',
                },
                '@media screen and (max-width: 575px)': {
                    width: '100%',
                },
            }}>
                <Container 
                className="d-flex justify-content-center" 
                css={{marginBottom: '$30', }}>
                    <Image 
                    src="https://student-info-system.sfo3.digitaloceanspaces.com/illustrations/informatics_logo_full.png"
                    css={{
                        maxWidth: '300px',
                        display: 'none',
                        '@media screen and (min-width: 576px)': {
                            display: 'block',
                        },
                    }} />
                    <Image 
                    src="https://student-info-system.sfo3.digitaloceanspaces.com/illustrations/informatics_logo.png"
                    css={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        display: 'block',
                        '@media screen and (min-width: 576px)': {
                            display: 'none',
                        },
                    }} />
                </Container>
            {
                alert
            }
                <Login
                onFinish={onLogIn}
                form={form}
                emailHelp={emailHelp}
                passwordHelp={passwordHelp} />
            </Container>
        </Section>
    )
}

async function login(form) {
    return request.post("login", form);
}

export default LandingPage;