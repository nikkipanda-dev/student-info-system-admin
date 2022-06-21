import { Form, Input, } from 'antd';

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

export const RegisterUser = ({
    form,
    onFinish,
    firstNameHelp,
    middleNameHelp,
    lastNameHelp,
    emailHelp,
    passwordHelp,
}) => {
    return (
        <Form
        name="registration-form"
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
        validateMessages={validateMessages}
        autoComplete="off">
            <Form.Item
                label="First name"
                name="first_name"
                {...firstNameHelp && { help: firstNameHelp }}
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
                {...middleNameHelp && { help: middleNameHelp }}
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
                {...lastNameHelp && { help: lastNameHelp }}
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
            {...emailHelp && { help: emailHelp }}
            rules={[{ required: true, type: 'email', }]}>
                <Input allowClear />
            </Form.Item>

            <Form.Item
            label="Temporary password"
            name="password"
            {...passwordHelp && { help: passwordHelp }}
            rules={[{ required: true, }]}>
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

export default RegisterUser;