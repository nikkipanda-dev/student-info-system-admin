import { 
    useState, 
    useEffect,
    useRef,
} from "react";
import { 
    Form, 
    Input, 
    Select, 
    Radio,
    DatePicker,
    InputNumber,
} from "antd";
import { getAuthEmail, } from "../../../util/auth";
import { getErrorMessage, } from "../../../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faCircleXmark, } from "@fortawesome/free-solid-svg-icons";
import { styled, } from "../../../stitches.config";

import Button from "../../core/Button";
import Image from "../../core/Image";
import Text from "../../core/Text";
import Container from "../../core/Container";
import Label from "../../core/Label";
import NotFound from "../NotFound";

const { Option } = Select;

const NativeInput = styled('input', {});

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

export const StudentPaymentsForm = ({
    form,
    student,
    onFinish,
    emitMessage,
    isAuth,
    handleAlertComponent,
    payments,
    handlePayments,
    resetForm,
    handleHideModal,
    alert,
}) => {
    const ref = useRef('');

    const [helpers, setHelpers] = useState('');
    const [isInstallment, setIsInstallment] = useState('');
    const [files, setFiles] = useState('');
    const [imageUrls, setImageUrls] = useState('');

    const handleIsInstallment = isInstallment => setIsInstallment(isInstallment);
    const handleFiles = value => setFiles(value);
    const handleImageUrls = value => setImageUrls(value);
    let arr;

    const handleHelpers = payload => setHelpers(payload);

    const paymentModes = [
        {
            id: 1,
            value: "bank_transfer_bdo",
            label: "Bank Transfer (BDO)",
            isDisabled: false,
        },
        {
            id: 2,
            value: "bank_transfer_security_bank",
            label: "Bank Transfer (Security Bank)",
            isDisabled: false,
        },
        {
            id: 3,
            value: "cash",
            label: "Cash",
            isDisabled: false,
        },
        {
            id: 4,
            value: "gcash",
            label: "GCash",
            isDisabled: false,
        },
    ];

    const termOptions = [
        {
            id: 1,
            value: "full",
            label: "Full",
        },
        {
            id: 2,
            value: "installment",
            label: "Installment",
        },
    ];

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

    const handleRemoveImage = value => {
        let target = Object.values(imageUrls).find(el => el.id === value);
        target && URL.revokeObjectURL(target.src);

        handleFiles(Object.values(files).filter(el => el.id !== value));
        handleImageUrls(Object.values(imageUrls).filter(el => el.id !== value));
    }

    const onInputChange = () => {
        if (!(ref.current)) {
            <NotFound name="Input" />
            return;
        }

        if (!(ref.current.files)) {
            <NotFound name="Input" />
            return;
        }

        let arr = [];
        let ctr = 0;

        for (let i of ref.current.files) {
            ++ctr;
            arr.push({
                details: i,
                id: ctr,
            })
        }

        console.info('arr ', arr);

        handleFiles(arr);
    }

    const onPaymentTypeChange = evt => {
        (evt.target.value === "installment") ? handleIsInstallment(true) : handleIsInstallment(false);
    }

    const onStore = values => {
        if (!(isAuth)) {
            console.error('on store student: not auth');
            return;
        }

        const storeForm = new FormData();

        for (let i in values) {
            if (i === 'date_paid') {
                const date = new Date(values[i]);
                storeForm.append(i, date.getFullYear() + "-" + (date.getMonth() < 10 && "0") + date.getMonth() + "-" + (date.getDay() < 10 && "0") + (date.getDay()));
            } else {
                values[i] && storeForm.append(i, values[i]);
            }
        }

        storeForm.append("auth_email", getAuthEmail());
        storeForm.append("student_slug", student.slug);
        storeForm.append("course", student.course);
        storeForm.append("year", student.year);
        storeForm.append("term", student.term);

        let ctr = 0;
        for (let i of files) {
            ++ctr;

            storeForm.append(`payments[${ctr}]`, i.details);
            console.info('i ', i);
        }

        emitMessage("Loading", "loading", 2);

        onFinish(storeForm).then(response => {
            if (!(response.data.is_success)) {
                handleAlertComponent("Error", "danger", response.data.data);
                return;
            }

            arr = payments;
            (Object.values(arr).length > 0) && arr.push(response.data.data.details);
            if (Object.values(arr).length === 0) {
                arr = [response.data.data.details]
            }

            resetForm();
            handlePayments(arr);
            handleHideModal();
            setTimeout(() => {
                emitMessage("Payment added.", "success", 2.5);
            }, 2000);
        })

        .catch(err => {
            if (err.response && err.response.data.errors) {
                handleHelpers({
                    mode_of_payment: err.response.data.errors.mode_of_payment && getErrorMessage(err.response.data.errors.mode_of_payment[0]),
                    payment_type: err.response.data.errors.payment_type && getErrorMessage(err.response.data.errors.payment_type[0]),
                    date_paid: err.response.data.errors.date_paid && getErrorMessage(err.response.data.errors.date_paid[0]),
                    amount_paid: err.response.data.errors.amount_paid && getErrorMessage(err.response.data.errors.amount_paid[0]),
                    balance: err.response.data.errors.balance && getErrorMessage(err.response.data.errors.balance[0]),
                    course: err.response.data.errors.course && getErrorMessage(err.response.data.errors.course[0]),
                    year: err.response.data.errors.year && getErrorMessage(err.response.data.errors.year[0]),
                    term: err.response.data.errors.term && getErrorMessage(err.response.data.errors.term[0]),
                    payments: err.response.data.errors.payments && getErrorMessage(err.response.data.errors.payments[0]),
                    status: err.response.data.errors.status && getErrorMessage(err.response.data.errors.status[0]),
                });
            }
        });
    }

    useEffect(() => {
        let loading = true;
        let arr = [];

        if (loading && (files && (Object.keys(files).length > 0))) {
            for (let i of files) {
                arr.push({
                    src: URL.createObjectURL(i.details),
                    id: i.id,
                })
            }

            handleImageUrls(arr);
        }

        return () => {
            loading = false;
        }
    }, [files]);

    useEffect(() => {
        return () => {
            if (imageUrls && (Object.keys(imageUrls).length > 0)) {
                for (let i of imageUrls) {
                    URL.revokeObjectURL(i.src);
                }
            }
        }
    }, [imageUrls]);

    return (
        <Container css={styling}>
            <Container>
            {
                alert
            }
            </Container>
        {
            (!(files) || (Object.keys(files).length === 0)) && 
                <Container>
                    <NativeInput
                    type="file"
                    ref={ref}
                    id="payment-images"
                    hidden
                    accept=".jpg,.jpeg,.png"
                    multiple
                    onChange={() => onInputChange()} />

                    <Label
                    htmlFor="payment-images"
                    uploadSize="medium"
                    className="d-flex flex-column justify-content-center align-items-center upload">
                        <FontAwesomeIcon icon={faCloudArrowUp} className="fa-fw" />
                        <Text
                        type="span"
                        color="blue2"
                        css={{ fontSize: '$heading3' }}>
                            Upload
                        </Text>
                        <Text
                        type="span"
                        color="info"
                        css={{ marginTop: '$10', }}>
                            Supported formats: .jpg, .jpeg, .png
                        </Text>
                    </Label>
                </Container>
        }

            {/* Display preview */}
            <Container className="d-flex flex-column align-items-center">
            {
                (imageUrls && (Object.keys(imageUrls))) && 
                Object.keys(imageUrls).map((i, val) => <Container key={Object.values(imageUrls)[val].id}>
                    <Image src={Object.values(imageUrls)[val].src} />
                    <Button
                    text={
                        <Container className="d-flex align-items-center">
                            <FontAwesomeIcon icon={faCircleXmark} className="fa-fw fa-2x" /><Text type="span" color="danger" css={{ display: 'inline-block', marginTop: '$5 ', }}>Remove</Text>
                        </Container>
                    }
                    color="transparent"
                    css={{ color: '$red2', }}
                    onClick={() => handleRemoveImage(Object.values(imageUrls)[val].id)} />
                </Container>)
            }
            </Container>

            {
                (files && (Object.keys(files).length > 0)) && 
                <Form
                name="student-payments-form"
                {...formItemLayout}
                form={form}
                onFinish={onStore}
                validateMessages={validateMessages}
                initialValues={{
                    amount: 0,
                }}
                autoComplete="off">

                {
                    (paymentModes && (Object.keys(paymentModes).length > 0)) &&
                    <Form.Item
                    label="Mode of payment"
                    name="mode_of_payment"
                    {...helpers && helpers.mode_of_payment && { help: helpers.mode_of_payment }}
                    rules={[{
                        required: true,
                        message: "Mode of payment is required.",
                    }]}>
                        <Select>
                        {
                            Object.keys(paymentModes).map((_, val) => <Option
                            key={Object.values(paymentModes)[val].id}
                            value={Object.values(paymentModes)[val].value}
                            disabled={Object.values(paymentModes)[val].isDisabled}>{Object.values(paymentModes)[val].label}</Option>)
                        }
                        </Select>
                    </Form.Item>
                }

                <Form.Item
                label="Date paid"
                name="date_paid"
                {...helpers && helpers.date_paid && { help: helpers.date_paid }}
                rules={[{
                    required: true,
                    message: 'Date paid is required.',
                }]}>
                    <DatePicker style={{
                        width: '100%',
                    }} />
                </Form.Item>

                <Form.Item
                label="Amount"
                name="amount_paid"
                {...helpers && helpers.amount_paid && { help: helpers.amount_paid }}
                rules={[{
                    required: true,
                }]}>
                    <InputNumber
                    style={{
                        width: '100%',
                    }}
                    min="1"
                    max="100000"
                    step=".01"
                    addonBefore={<Text type="span">&#x20B1;</Text>} />
                </Form.Item>

                {
                    (termOptions && (Object.keys(termOptions).length > 0)) &&
                    <Form.Item
                    label="Payment type"
                    name="payment_type"
                    {...helpers && helpers.payment_type && { help: helpers.payment_type }}
                    rules={[{
                        required: true,
                        message: "Term is required.",
                    }]}>
                        <Radio.Group onChange={evt => onPaymentTypeChange(evt)}>
                        {
                            Object.keys(termOptions).map((i, val) => <Radio key={Object.values(termOptions)[val].id} value={Object.values(termOptions)[val].value}>{Object.values(termOptions)[val].label}</Radio>)
                        }
                        </Radio.Group>
                    </Form.Item>
                }

                {
                    ((isInstallment !== '') && (isInstallment !== null)) && (isInstallment) &&
                    <Form.Item
                    label="Balance"
                    name="balance"
                    {...helpers && helpers.balance && { help: helpers.balance }}
                    rules={[{
                        required: true,
                    }]}>
                        <InputNumber
                        style={{
                            width: '100%',
                        }}
                        min="1"
                        max="100000"
                        step="0.01"
                        addonBefore={<Text type="span">&#x20B1;</Text>} />
                    </Form.Item>
                }

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
            }
        </Container>
    )
}

export default StudentPaymentsForm;