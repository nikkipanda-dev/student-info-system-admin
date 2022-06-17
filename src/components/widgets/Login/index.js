import { 
    Form, 
    Input,
    Checkbox,
} from 'antd';

import Container from '../../core/Container';
import Button from "../../core/Button";

const formItemLayout = {
    labelCol: {
        sm: { span: 5, },
        md: { span: 4, },
    },
    wrapperCol: {
        sm: { span: 24, },
        md: { span: 24, },
    },
}

export const Login = ({
    form,
    onFinish,
}) => {
    return (
        <Form
        name="basic"
        {...formItemLayout}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off">
            <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
            </Form.Item>

            <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
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

export default Login;