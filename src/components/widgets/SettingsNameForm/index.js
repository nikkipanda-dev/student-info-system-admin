import { useState, useEffect, } from "react";
import { Form, Input, }  from "antd";
import { getErrorMessage, getAlertComponent, } from "../../../util";
import { setCookieName, } from "../../../util/auth";

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

export const SettingsNameForm = ({
    authUser,
    onFinish,
    values,
    slug,
    emitMessage,
    handleArrayObj,
    users,
    handleUsers,
    handleUser,
}) => {
    const [form] = Form.useForm();

    const [isVisible, setIsVisible] = useState(false);
    const [name, setName] = useState('');
    const [firstNameHelp, setFirstNameHelp] = useState('');
    const [middleNameHelp, setMiddleNameHelp] = useState('');
    const [lastNameHelp, setLastNameHelp] = useState('');
    const [alert, setAlert] = useState('');

    const handleToggleForm = () => setIsVisible(!(isVisible));
    const handleName = payload => setName(payload);
    const handleFirstNameHelp = message => setFirstNameHelp(message);
    const handleMiddleNameHelp = message => setMiddleNameHelp(message);
    const handleLastNameHelp = message => setLastNameHelp(message);
    const handleAlertComponent = payload => setAlert(payload);

    const resetForm = () => {
        form.resetFields();
        handleFirstNameHelp('');
        handleMiddleNameHelp('');
        handleLastNameHelp('');
        handleAlertComponent(getAlertComponent(null, null, null));
        handleToggleForm();
    }

    const onUpdateName = values => {        
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

            resetForm();
            handleName(response.data.data.details);
            handleAlertComponent(getAlertComponent(null, null, null));
            setTimeout(() => {
                emitMessage("Name updated.", "success", 2.5);
            }, 2000);
        })

        .catch(err => {
            if (err.response && err.response.data.errors) {
                err.response.data.errors.first_name && handleFirstNameHelp(getErrorMessage(err.response.data.errors.first_name[0]));
                err.response.data.errors.middle_name && handleMiddleNameHelp(getErrorMessage(err.response.data.errors.middle_name[0]));
                err.response.data.errors.last_name && handleLastNameHelp(getErrorMessage(err.response.data.errors.last_name[0]));
            }
        });
    }

    useEffect(() => {
        let loading = true;

        if (loading && (values && (Object.keys(values).length > 0))) {
            handleName({
                first_name: values.first_name,
                middle_name: values.middle_name,
                last_name: values.last_name,
            });
        }

        return () => {
            loading = false;
        }
    }, [values.slug]);

    useEffect(() => {
        let loading = true;

        if (loading && values && (Object.keys(values).length > 0) && name && (Object.keys(name).length > 0)) {
            if (handleArrayObj) {
                handleArrayObj({
                    ...values,
                    first_name: name.first_name,
                    middle_name: name.middle_name,
                    last_name: name.last_name,
                });
            }
            
            if (handleUsers) {
                handleUsers(Object.keys(users).map((_, val) => {
                    if (Object.values(users)[val].slug === slug) {
                        return { 
                            ...Object.values(users)[val], 
                            first_name: name.first_name,
                            middle_name: name.middle_name,
                            last_name: name.last_name,
                        }
                    }

                    return Object.values(users)[val];
                }));
            }

            let arr = {
                ...authUser,
                first_name: name.first_name,
                middle_name: name.middle_name,
                last_name: name.last_name,
            }

            if (handleUser) {
                handleUser(arr);
                setCookieName(arr);
            }
        }

        return () => {
            loading = false;
        }
    }, [name]);

    return (
        (values && (Object.keys(values).length > 0) && name && (Object.keys(name).length > 0)) && 
        <Container css={styling}>
            <Container 
            className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center" 
            css={{ marginBottom: '$15', }}>
                <Heading type={4} text="Name" />
                <Button 
                text={isVisible ? "Cancel" : "Update"} 
                color={isVisible ? "" : "yellow"}
                className="flex-grow-1 flex-sm-grow-0" 
                onClick={() => handleToggleForm()} />
            </Container>
            <Container css={{ marginBottom: '$15', }}>
                <Text type="span">{`${name.first_name} ${name.middle_name ?? ''} ${name.last_name}`}</Text>
            </Container>
        {
            isVisible && 
            <Container>
            {
                alert
            }
                <Form
                name="name-form"
                {...formItemLayout}
                form={form}
                onFinish={onUpdateName}
                validateMessages={validateMessages}
                autoComplete="off">
                    <Form.Item
                    label="First name"
                    name="first_name"
                    {...firstNameHelp && { help: firstNameHelp }}
                    rules={[{
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
                        type: 'string',
                        min: 2,
                        max: 200,
                    }]}>
                        <Input allowClear />
                    </Form.Item>

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

export default SettingsNameForm;