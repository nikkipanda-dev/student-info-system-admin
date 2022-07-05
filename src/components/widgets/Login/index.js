import { Form, Input, } from 'antd';

import Container from '../../core/Container';
import Button from "../../core/Button";

const formItemLayout = {
    labelCol: {
        sm: { span: 8, },
        md: { span: 7, },
    },
    wrapperCol: {
        offset: 0,
        sm: { span: 24, offset: 1, },
        md: { span: 24, },
    },
}

const validateMessages = {
    required: '${label} is required.',
    types: {
        email: '${label} is not a valid email.',
    },
};

export const Login = ({
    form,
    onFinish,
    emailHelp,
    passwordHelp,
}) => {
    return (
        <Form
        name="login-form"
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
        validateMessages={validateMessages}
        autoComplete="off">
            <Form.Item
            label="Email address"
            name="email"
            {...emailHelp && {help: emailHelp}}
            rules={[{ required: true, type: 'email', }]}>
                <Input />
            </Form.Item>

            <Form.Item
            label="Password"
            name="password"
            {...passwordHelp && {help: passwordHelp}}
            rules={[{ required: true, }]}>
                <Input.Password />
            </Form.Item>

            <Container className="d-flex justify-content-sm-center align-items-center">
                <Button 
                submit 
                text="Submit"
                color="blue"
                className="flex-grow-1 flex-sm-grow-0" />
            </Container>
        </Form>
    )
}

export default Login;