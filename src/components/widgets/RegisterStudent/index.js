import { useState, } from 'react';
import { 
    Form, 
    Input,
    Radio,
    Select,
} from 'antd';
import { getErrorMessage, getAlertComponent, } from '../../../util';

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
        range: "${label} must be between ${min} and ${max} characters.",
    },
};

export const RegisterStudent = ({
    form,
    onFinish,
    authUser,
    emitMessage,
    isAuth,
    students,
    handleStudents,
    resetForm,
    handleHideModal,
}) => {
    const [alert, setAlert] = useState('');
    const [helpers, setHelpers] = useState('');
    let arr;

    const handleHelpers = payload => setHelpers(payload);
    const handleAlertComponent = payload => setAlert(payload);

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

    const yearOptions = [
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
        {
            id: 4,
            value: 4,
            label: "4th",
        },
    ];

    const termOptions = [
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

    const onStore = values => {
        if (!(isAuth)) {
            console.error('on store student: not auth');
            return;
        }

        const storeForm = new FormData();

        for (let i in values) {
            values[i] && storeForm.append(i, values[i]);
        }

        storeForm.append("auth_email", authUser.email);

        emitMessage("Loading", "loading", 2);

        onFinish(storeForm).then(response => {
            if (!(response.data.is_success)) {
                handleAlertComponent(getAlertComponent("Error", "danger", response.data.data, {
                    marginTop: '0',
                }));
                return;
            }

            arr = students;
            (Object.values(arr).length > 0) && arr.push(response.data.data.details);
            if (Object.values(arr).length === 0) {
                arr = [response.data.data.details]
            }

            resetForm(form);
            handleStudents(arr);
            handleAlertComponent(getAlertComponent(null, null, null));
            handleHideModal();
            setTimeout(() => {
                emitMessage("Student added.", "success", 2.5);
            }, 2000);
        })

        .catch(err => {
            if (err.response && err.response.data.errors) {
                handleHelpers({
                    first_name: err.response.data.errors.first_name && getErrorMessage(err.response.data.errors.first_name[0]),
                    middle_name: err.response.data.errors.middle_name && getErrorMessage(err.response.data.errors.middle_name[0]),
                    last_name: err.response.data.errors.last_name && getErrorMessage(err.response.data.errors.last_name[0]),
                    student_number: err.response.data.errors.student_number && getErrorMessage(err.response.data.errors.student_number[0]),
                    course: err.response.data.errors.course && getErrorMessage(err.response.data.errors.course[0]),
                    year: err.response.data.errors.year && getErrorMessage(err.response.data.errors.year[0]),
                    term: err.response.data.errors.term && getErrorMessage(err.response.data.errors.year[0]),
                    email: err.response.data.errors.email && getErrorMessage(err.response.data.errors.email[0]),
                    password: err.response.data.errors.password && getErrorMessage(err.response.data.errors.password[0]),
                    password_confirmation: err.response.data.errors.password_confirmation && getErrorMessage(err.response.data.errors.password_confirmation[0]),
                });
            }
        });
    }

    return (
        <Container>
            {
                alert
            }
            <Form
            name="student-registration-form"
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
                label="Student number"
                name="student_number"
                {...helpers && helpers.student_number && { help: helpers.student_number }}
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
                {...helpers && helpers.course && { help: helpers.course }}
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

                {/* <Form.Item
            label="Year"
            name="year"
            {...helpers && helpers.year && { help: helpers.year }}
            rules={[{
                required: true,
            }, {
                pattern: new RegExp(/^\d{4}$/),
                message: "Year must be 4-digit characters.",
            }]}>
                <Input allowClear />
            </Form.Item> */}

            {
                (yearOptions && (Object.keys(yearOptions).length > 0)) &&
                <Form.Item
                label="Year"
                name="year"
                {...helpers && helpers.year && { help: helpers.year }}
                rules={[{
                    required: true,
                    message: "Year is required.",
                }]}>
                    <Radio.Group>
                    {
                        Object.keys(yearOptions).map((_, val) => <Radio key={`year-${Object.values(yearOptions)[val].id}`} value={Object.values(yearOptions)[val].value}>{Object.values(yearOptions)[val].label}</Radio>)
                    }
                    </Radio.Group>
                </Form.Item>
            }

            {
                (termOptions && (Object.keys(termOptions).length > 0)) &&
                <Form.Item
                label="Term"
                name="term"
                {...helpers && helpers.term && { help: helpers.term }}
                rules={[{
                    required: true,
                    message: "Term is required.",
                }]}>
                    <Radio.Group>
                        {
                            Object.keys(termOptions).map((_, val) => <Radio key={`term-${Object.values(termOptions)[val].id}`} value={Object.values(termOptions)[val].value}>{Object.values(termOptions)[val].label}</Radio>)
                        }
                    </Radio.Group>
                </Form.Item>
            }

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
        </Container>
    )
}

export default RegisterStudent;