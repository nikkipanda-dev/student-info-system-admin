import { useState, } from "react";
import { request, } from "../../../util/request";
import Cookies from "js-cookie";
import { Form, message, } from "antd";

import Login from "../../widgets/Login";
import Section from "../../core/Section";
import Alert from "../../widgets/Alert";
import Text from "../../core/Text";

export const LandingPage = ({ handleLoggedIn, }) => {
    const [form] = Form.useForm();

    const [alert, setAlert] = useState('');
    const [status, setStatus] = useState('');
    const [header, setHeader] = useState('');
    const [emailHelp, setEmailHelp] = useState('');
    const [passwordHelp, setPasswordHelp] = useState('');

    const handleAlert = message => setAlert(message);
    const handleStatus = status => setStatus(status);
    const handleHeader = header => setHeader(header);
    const handleEmailHelp = message => setEmailHelp(message);
    const handlePasswordHelp = message => setPasswordHelp(message);

    const onLogIn = values => {
        const form = new FormData();
        for (let i in values) {
            values[i] && form.append(i, values[i]);
        }
        
        login(form).then(response => {
            if (!(response.data.is_success)) {
                handleHeader("Login failed");
                handleStatus("danger");
                handleAlert(<Text type="span">{response.data.data}</Text>);
                return;
            }

            handleHeader("Login successful");
            handleStatus("success");
            handleAlert(<Text type="span">Redirecting...</Text>);

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

            handleLoggedIn();
        })

        .catch(err => {
            if (err.response && err.response.data.errors) {
                if (err.response.data.errors.email) {
                    handleEmailHelp(<Text type="span" color="danger">{err.response.data.errors.email[0]}</Text>);   
                }

                if (err.response.data.errors.password) {
                    handlePasswordHelp(err.response.data.errors.password[0]);
                }
            }
        });
    }

    return (
        <Section background="gray2">
        {
            alert &&
            <Alert status={status} header={header}>
                {alert}
            </Alert>
        }
            <Login 
            onFinish={onLogIn} 
            form={form}
            emailHelp={emailHelp}
            passwordHelp={passwordHelp} />
        </Section>
    )
}

async function login(form) {
    return request.post("login", form);
}

export default LandingPage;