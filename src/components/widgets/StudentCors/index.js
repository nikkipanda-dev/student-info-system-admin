import { useState, useEffect, } from "react";
import { Form, } from "antd";
import Container from "../../core/Container";

import Modal from "../Modal";
import Button from "../../core/Button";
import Text from "../../core/Text";
import Alert from "../Alert";
import StudentCorTable from "../StudentCorTable";
import StudentCorForm from "../StudentCorForm";

export const StudentCors = ({
    getCors,
    storeCor,
    updateCor,
    deleteCor,
    isAuth,
    emitMessage,
    student,
    slug,
    authUser,
}) => {
    const [form] = Form.useForm();

    const [cors, setCors] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [title, setTitle] = useState('');
    const [alert, setAlert] = useState('');
    const [status, setStatus] = useState('');
    const [header, setHeader] = useState('');

    const handleCors = payload => setCors(payload);
    const handleShowModal = () => setIsModalVisible(true);
    const handleHideModal = () => setIsModalVisible(false);
    const handleTitle = title => setTitle(title);
    const handleAlert = message => setAlert(message);
    const handleStatus = status => setStatus(status);
    const handleHeader = header => setHeader(header);

    // const resetForm = () => {
    //     form.resetFields();
    //     handleHeader('');
    //     handleStatus('');
    //     handleAlert('');
    // }

    const handleAlertComponent = (header, status, message) => {
        if (!(message)) {
            handleAlert('');
            return;
        }

        handleHeader(header);
        handleStatus(status);
        handleAlert(<Text type="span">{message}</Text>);
    }

    const handleModalContent = (payload, title) => {
        setModalContent(payload);
        handleTitle(title);
        handleShowModal();
    };

    useEffect(() => {
        let loading = true;

        if (loading && (!(cors) || (Object.keys(cors).length === 0))) {
            getCors(slug).then(response => {
                !(response.data.is_success) && handleCors('');
                response.data.data.details && handleCors(response.data.data.details);
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
                    <StudentCorForm
                    student={student}
                    onFinish={storeCor}
                    emitMessage={emitMessage}
                    isAuth={isAuth}
                    handleAlertComponent={handleAlertComponent}
                    cors={cors}
                    handleCors={handleCors}
                    authUser={authUser}
                    handleHideModal={handleHideModal}
                    {...alert && {
                        alert: <Alert
                            status={status}
                            header={header}
                            css={{ marginBottom: '$20', }}>
                            {alert}
                        </Alert>
                    }} />, "Add a COR"
                )}
                color={isModalVisible ? '' : "yellow"}
                text={isModalVisible ? "Cancel" : "Add Payment"} />
            }
            </Container>
            <Container css={{ marginTop: '$30', }}>
            {
                (cors && (Object.keys(cors).length > 0)) ?
                <StudentCorTable
                values={cors}
                handleModalContent={handleModalContent}
                emitMessage={emitMessage}
                isAuth={isAuth}
                student={student}
                cors={cors}
                handleCors={handleCors}
                updateCor={updateCor}
                handleAlertComponent={handleAlertComponent}
                handleHideModal={handleHideModal}
                deleteCor={deleteCor}
                authUser={authUser}
                {...alert && {
                    alert: <Alert
                        status={status}
                        header={header}
                        css={{ marginBottom: '$20', }}>
                        {alert}
                    </Alert>
                }} /> :
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

export default StudentCors;