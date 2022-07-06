import { useState, useEffect, } from "react";
import {
    Form,
    Radio,
    Descriptions,
} from "antd";
import {
    getErrorMessage,
    getAlertComponent,
    enrollmentCategories,
} from "../../../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPen,
    faBan,
    faGraduationCap,
    faSchoolCircleCheck,
    faSchoolCircleExclamation,
    faSchoolCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

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

const formItemLayout = {
    labelCol: {
        sm: { span: 8, },
        md: { span: 7, },
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

export const SettingsEnrollmentStatusForm = ({
    authUser,
    values,
    onFinish,
    emitMessage,
    slug,
    handleArrayObj,
}) => {
    const [form] = Form.useForm();

    const [isVisible, setIsVisible] = useState(false);
    const [enrollmentStatus, setEnrollmentStatus] = useState('');
    const [enrollmentStatusHelp, setEnrollmentStatusHelp] = useState('');
    const [alert, setAlert] = useState('');

    const handleToggleForm = () => setIsVisible(!(isVisible));
    const handleEnrollmentStatus = payload => setEnrollmentStatus(payload);
    const handleEnrollmentStatusHelp = message => setEnrollmentStatusHelp(message);
    const handleAlertComponent = payload => setAlert(payload);

    const enrollmentStatusOptions = [
        {
            id: 1,
            value: "enrolled",
            label: "Enrolled",
        },
        {
            id: 2,
            value: "dropped",
            label: "Dropped",
        },
        {
            id: 3,
            value: "expelled",
            label: "Expelled",
        },
        {
            id: 4,
            value: "graduate",
            label: "Graduated",
        },
    ];

    const resetForm = form => {
        form.resetFields();
        handleEnrollmentStatusHelp('');
        handleAlertComponent(getAlertComponent(null, null, null));
        handleToggleForm();
    }

    const onUpdateEnrollmentStatus = values => {
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
            handleEnrollmentStatus(response.data.data.details);
            handleAlertComponent(getAlertComponent(null, null, null));
            setTimeout(() => {
                emitMessage("Enrollment status updated.", "success", 2.5);
            }, 2000);
        })

        .catch(err => {
            if (err.response && err.response.data.errors) {
                err.response.data.errors.enrollment_status && handleEnrollmentStatusHelp(getErrorMessage(err.response.data.errors.enrollment_status[0]));
            }
        });
    }

    useEffect(() => {
        let loading = true;

        if (loading && (values && (Object.keys(values).length > 0))) {
            const status = values.is_enrolled ? "enrolled" : values.is_dropped ? "dropped" : values.is_expelled ? "expelled" : values.is_graduate ? "graduate" : '';
            if (!(enrollmentCategories[status])) {
                console.error('Invalid enrollment status.');
                return;
            }

            handleEnrollmentStatus({
                is_enrolled: values.is_enrolled,
                is_dropped: values.is_dropped,
                is_expelled: values.is_expelled,
                is_graduate: values.is_graduate,
            });
        }

        return () => {
            loading = false;
        }
    }, [values.slug]);

    useEffect(() => {
        let loading = true;

        if (loading && values && (Object.keys(values).length > 0) && enrollmentStatus && (Object.keys(enrollmentStatus).length > 0)) {
            handleArrayObj({
                ...values,
                is_enrolled: enrollmentStatus.is_enrolled,
                is_dropped: enrollmentStatus.is_dropped,
                is_expelled: enrollmentStatus.is_expelled,
                is_graduate: enrollmentStatus.is_graduate,
            });
        }

        return () => {
            loading = false;
        }
    }, [enrollmentStatus]);

    return (
        (values && (Object.keys(values).length > 0) && enrollmentStatus && (Object.keys(enrollmentStatus).length > 0)) &&
        <Container css={styling}>
            <Container
            className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center"
            css={{ marginBottom: '$15', }}>
            <Heading type={4} text="Enrollment Status" />
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
                    label={<Text type="span">Enrollment Status</Text>}
                    labelStyle={{ width: '180px', }}>
                        <FontAwesomeIcon
                        icon={
                            enrollmentStatus.is_enrolled ? faSchoolCircleCheck :
                            enrollmentStatus.is_dropped ? faSchoolCircleExclamation :
                            enrollmentStatus.is_expelled ? faSchoolCircleXmark : faGraduationCap
                        }
                        className="fa-fw fa-lg"
                        style={{
                            color: enrollmentStatus.is_enrolled ? "#00B4D8 " :
                                   enrollmentStatus.is_dropped ? "#f0ca57" :
                                   enrollmentStatus.is_expelled ? "#DC3545" : "#28A745",
                        }} />
                        <Text type="span" css={{ marginLeft: '$5', }}>
                        {
                            `${enrollmentStatus.is_enrolled ? enrollmentCategories['enrolled'] : 
                            enrollmentStatus.is_dropped ? enrollmentCategories['dropped'] : 
                            enrollmentStatus.is_expelled ? enrollmentCategories['expelled'] :
                            enrollmentStatus.is_graduate ? enrollmentCategories['graduate'] : ''}`
                        }
                        </Text>
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
                name="enrollment-status-form"
                {...formItemLayout}
                form={form}
                onFinish={onUpdateEnrollmentStatus}
                validateMessages={validateMessages}>

                {
                    (enrollmentStatusOptions && (Object.keys(enrollmentStatusOptions).length > 0)) &&
                    <Form.Item
                    label="Status"
                    name="enrollment_status"
                    {...enrollmentStatusHelp && { help: enrollmentStatusHelp }}>
                        <Radio.Group>
                        {
                            Object.keys(enrollmentStatusOptions).map((_, val) => <Radio key={`year-${Object.values(enrollmentStatusOptions)[val].id}`} value={Object.values(enrollmentStatusOptions)[val].value}>{Object.values(enrollmentStatusOptions)[val].label}</Radio>)
                        }
                        </Radio.Group>
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

export default SettingsEnrollmentStatusForm;