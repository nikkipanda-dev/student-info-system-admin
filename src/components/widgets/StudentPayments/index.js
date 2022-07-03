import { useState, useEffect, } from "react";
import { Form, } from "antd";
import Container from "../../core/Container";

import Modal from "../Modal";
import Button from "../../core/Button";
import Text from "../../core/Text";
import StudentPaymentsForm from "../StudentPaymentsForm";
import StudentPaymentsTable from "../StudentPaymentsTable";

export const StudentPayments = ({ 
    getPayments,
    storePayment, 
    updatePayment,
    deletePayment,
    isAuth,
    emitMessage,
    student,
    slug,
    authUser,
}) => {
    const [form] = Form.useForm();

    const [payments, setPayments] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [title, setTitle] = useState('');

    const handlePayments = payload => setPayments(payload);
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

        if (loading && (!(payments) || (Object.keys(payments).length === 0))) {
            getPayments(authUser.email, slug).then(response => {
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
                    authUser={authUser}
                    onFinish={storePayment}
                    emitMessage={emitMessage}
                    isAuth={isAuth}
                    resetForm={resetForm}
                    payments={payments}
                    handlePayments={handlePayments}
                    handleHideModal={handleHideModal} />, "Add Payment"
                )}
                color={isModalVisible ? '' : "yellow"}
                text={isModalVisible ? "Cancel" : "Add Payment"} />
            }
            </Container>
            <Container css={{ marginTop: '$30', }}>
            {
                (payments && (Object.keys(payments).length > 0)) ?
                <StudentPaymentsTable 
                handleModalContent={handleModalContent}
                emitMessage={emitMessage}
                isAuth={isAuth}
                student={student}
                payments={payments}
                handlePayments={handlePayments}
                updatePayment={updatePayment}
                handleHideModal={handleHideModal}
                deletePayment={deletePayment}
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
                width="700px"
                destroyOnClose={true}
                bodyStyle={{ maxHeight: '80vh', overflowY: 'auto', }}
                onCancel={handleHideModal}>
                    {modalContent}
                </Modal>
            }
        </Container>
    )
}

export default StudentPayments;