import { useState, useEffect, } from "react";
import { 
    Form,  
    Radio,
    Divider,
    Descriptions,
} from "antd";
import { 
    getErrorMessage, 
    getAlertComponent, 
    ordinalNumbers,
} from "../../../util";

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

export const SettingsYearTermForm = ({
    authUser,
    values,
    onFinish,
    emitMessage,
    slug,
    handleArrayObj,
}) => {
    const [form] = Form.useForm();

    const [isVisible, setIsVisible] = useState(false);
    const [yearTerm, setYearTerm] = useState('');
    const [yearHelp, setYearHelp] = useState('');
    const [termHelp, setTermHelp] = useState('');
    const [alert, setAlert] = useState('');

    const handleToggleForm = () => setIsVisible(!(isVisible));
    const handleYearTerm = payload => setYearTerm(payload);
    const handleYearHelp = message => setYearHelp(message);
    const handleTermHelp = message => setTermHelp(message);
    const handleAlertComponent = payload => setAlert(payload);

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

    const resetForm = form => {
        form.resetFields();
        handleYearHelp('');
        handleTermHelp('');
        handleAlertComponent(getAlertComponent(null, null, null));
        handleToggleForm();
    }

    const onUpdateYearTerm = values => {
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
            handleYearTerm(response.data.data.details);
            handleAlertComponent(getAlertComponent(null, null, null));
            setTimeout(() => {
                emitMessage("Year and/or term updated.", "success", 2.5);
            }, 2000);
        })

        .catch(err => {
            if (err.response && err.response.data.errors) {
                err.response.data.errors.year && handleYearHelp(getErrorMessage(err.response.data.errors.year[0]));
                err.response.data.errors.term && handleTermHelp(getErrorMessage(err.response.data.errors.term[0]));
            }
        });
    }

    useEffect(() => {
        let loading = true;

        if (loading && (values && (Object.keys(values).length > 0))) {
            if (!(ordinalNumbers[values.term]) || !(ordinalNumbers[values.year])) {
                console.error('Invalid term and/or year.');
                return;
            }

            handleYearTerm({
                year: values.year,
                term: values.term,
            });
        }

        return () => {
            loading = false;
        }
    }, [values.slug]);

    useEffect(() => {
        let loading = true;

        if (loading && values && (Object.keys(values).length > 0) && yearTerm && (Object.keys(yearTerm).length > 0)) {
            handleArrayObj({
                ...values,
                year: yearTerm.year,
                term: yearTerm.term,
            });
        }

        return () => {
            loading = false;
        }
    }, [yearTerm]);

    return (
        (values && (Object.keys(values).length > 0) && yearTerm && (Object.keys(yearTerm).length > 0)) &&
        <Container css={styling}>
            <Container
            className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center"
            css={{ marginBottom: '$15', }}>
                <Heading type={4} text="Year &#x26; Term" />
                <Button
                text={isVisible ? "Cancel" : "Update"}
                color={isVisible ? "" : "yellow"}
                className="flex-grow-1 flex-sm-grow-0"
                onClick={() => handleToggleForm()} />
            </Container>
            <Container css={{ marginBottom: '$15', }}>
                <Descriptions bordered column={1}>
                    <Descriptions.Item 
                    label={<Text type="span">Year</Text>} 
                    labelStyle={{ width: '100px', }}>
                        <Text type="span">{`${ordinalNumbers[yearTerm.year]}`}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={<Text type="span">Term</Text>}>
                        <Text type="span">{`${ordinalNumbers[yearTerm.term]}`}</Text>
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
                name="year-term-form"
                {...formItemLayout}
                form={form}
                onFinish={onUpdateYearTerm}
                validateMessages={validateMessages}>

                {
                    (yearOptions && (Object.keys(yearOptions).length > 0)) &&
                    <Form.Item
                    label="Year"
                    name="year"
                    {...yearHelp && { help: yearHelp }}>
                        <Radio.Group>
                        {
                            Object.keys(yearOptions).map((_, val) => <Radio key={`year-${Object.values(yearOptions)[val].id}`} value={Object.values(yearOptions)[val].value}>{Object.values(yearOptions)[val].label}</Radio>)
                        }
                        </Radio.Group>
                    </Form.Item>
                }

                    <Divider plain><Text type="span">or</Text></Divider>

                {
                    (termOptions && (Object.keys(termOptions).length > 0)) &&
                    <Form.Item
                    label="Term"
                    name="term"
                    {...termHelp && { help: termHelp }}>
                        <Radio.Group>
                        {
                            Object.keys(termOptions).map((_, val) => <Radio key={`year-${Object.values(termOptions)[val].id}`} value={Object.values(termOptions)[val].value}>{Object.values(termOptions)[val].label}</Radio>)
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

export default SettingsYearTermForm;