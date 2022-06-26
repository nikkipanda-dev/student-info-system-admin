import { useState, useEffect, } from "react";
import { Form, } from "antd";
import { getToken, } from "../../../util/auth";
import { request, } from "../../../util/request";
import { getMessage, } from "../../../util";
import { sectionStyle, } from "../../../stitches.config";

import Section from "../../core/Section";
import Container from "../../core/Container";
import Alert from "../../widgets/Alert";
import Text from "../../core/Text";
import RegisterAdmin from "../../widgets/RegisterAdmin";
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

export const Admins = ({ isAuth, authUser, }) => {
    const [form] = Form.useForm();

    const [administrators, setAdministrators] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [title, setTitle] = useState('');
    const [alert, setAlert] = useState('');
    const [status, setStatus] = useState('');
    const [header, setHeader] = useState('');

    const handleAdministrators = payload => setAdministrators(payload);
    const handleShowModal = () => setIsModalVisible(true);
    const handleHideModal = () => setIsModalVisible(false);
    const handleTitle = title => setTitle(title);
    const handleAlert = message => setAlert(message);
    const handleStatus = status => setStatus(status);
    const handleHeader = header => setHeader(header);

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

    const handleAlertComponent = (header, status, message) => {
        if (!(message)) {
            handleAlert('');
            return;
        }

        handleHeader(header);
        handleStatus(status);
        handleAlert(<Text type="span">{message}</Text>);
    }

    const emitMessage = (content, status, duration) => {
        return getMessage({
            content: content,
            status: status,
            duration: duration,
        });
    }

    useEffect(() => {
        let loading = true;

        if (loading && (!(administrators) || (Object.keys(administrators).length === 0))) {
            getUsers(authUser.email).then(response => {
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
                    <RegisterAdmin
                    form={form}
                    onFinish={storeUser}
                    authUser={authUser}
                    emitMessage={emitMessage}
                    isAuth={isAuth}
                    resetForm={resetForm}
                    handleAlertComponent={handleAlertComponent}
                    administrators={administrators}
                    handleAdministrators={handleAdministrators}
                    handleHideModal={handleHideModal}
                    {...alert && {
                        alert: <Alert
                            status={status}
                            header={header}
                            css={{ marginBottom: '$20', }}>
                            {alert}
                        </Alert>
                    }} />, "Add Administrator"
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
                authUser={authUser}
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

async function getUsers(email) {
    return request.get("admins", {
        params: {
            auth_email: email,
        },
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