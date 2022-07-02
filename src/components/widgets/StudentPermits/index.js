import { useState, useEffect, } from "react";
import { Form, } from "antd";
import Container from "../../core/Container";

import Modal from "../Modal";
import Button from "../../core/Button";
import Text from "../../core/Text";
import StudentPermitsTable from "../StudentPermitsTable";
import StudentPermitForm from "../StudentPermitForm";

export const StudentPermits = ({
    getPermits,
    storePermit,
    updatePermit,
    deletePermit,
    isAuth,
    emitMessage,
    student,
    slug,
    authUser,
}) => {
    const [form] = Form.useForm();

    const [permits, setPermits] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [title, setTitle] = useState('');

    const handlePermits = payload => setPermits(payload);
    const handleShowModal = () => setIsModalVisible(true);
    const handleHideModal = () => setIsModalVisible(false);
    const handleTitle = title => setTitle(title);

    const resetForm = form => {
        form.resetFields();
    }

    const handleModalContent = (payload, title) => {
        setModalContent(payload);
        handleTitle(title);
        handleShowModal();
    };

    useEffect(() => {
        let loading = true;

        if (loading && (!(permits) || (Object.keys(permits).length === 0))) {
            getPermits(authUser.email, slug).then(response => {
                !(response.data.is_success) && handlePermits('');
                response.data.data.details && handlePermits(response.data.data.details);
            });
        }

        return () => {
            loading = false;
        }
    }, []);

    return (
        <Container>
            <Container className="d-flex justify-content-sm-end align-items-center">
            {
                !(isModalVisible) &&
                <Button
                className="flex-grow-1 flex-sm-grow-0"
                onClick={() => handleModalContent(
                    <StudentPermitForm
                    form={form}
                    resetForm={resetForm}
                    student={student}
                    onFinish={storePermit}
                    emitMessage={emitMessage}
                    isAuth={isAuth}
                    permits={permits}
                    handlePermits={handlePermits}
                    authUser={authUser}
                    handleHideModal={handleHideModal} />, "Add Permit"
                )}
                color={isModalVisible ? '' : "yellow"}
                text={isModalVisible ? "Cancel" : "Add Permit"} />
            }
            </Container>
            <Container css={{ marginTop: '$30', }}>
            {
                (permits && (Object.keys(permits).length > 0)) ?
                <StudentPermitsTable
                resetForm={resetForm}
                handleModalContent={handleModalContent}
                emitMessage={emitMessage}
                isAuth={isAuth}
                student={student}
                permits={permits}
                handlePermits={handlePermits}
                updatePermit={updatePermit}
                handleHideModal={handleHideModal}
                deletePermit={deletePermit}
                authUser={authUser} /> :
                <Text type="span">No data</Text>
            }
            </Container>
        {
            modalContent &&
            <Modal
            isVisible={isModalVisible}
            maskClosable={false}
            title={title}
            bodyStyle={{ maxHeight: '80vh', overflowY: 'auto', }}
            onCancel={handleHideModal}>
                {modalContent}
            </Modal>
        }
        </Container>
    )
}

export default StudentPermits;