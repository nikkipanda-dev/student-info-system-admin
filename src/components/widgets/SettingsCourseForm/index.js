import { useState, useEffect, } from "react";
import {
    Form,
    Select,
    Descriptions,
} from "antd";
import {
    getErrorMessage,
    getAlertComponent,
    courseOptions,
} from "../../../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faBan, } from "@fortawesome/free-solid-svg-icons";

import Button from "../../core/Button";
import Text from "../../core/Text";
import Heading from "../../core/Heading";
import Container from "../../core/Container";

const { Option } = Select;

const styling = {
    '@media screen and (max-width: 575px)': {
        'button': {
            marginTop: '$10',
        }
    },
}

const formItemLayout = {
    labelCol: {
        sm: { span: 4, },
        md: { span: 3, },
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

export const SettingsCourseForm = ({
    authUser,
    values,
    onFinish,
    emitMessage,
    slug,
    handleArrayObj,
}) => {
    const [form] = Form.useForm();

    const [isVisible, setIsVisible] = useState(false);
    const [course, setCourse] = useState('');
    const [courseHelp, setCourseHelp] = useState('');
    const [alert, setAlert] = useState('');

    const handleToggleForm = () => setIsVisible(!(isVisible));
    const handleCourse = payload => setCourse(payload);
    const handleCourseHelp = message => setCourseHelp(message);
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

    const resetForm = form => {
        form.resetFields();
        handleCourseHelp('');
        handleAlertComponent(getAlertComponent(null, null, null));
        handleToggleForm();
    }

    const onUpdateCourse = values => {
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

            resetForm(form);
            handleCourse(response.data.data.details);
            handleAlertComponent(getAlertComponent(null, null, null));
            setTimeout(() => {
                emitMessage("Course updated.", "success", 2.5);
            }, 2000);
        })

        .catch(err => {
            if (err.response && err.response.data.errors) {
                err.response.data.errors.course && handleCourseHelp(getErrorMessage(err.response.data.errors.course[0]));
            }
        });
    }

    useEffect(() => {
        let loading = true;

        if (loading && (values && (Object.keys(values).length > 0))) {
            if (!(courseOptions[values.course])) {
                console.error('Invalid course.');
                return;
            }

            handleCourse(values.course);
        }

        return () => {
            loading = false;
        }
    }, [values.slug]);

    useEffect(() => {
        let loading = true;

        if (loading && values && (Object.keys(values).length > 0) && course) {
            handleArrayObj({
                ...values,
                course: course,
            });
        }

        return () => {
            loading = false;
        }
    }, [course]);
    
    return (
        (values && (Object.keys(values).length > 0) && course) &&
        <Container css={styling}>
            <Container
                className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center"
                css={{ marginBottom: '$15', }}>
                <Heading type={4} text="Course" />
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
            <Container css={{ marginBottom: '$15', }}>
                <Descriptions bordered column={1}>
                    <Descriptions.Item
                    label={<Text type="span">Course</Text>}
                    labelStyle={{ width: '100px', }}>
                        <Text type="span">{`${courseOptions[course]}`}</Text>
                    </Descriptions.Item>
                </Descriptions>

            </Container>
        {
            isVisible &&
            <Container>
            {
                alert
            }
                <Form
                name="course-form"
                {...formItemLayout}
                form={form}
                onFinish={onUpdateCourse}
                validateMessages={validateMessages}>

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

export default SettingsCourseForm;