import { useState, useEffect, } from "react";
import { Form, Input, Radio, } from "antd";
import Button from "../../core/Button";
import Container from "../../core/Container";
import { getAuthEmail, } from "../../../util/auth";
import { getErrorMessage, } from "../../../util";

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
    emitMessage,
    isAuth,
    student,
    values,
    slug,
    handleAlertComponent,
    handleHideModal,
}) => {
    const [helpers, setHelpers] = useState('');
    const handleHelpers = payload => setHelpers(payload);

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

        updateForm.append("auth_email", getAuthEmail());
        updateForm.append("student_slug", student.slug);
        updateForm.append("slug", slug);

        emitMessage("Loading", "loading", 2);

        onFinish(updateForm).then(response => {
            console.info('res ', response.data);
            if (!(response.data.is_success)) {
                handleAlertComponent("Error", "danger", response.data.data);
                return;
            }

            handlePayments(Object.keys(payments).map((i, val) => {
                if (Object.values(payments)[val].slug === slug) {
                    console.info("Target ", Object.values(payments)[val].id);
                    return {...Object.values(payments)[val], status: response.data.data.details.status}
                }

                return Object.values(payments)[val]
            }));

            handleHideModal();
            setTimeout(() => {
                emitMessage("Payment updated.", "success", 2.5);
            }, 2000);
        })

        .catch(err => {
            console.info('err ', err.response.data.errors);
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

    return (
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
                        Object.keys(statusOptions).map((i, val) => <Radio key={Object.values(statusOptions)[val].id} value={Object.values(statusOptions)[val].value}>{Object.values(statusOptions)[val].label}</Radio>)
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
    )
}

export default StudentPaymentUpdate;