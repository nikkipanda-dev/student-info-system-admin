import { useState, useEffect, } from "react";
import { Form, } from "antd";
import Container from "../../core/Container";

import Modal from "../Modal";
import Button from "../../core/Button";
import Text from "../../core/Text";
import StudentRegistrarFilesForm from "../StudentRegistrarFilesForm";
import StudentRegistrarFilesTable from "../StudentRegistrarFilesTable";

export const StudentRegistrarFiles = ({
    getRegistrarFiles,
    storeRegistrarFile,
    updateRegistrarFile,
    deleteRegistrarFile,
    isAuth,
    emitMessage,
    student,
    slug,
    authUser,
}) => {
    const [form] = Form.useForm();

    const [registrarFiles, setRegistrarFiles] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [title, setTitle] = useState('');

    const handleRegistrarFiles = payload => setRegistrarFiles(payload);
    const handleShowModal = () => setIsModalVisible(true);
    const handleHideModal = () => setIsModalVisible(false);
    const handleTitle = title => setTitle(title);

    const resetForm = (form, handleHeader, handleStatus, handleAlert) => {
        form.resetFields();
        handleHeader('');
        handleStatus('');
        handleAlert('');
    }

    const handleModalContent = (payload, title) => {
        setModalContent(payload);
        handleTitle(title);
        handleShowModal();
    };

    useEffect(() => {
        let loading = true;

        if (loading && (!(registrarFiles) || (Object.keys(registrarFiles).length === 0))) {
            getRegistrarFiles(authUser.email, slug).then(response => {
                !(response.data.is_success) && handleRegistrarFiles('');
                response.data.data.details && handleRegistrarFiles(response.data.data.details);
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
                    <StudentRegistrarFilesForm
                    form={form}
                    student={student}
                    authUser={authUser}
                    onFinish={storeRegistrarFile}
                    emitMessage={emitMessage}
                    isAuth={isAuth}
                    resetForm={resetForm}
                    registrarFiles={registrarFiles}
                    handleRegistrarFiles={handleRegistrarFiles}
                    handleHideModal={handleHideModal} />, "Add a Registrar File"
                )}
                color={isModalVisible ? '' : "yellow"}
                text={isModalVisible ? "Cancel" : "Add a Registrar File"} />
            }
            </Container>
            <Container css={{ marginTop: '$30', }}>
            {
                (registrarFiles && (Object.keys(registrarFiles).length > 0)) ?
                <StudentRegistrarFilesTable
                resetForm={resetForm}
                handleModalContent={handleModalContent}
                emitMessage={emitMessage}
                isAuth={isAuth}
                student={student}
                registrarFiles={registrarFiles}
                handleRegistrarFiles={handleRegistrarFiles}
                updateRegistrarFile={updateRegistrarFile}
                handleHideModal={handleHideModal}
                deleteRegistrarFile={deleteRegistrarFile}
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

export default StudentRegistrarFiles;