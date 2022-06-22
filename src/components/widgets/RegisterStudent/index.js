import { 
    Form, 
    Input,
    Radio,
    Select,
} from 'antd';

import Container from '../../core/Container';
import Button from '../../core/Button';

const { Option } = Select;

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

export const RegisterStudent = ({
    form,
    onFinish,
    firstNameHelp,
    middleNameHelp,
    lastNameHelp,
    studentNumberHelp,
    courseHelp,
    yearHelp,
    termHelp,
    emailHelp,
    passwordHelp,
}) => {
    const selectOptions = [
        {
            id: 1,
            value: "bsit",
            label: "Bachelor of Science in Information Technology",
            isDisabled: false,
        },
        {
            id: 2,
            value: "bscs",
            label: "Bachelor of Science in Computer Science",
            isDisabled: true,
        },
        {
            id: 3,
            value: "bsis",
            label: "Bachelor of Science in Information Systems",
            isDisabled: true,        
        },
        {
            id: 4,
            value: "bsba",
            label: "Bachelor of Science in Business Administration",
            isDisabled: true,
        },
    ];

    const radioOptions = [
        {
            id: 1,
            value: 1,
            label: "1st",
        },
        {
            id: 2,
            value: 2,
            label: "2nd",
        },
        {
            id: 3,
            value: 3,
            label: "3rd",
        },
    ];

    return (
        <Form
        name="student-registration-form"
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
            label="Student number"
            name="student_number"
            {...studentNumberHelp && { help: studentNumberHelp }}
            rules={[{
                required: true,
                type: 'string',
                min: 2,
                max: 200,
            }]}>
                <Input allowClear />
            </Form.Item>

            {
                (selectOptions && (Object.keys(selectOptions).length > 0)) &&    
                <Form.Item
                    label="Course"
                    name="course"
                    {...courseHelp && { help: courseHelp }}
                    rules={[{
                        required: true,
                        message: "Course is required.",
                    }]}>
                    <Select>
                    {
                        Object.keys(selectOptions).map((i, val) => <Option 
                        key={Object.values(selectOptions)[val].id} 
                        value={Object.values(selectOptions)[val].value} 
                        disabled={Object.values(selectOptions)[val].isDisabled}>{Object.values(selectOptions)[val].label}</Option>)
                    }
                    </Select>
                </Form.Item>
            }

            <Form.Item
            label="Year"
            name="year"
                {...yearHelp && { help: yearHelp }}
            rules={[{
                required: true,
            }, {
                pattern: new RegExp(/^\d{4}$/),
                message: "Year must be 4-digit characters.",
            }]}>
                <Input allowClear />
            </Form.Item>

            {
                (radioOptions && (Object.keys(radioOptions).length > 0)) &&   
                <Form.Item
                    label="Term"
                    name="term"
                    {...termHelp && { help: termHelp }}
                    rules={[{
                        required: true,
                        message: "Term is required.",
                    }]}>
                    <Radio.Group>
                    {
                        Object.keys(radioOptions).map((i, val) => <Radio key={Object.values(radioOptions)[val].id} value={Object.values(radioOptions)[val].value}>{Object.values(radioOptions)[val].label}</Radio>)
                    }
                    </Radio.Group>
                </Form.Item>
            }

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

export default RegisterStudent;