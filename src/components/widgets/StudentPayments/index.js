import { useState, useEffect, } from "react";
import { Form, Input, } from "antd";
import Container from "../../core/Container";
import { request, } from "../../../util/request";
import { getToken, } from "../../../util/auth";

import Modal from "../Modal";
import Button from "../../core/Button";
import Text from "../../core/Text";
import Alert from "../Alert";
import StudentPaymentsForm from "../StudentPaymentsForm";
import StudentPaymentsTable from "../StudentPaymentsTable";

export const StudentPayments = ({ 
    storePayment, 
    updatePayment,
    deletePayment,
    isAuth,
    emitMessage,
    student,
    getPayments,
    slug,
    authUser,
}) => {
    const [form] = Form.useForm();

    const [payments, setPayments] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [title, setTitle] = useState('');
    const [alert, setAlert] = useState('');
    const [status, setStatus] = useState('');
    const [header, setHeader] = useState('');

    const handlePayments = payload => setPayments(payload);
    const handleShowModal = () => setIsModalVisible(true);
    const handleHideModal = () => setIsModalVisible(false);
    const handleTitle = title => setTitle(title);
    const handleAlert = message => setAlert(message);
    const handleStatus = status => setStatus(status);
    const handleHeader = header => setHeader(header);

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

    const handleModalContent = (payload, title) => {
        setModalContent(payload);
        handleTitle(title);
        handleShowModal();
    };

    useEffect(() => {
        let loading = true;

        if (loading && (!(payments) || (Object.keys(payments).length === 0))) {
            getPayments(slug).then(response => {
                !(response.data.is_success) && handlePayments('');
                response.data.data.details && handlePayments(response.data.data.details);
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
                    <StudentPaymentsForm
                    form={form}
                    student={student}
                    onFinish={storePayment}
                    emitMessage={emitMessage}
                    isAuth={isAuth}
                    resetForm={resetForm}
                    handleAlertComponent={handleAlertComponent}
                    payments={payments}
                    handlePayments={handlePayments}
                    handleHideModal={handleHideModal}
                    {...alert && {
                        alert: <Alert
                            status={status}
                            header={header}
                            css={{ marginBottom: '$20', }}>
                            {alert}
                        </Alert>
                    }} />, "Add Payment"
                )}
                color={isModalVisible ? '' : "yellow"}
                text={isModalVisible ? "Cancel" : "Add Payment"} />
            }
            </Container>
            <Container css={{ marginTop: '$30', }}>
            {
                (payments && (Object.keys(payments).length > 0)) ?
                <StudentPaymentsTable 
                values={payments} 
                handleModalContent={handleModalContent}
                emitMessage={emitMessage}
                isAuth={isAuth}
                student={student}
                payments={payments}
                handlePayments={handlePayments}
                updatePayment={updatePayment}
                handleAlertComponent={handleAlertComponent}
                handleHideModal={handleHideModal}
                deletePayment={deletePayment}
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

export default StudentPayments;