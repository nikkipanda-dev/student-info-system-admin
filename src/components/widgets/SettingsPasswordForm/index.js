import { useState, } from "react";
import { Form, Input, } from "antd";
import { getErrorMessage, getAlertComponent, } from "../../../util";

import Button from "../../core/Button";
import Heading from "../../core/Heading";
import Container from "../../core/Container";

const styling = {
    '@media screen and (max-width: 575px)': {
        'button': {
            marginTop: '$10',
        }
    },
}

const formItemLayout = {
    labelCol: {
        sm: { span: 9, },
        md: { span: 8, },
    },
    wrapperCol: {
        sm: { span: 24, },
        md: { span: 24, },
    },
}

const validateMessages = {
    required: '${label} is required.',
    string: {
        range: "${label} must be must be between ${min} and ${max} characters.",
    },
};

export const SettingsPasswordForm = ({
    authUser,
    onFinish,
    slug,
    emitMessage,
}) => {
    const [form] = Form.useForm();

    const [isVisible, setIsVisible] = useState(false);
    const [passwordHelp, setPasswordHelp] = useState('');
    const [passwordConfirmationHelp, setPasswordConfirmationHelp] = useState('');
    const [alert, setAlert] = useState('');

    const handleToggleForm = () => setIsVisible(!(isVisible));
    const handlePasswordHelp = message => setPasswordHelp(message);
    const handlePasswordConfirmationHelp = message => setPasswordConfirmationHelp(message);
    const handleAlertComponent = payload => setAlert(payload);

    const resetForm = () => {
        form.resetFields();
        handlePasswordHelp('');
        handlePasswordConfirmationHelp('');
        handleAlertComponent(getAlertComponent(null, null, null));
    }

    const onUpdatePassword = values => {
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
            handleAlertComponent(getAlertComponent(null, null, null));
            setTimeout(() => {
                emitMessage("Password updated.", "success", 2.5);
            }, 2000);
        })

        .catch(err => {
            if (err.response && err.response.data.errors) {
                err.response.data.errors.password && handlePasswordHelp(getErrorMessage(err.response.data.errors.password[0]));
                err.response.data.errors.password_confirmation && handlePasswordConfirmationHelp(getErrorMessage(err.response.data.errors.password_confirmation[0]));
            }
        });
    }
    
    return (
        (slug && (Object.keys(slug).length > 0)) && 
        <Container css={styling}>
            <Container
            className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center"
            css={{ margin: '$30 0px $15', }}>
                <Heading type={4} text="Password" />
                <Button
                text={isVisible ? "Cancel" : "Update"}
                color={isVisible ? "" : "yellow"}
                className="flex-grow-1 flex-sm-grow-0"
                onClick={() => handleToggleForm()} />
            </Container>
        {
            isVisible && 
            <Container>
            {
                alert
            }
                <Form
                name="student-password-form"
                {...formItemLayout}
                form={form}
                onFinish={onUpdatePassword}
                validateMessages={validateMessages}
                autoComplete="off">

                    <Form.Item
                    label="Temporary password"
                    name="password"
                    {...passwordHelp && { help: passwordHelp }}
                    rules={[
                        {
                            required: true,
                            type: 'string',
                            min: 8,
                            max: 20,
                        },
                    ]}>
                        <Input.Password allowClear visibilityToggle />
                    </Form.Item>

                    <Form.Item
                    label="Repeat password"
                    name="password_confirmation"
                    dependencies={['password']}
                    {...passwordConfirmationHelp && { help: passwordConfirmationHelp }}
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm the temporary password.',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match.'));
                            },
                        }),
                    ]}>
                        <Input.Password allowClear visibilityToggle />
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

export default SettingsPasswordForm;