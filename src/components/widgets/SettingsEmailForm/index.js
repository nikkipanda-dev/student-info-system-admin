import { useState, useEffect, } from "react";
import { Form, Input, } from "antd";
import { getErrorMessage, getAlertComponent, } from "../../../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faBan, } from "@fortawesome/free-solid-svg-icons";
import { setCookieEmail, } from "../../../util/auth";

import Button from "../../core/Button";
import Text from "../../core/Text";
import Heading from "../../core/Heading";
import Container from "../../core/Container";

const styling = {
    '@media screen and (max-width: 575px)': {
        'button': {
            marginTop: '$10',
        }
    },
}

const formStyling = {
    background: '$white',
    borderRadius: '$small',
    margin: 'auto',
    padding: '$20',
    maxWidth: '700px',
}

const formItemLayout = {
    labelCol: {
        sm: { span: 6, },
        md: { span: 5, },
    },
    wrapperCol: {
        sm: { span: 24, },
        md: { span: 24, },
    },
}

const validateMessages = {
    required: '${label} is required.',
    types: {
        email: '${label} is not a valid email.',
    },
    string: {
        range: "${label} must be must be between ${min} and ${max} characters.",
    },
};

export const SettingsEmailForm = ({
    authUser,
    onFinish,
    values,
    slug,
    emitMessage,
    users,
    handleUsers,
    handleArrayObj,
    handleUser,
}) => {
    const [form] = Form.useForm();

    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [emailHelp, setEmailHelp] = useState('');
    const [alert, setAlert] = useState('');

    const handleToggleForm = () => setIsVisible(!(isVisible));
    const handleEmail = payload => setEmail(payload);
    const handleEmailHelp = message => setEmailHelp(message);
    const handleAlertComponent = payload => setAlert(payload);

    const resetForm = () => {
        form.resetFields();
        handleEmailHelp('');
        handleAlertComponent(getAlertComponent(null, null, null));
        handleToggleForm();
    }

    const onUpdateEmail = values => {
        const updateForm = new FormData();

        for (let i in values) {
            values[i] && updateForm.append(i, values[i]);
        }

        updateForm.append("auth_email", authUser.email);
        updateForm.append("slug", slug);

        emitMessage("Loading", "loading", 2);

        onFinish(updateForm).then(response => {
            if (!(response.data.is_success)) {
                handleAlertComponent(getAlertComponent("Error", "danger", response.data.data));
                return;
            }

            resetForm();
            handleEmail(response.data.data.details);
            handleAlertComponent(getAlertComponent(null, null, null));
            setTimeout(() => {
                emitMessage("Email address updated.", "success", 2.5);
            }, 2000);
        })

        .catch(err => {
            if (err.response && err.response.data.errors) {
                err.response.data.errors.email && handleEmailHelp(getErrorMessage(err.response.data.errors.email[0]));
            }
        });
    }

    useEffect(() => {
        let loading = true;

        if (loading && (values && (Object.keys(values).length > 0))) {
            handleEmail(values.email);
        }

        return () => {
            loading = false;
        }
    }, [values.slug]);

    useEffect(() => {
        let loading = true;

        if (loading && values && (Object.keys(values).length > 0) && email) {
            if (handleArrayObj) {
                handleArrayObj({
                    ...values,
                    email: email,
                });
            }

            if (handleUsers) {
                handleUsers(Object.keys(users).map((_, val) => {
                    if (Object.values(users)[val].slug === slug) {
                        return {
                            ...Object.values(users)[val],
                            email: email,
                        }
                    }

                    return Object.values(users)[val];
                }));
            }

            let arr = {
                ...authUser,
                email: email,
            }

            if (handleUser) {
                handleUser(arr);
                setCookieEmail(arr);
            }
        }

        return () => {
            loading = false;
        }
    }, [email]);

    return (
        (values && (Object.keys(values).length > 0) && email) && 
        <Container css={styling}>
            <Container
            className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center"
            css={{ margin: '$30 0px $15', }}>
                <Heading type={4} text="Email Address" />
                <Button
                text={
                    <>
                        <FontAwesomeIcon icon={isVisible ? faBan : faPen} className="fa-fw fa-md" />
                        <Text
                        type="span"
                        size="default"
                        css={{ marginLeft: '$5', }}>{isVisible ? "Cancel" : "Update"}</Text>
                    </> 
                }
                color={isVisible ? "" : "yellow"}
                className="flex-grow-1 flex-sm-grow-0"
                onClick={() => handleToggleForm()} />
            </Container>
            <Container css={{ margin: '$20 0px', }}>
                <Text type="span">Current: {`${email}`}</Text>
            </Container>
        {
            isVisible && 
            <Container css={formStyling}>
            {
                alert
            }
                <Form
                name="student-email-form"
                {...formItemLayout}
                form={form}
                onFinish={onUpdateEmail}
                validateMessages={validateMessages}
                autoComplete="off">

                    <Form.Item
                    label="Email address"
                    name="email"
                    {...emailHelp && { help: emailHelp }}
                    rules={[{
                        required: true,
                        type: 'email',
                    }]}>
                        <Input allowClear />
                    </Form.Item>

                    <Container className="d-flex flex-column flex-sm-row justify-content-sm-center align-items-sm-center">
                        <Button
                        submit
                        text="Submit"
                        color="blue"
                        className="flex-grow-1 flex-sm-grow-0" />
                    </Container>
                </Form> 
            </Container>
        }
        </Container>
    )
}

export default SettingsEmailForm;