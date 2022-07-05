import { useState, useEffect, } from "react";
import { Form, } from "antd";
import { getToken, } from "../../../util/auth";
import { request, } from "../../../util/request";
import { emitMessage, } from "../../../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, } from "@fortawesome/free-solid-svg-icons";
import { sectionStyle, } from "../../../stitches.config";

import Section from "../../core/Section";
import Container from "../../core/Container";
import Heading from "../../core/Heading";
import Text from "../../core/Text";
import RegisterAdmin from "../../widgets/RegisterAdmin";
import Modal from "../../widgets/Modal";
import Button from "../../core/Button";
import AdminsTable from "../../widgets/AdminsTable";

export const Admins = ({ isAuth, authUser, }) => {
    const [form] = Form.useForm();

    const [administrators, setAdministrators] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [title, setTitle] = useState('');

    const handleAdministrators = payload => setAdministrators(payload);
    const handleShowModal = () => setIsModalVisible(true);
    const handleHideModal = () => setIsModalVisible(false);
    const handleTitle = title => setTitle(title);

    const handleModalContent = (payload, title) => {
        setModalContent(payload);
        handleTitle(title);
        handleShowModal();
    };

    const resetForm = form => {
        form.resetFields();
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
            <Heading 
            type={2} 
            text="Administrators"
            color="info" />
            <Container className="d-flex justify-content-sm-end align-items-sm-center">
            {
                !(isModalVisible) && 
                <Button
                className="flex-grow-1 flex-sm-grow-0"
                onClick={() => handleModalContent(
                    <RegisterAdmin
                    form={form}
                    onFinish={storeUser}
                    authUser={authUser}
                    emitMessage={emitMessage}
                    isAuth={isAuth}
                    resetForm={resetForm}
                    administrators={administrators}
                    handleAdministrators={handleAdministrators}
                    handleHideModal={handleHideModal} />, "Add Administrator"
                )}
                text={
                    <>
                        <FontAwesomeIcon icon={faUserPlus} className="fa-fw fa-lg" />
                        <Text type="span" css={{ marginLeft: '$5', }}>Add</Text>
                    </>
                } />
            }
            </Container>
            <Container css={{ marginTop: '$30', }}>
            {
                (administrators && (Object.keys(administrators).length > 0)) ?
                <AdminsTable 
                values={administrators}
                onUpdate={toggleAdminStatus}
                authUser={authUser}
                emitMessage={emitMessage}
                isModalVisible={isModalVisible}
                handleModalContent={handleModalContent}
                administrators={administrators}
                handleAdministrators={handleAdministrators} /> :
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