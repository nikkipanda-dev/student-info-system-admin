import { useState, useEffect, } from "react";
import { Form, Radio, } from "antd";
import Button from "../../core/Button";
import Container from "../../core/Container";
import { getErrorMessage, getAlertComponent, } from "../../../util";
import StudentPayment from "../StudentPayment";

const styling = {
    'img': {
        width: '100%',
        height: 'auto',
        maxWidth: '400px',
        maxHeight: '400px',
        objectFit: 'cover',
    },
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
    types: {
        email: '${label} is not a valid email.',
    },
    string: {
        range: "${label} must be must be between ${min} and ${max} characters.",
    },
};

export const StudentPaymentUpdate = ({
    form,
    payments,
    handlePayments,
    onFinish,
    onDownload,
    emitMessage,
    isAuth,
    student,
    values,
    slug,
    handleHideModal,
    authUser,
}) => {
    const [payment, setPayment] = useState('');
    const [isFormShown, setIsFormShown] = useState(false);
    const [helpers, setHelpers] = useState('');
    const [alert, setAlert] = useState('');

    const handlePayment = payload => setPayment(payload);
    const handleToggleForm = () => setIsFormShown(!(isFormShown));
    const handleHelpers = payload => setHelpers(payload);
    const handleAlertComponent = payload => setAlert(payload);

    const onResetForm = () => {
        handleAlertComponent(getAlertComponent(null, null, null));
        handleHideModal();
        handleToggleForm();
    }

    const statusOptions = [
        {
            id: 1,
            value: "pending",
            label: "Pending",
        },
        {
            id: 2,
            value: "verified",
            label: "Verified",
        },
    ];

    const onUpdate = value => {
        if (!(isAuth)) {
            console.error('on update student payment: not auth');
            return;
        }

        const updateForm = new FormData();

        for (let i in value) {
            value[i] && updateForm.append(i, value[i]);
        }

        updateForm.append("auth_email", authUser.email);
        updateForm.append("student_slug", student.slug);
        updateForm.append("slug", slug);

        emitMessage("Loading", "loading", 2);

        onFinish(updateForm).then(response => {
            if (!(response.data.is_success)) {
                handleAlertComponent(getAlertComponent("Error", "danger", response.data.data, { marginTop: '0', }));
                return;
            }

            handlePayments(Object.keys(payments).map((_, val) => {
                if (Object.values(payments)[val].slug === slug) {
                    return {...Object.values(payments)[val], status: response.data.data.details.status}
                }

                return Object.values(payments)[val]
            }));
            
            onResetForm();
            setTimeout(() => {
                emitMessage("Payment updated.", "success", 2.5);
            }, 2000);
        })

        .catch(err => {
            if (err.response && err.response.data.errors) {
                handleHelpers({
                    status: err.response.data.errors.status && getErrorMessage(err.response.data.errors.status[0]),
                });
            }
        });
    }

    useEffect(() => {
        let loading = true;

        if (loading && (values && (Object.keys(values).length > 0))) {
            form.setFieldsValue({
                status: values.status,
            });
        }

        return () => {
            loading = false;
        }
    }, [values]);

    useEffect(() => {
        let loading = true;

        if (loading && (values && (Object.keys(values).length > 0))) {
            handlePayment(values);
        }

        return () => {
            loading = false;
        }
    }, []);

    return (
        <Container>
            <Container className="d-flex justify-content-sm-end align-items-sm-center">
                <Button
                text={isFormShown ? "Cancel" : "Update"}
                color={isFormShown ? '' : "yellow"}
                className="flex-grow-1 flex-sm-grow-0"
                onClick={() => handleToggleForm()} />
            </Container>
        {
            !(isFormShown) ? 
            <Container css={styling}>
                <StudentPayment 
                values={payment} 
                onDownload={onDownload}
                authUser={authUser}
                student={student} />
            </Container> : 
            <Container css={styling}>
            {
                alert
            }
                <Form
                name="student-update-payment-form"
                {...formItemLayout}
                form={form}
                onFinish={onUpdate}
                validateMessages={validateMessages}
                autoComplete="off">

                {
                    (statusOptions && (Object.keys(statusOptions).length > 0)) &&
                    <Form.Item
                    label="Status"
                    name="status"
                    {...helpers && helpers.status && { help: helpers.status }}
                    rules={[{
                        required: true,
                        message: "Status is required.",
                    }]}>
                        <Radio.Group>
                        {
                            Object.keys(statusOptions).map((_, val) => <Radio key={Object.values(statusOptions)[val].id} value={Object.values(statusOptions)[val].value}>{Object.values(statusOptions)[val].label}</Radio>)
                        }
                        </Radio.Group>
                    </Form.Item>
                }

                    <Container className="d-flex">
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

export default StudentPaymentUpdate;