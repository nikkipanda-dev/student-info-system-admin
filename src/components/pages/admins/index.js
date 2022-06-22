import { useState, useEffect, } from "react";
import { Form, message, } from "antd";
import { getToken, getAuthEmail, } from "../../../util/auth";
import { request, } from "../../../util/request";
import { getErrorMessage, getMessage, } from "../../../util";
import { sectionStyle, } from "../../../stitches.config";

import Section from "../../core/Section";
import Container from "../../core/Container";
import Alert from "../../widgets/Alert";
import Text from "../../core/Text";
import RegisterUser from "../../widgets/RegisterUser";
import UserCards from "../../widgets/UserCards";
import Modal from "../../widgets/Modal";
import Button from "../../core/Button";

const cardGroupStyling = {
    '> div': {
        padding: '$5 $10',
        margin: '$10 $5',
        flex: '1 300px',
    },
}

export const Admins = ({ isAuth, }) => {
    const [form] = Form.useForm();

    const [administrators, setAdministrators] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [title, setTitle] = useState('');
    const [alert, setAlert] = useState('');
    const [status, setStatus] = useState('');
    const [header, setHeader] = useState('');
    const [firstNameHelp, setFirstNameHelp] = useState('');
    const [middleNameHelp, setMiddleNameHelp] = useState('');
    const [lastNameHelp, setLastNameHelp] = useState('');
    const [emailHelp, setEmailHelp] = useState('');
    const [passwordHelp, setPasswordHelp] = useState('');

    const handleAdministrators = payload => setAdministrators(payload);
    const handleShowModal = () => setIsModalVisible(true);
    const handleHideModal = () => setIsModalVisible(false);
    const handleTitle = title => setTitle(title);
    const handleAlert = message => setAlert(message);
    const handleStatus = status => setStatus(status);
    const handleHeader = header => setHeader(header);
    const handleFirstNameHelp = message => setFirstNameHelp(message);
    const handleMiddleNameHelp = message => setMiddleNameHelp(message);
    const handleLastNameHelp = message => setLastNameHelp(message);
    const handleEmailHelp = message => setEmailHelp(message);
    const handlePasswordHelp = message => setPasswordHelp(message);
    let arr;

    const handleModalContent = (payload, title) => {
        setModalContent(payload);
        handleTitle(title);
        handleShowModal();
    };

    const resetForm = () => {
        form.resetFields();
        handleHeader('');
        handleStatus('');
        handleAlert('');
    }

    const emitMessage = (content, status, duration) => {
        return getMessage({
            content: content,
            status: status,
            duration: duration,
        });
    }

    const onStore = values => {
        if (!(isAuth)) {
            console.info('on store admin: not auth');
            return;
        }

        arr = administrators;
        const form = new FormData();

        for (let i in values) {
            console.info('val ', values[i]);
            values[i] && form.append(i, values[i]);
        }

        form.append("auth_email", getAuthEmail());

        emitMessage("Loading", "loading", 2);

        storeUser(form).then(response => {
            if (!(response.data.is_success)) {
                handleHeader("Login failed");
                handleStatus("danger");
                handleAlert(<Text type="span">{response.data.data}</Text>);
                return;
            }

            resetForm();
            handleHideModal();
            arr.push(response.data.data.details);
            handleAdministrators(arr);
            setTimeout(() => {
                emitMessage("Administrator added.", "success", 2.5);
            }, 2000);
        })

        .catch(err => {
            if (err.response && err.response.data.errors) {
                err.response.data.errors.first_name && handleFirstNameHelp(getErrorMessage(err.response.data.errors.first_name[0]));
                err.response.data.errors.middle_name && handleMiddleNameHelp(getErrorMessage(err.response.data.errors.middle_name[0]));
                err.response.data.errors.last_name && handleLastNameHelp(getErrorMessage(err.response.data.errors.last_name[0]));
                err.response.data.errors.email && handleEmailHelp(getErrorMessage(err.response.data.errors.email[0]));
                err.response.data.errors.password && handlePasswordHelp(getErrorMessage(err.response.data.errors.password[0]));
            }
        });
    }

    useEffect(() => {
        let loading = true;

        if (loading && (!(administrators) || (Object.keys(administrators).length === 0))) {
            getUsers().then(response => {
                !(response.data.is_success) && handleAdministrators('');
                response.data.data.details && handleAdministrators(response.data.data.details);
            });
        }

        return () => {
            loading = false;
        }
    }, []);

    return (
        <Section css={sectionStyle}>
            <Container>
            {
                alert &&
                <Alert status={status} header={header}>
                    {alert}
                </Alert>
            }
                <Button 
                onClick={() => handleModalContent(
                    <RegisterUser
                    form={form}
                    onFinish={onStore}
                    firstNameHelp={firstNameHelp}
                    middleNameHelp={middleNameHelp}
                    lastNameHelp={lastNameHelp}
                    emailHelp={emailHelp}
                    passwordHelp={passwordHelp} />, "Add Administrator"
                )}
                text="Add" />
            </Container>
            <Container>
            {
                (administrators && (Object.keys(administrators).length > 0)) ? 
                <UserCards 
                values={administrators} 
                className="d-flex flex-sm-wrap flex-column flex-sm-row" 
                css={{ ...cardGroupStyling }}
                onUpdate={toggleAdminStatus}
                emitMessage={emitMessage} /> :
                <Text type="span">No data</Text>
            }
            </Container>
            {
                modalContent && 
                <Modal
                isVisible={isModalVisible}
                maskClosable={false}
                title={title}
                onCancel={handleHideModal}>
                    {modalContent}
                </Modal>
            }
        </Section>
    )
}

async function getUsers() {
    return request.get("admins", {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function storeUser(form) {
    return request.post("admin-register", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function toggleAdminStatus(form) {
    return request.post("toggle-admin-status", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

export default Admins;