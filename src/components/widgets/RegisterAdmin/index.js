import { useState, useEffect, } from 'react';
import { Form, Input, } from 'antd';
import { getAuthEmail, } from '../../../util/auth';
import { getErrorMessage, } from '../../../util';

import Container from '../../core/Container';
import Button from '../../core/Button';

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
    types: {
        email: '${label} is not a valid email.',
    },
    string: {
        range: "${label} must be must be between ${min} and ${max} characters.",
    },
};

export const RegisterAdmin = ({
    form,
    onFinish,
    emitMessage,
    isAuth,
    handleAlertComponent,
    administrators,
    handleAdministrators,
    resetForm,
    handleHideModal,
}) => {
    const [helpers, setHelpers] = useState('');
    let arr;

    const handleHelpers = payload => setHelpers(payload);

    const onStore = values => {
        if (!(isAuth)) {
            console.info('on store admin: not auth');
            return;
        }

        const form = new FormData();

        for (let i in values) {
            values[i] && form.append(i, values[i]);
        }

        form.append("auth_email", getAuthEmail());

        emitMessage("Loading", "loading", 2);

        onFinish(form).then(response => {
            if (!(response.data.is_success)) {
                handleAlertComponent("Error", "danger", response.data.data);
                return;
            }

            arr = administrators;
            (Object.values(arr).length > 0) ? arr.push(response.data.data.details) : arr = [response.data.data.details];
            resetForm();
            handleHideModal();
            handleAdministrators(arr);
            setTimeout(() => {
                emitMessage("Administrator added.", "success", 2.5);
            }, 2000);
        })

        .catch(err => {
            if (err.response && err.response.data.errors) {
                console.error('err ', err.response.data.errors);
                handleHelpers({
                    first_name: err.response.data.errors.first_name && getErrorMessage(err.response.data.errors.first_name[0]),
                    middle_name: err.response.data.errors.middle_name && getErrorMessage(err.response.data.errors.middle_name[0]),
                    last_name: err.response.data.errors.last_name && getErrorMessage(err.response.data.errors.last_name[0]),
                    email: err.response.data.errors.email && getErrorMessage(err.response.data.errors.email[0]),
                    password: err.response.data.errors.password && getErrorMessage(err.response.data.errors.password[0]),
                    password_confirmation: err.response.data.errors.password_confirmation && getErrorMessage(err.response.data.errors.password_confirmation[0]),
                });
            }
        });
    }

    return (
        <Form
        name="admin-registration-form"
        {...formItemLayout}
        form={form}
        onFinish={onStore}
        validateMessages={validateMessages}
        autoComplete="off">
            <Form.Item
                label="First name"
                name="first_name"
                {...helpers && helpers.first_name && { help: helpers.first_name }}
                rules={[{ 
                    required: true, 
                    type: 'string', 
                    min: 2, 
                    max: 200,
                }]}>
                <Input allowClear />
            </Form.Item>

            <Form.Item
                label="Middle name"
                name="middle_name"
                {...helpers && helpers.middle_name && { help: helpers.middle_name }}
                rules={[{ 
                    type: 'string',
                    min: 2,
                    max: 200,
                }]}>
                <Input allowClear />
            </Form.Item>

            <Form.Item
                label="Last name"
                name="last_name"
                {...helpers && helpers.last_name && { help: helpers.last_name }}
                rules={[{ 
                    required: true, 
                    type: 'string',
                    min: 2,
                    max: 200,
                }]}>
                <Input allowClear />
            </Form.Item>

            <Form.Item
            label="Email address"
            name="email"
            {...helpers && helpers.email && { help: helpers.email }}
            rules={[{ required: true, type: 'email', }]}>
                <Input allowClear />
            </Form.Item>

            <Form.Item
            label="Temporary password"
            name="password"
            {...helpers && helpers.password && { help: helpers.password }}
            rules={[{ 
                required: true,
                type: 'string',
                min: 8,
                max: 20,
            }]}>
                <Input.Password allowClear visibilityToggle />
            </Form.Item>

            <Form.Item
            label="Repeat password"
            name="password_confirmation"
            dependencies={['password']}
            {...helpers && helpers.password_confirmation && { help: helpers.password_confirmation }}
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

            <Container className="d-flex">
                <Button
                submit
                text="Submit"
                color="blue"
                className="flex-grow-1 flex-sm-grow-0" />
            </Container>
        </Form>
    )
}

export default RegisterAdmin;