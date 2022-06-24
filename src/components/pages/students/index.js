import { useState, useEffect, } from "react";
import { request, } from "../../../util/request";
import { getToken, } from "../../../util/auth";
import { Form, } from "antd";
import { getMessage, } from "../../../util";
import Container from "../../core/Container";
import { sectionStyle, } from "../../../stitches.config";

import Section from "../../core/Section";
import Text from "../../core/Text";
import Modal from "../../widgets/Modal";
import Button from "../../core/Button";
import Alert from "../../widgets/Alert";
import { Students as StudentsTable } from "../../widgets/Students";
import RegisterStudent from "../../widgets/RegisterStudent";

export const Students = ({ isAuth, }) => {
    const [form] = Form.useForm();

    const [students, setStudents] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [title, setTitle] = useState('');
    const [alert, setAlert] = useState('');
    const [status, setStatus] = useState('');
    const [header, setHeader] = useState('');

    const handleStudents = payload => setStudents(payload);
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

        if (loading && (!(students) || (Object.keys(students).length === 0))) {
            getUsers().then(response => {
                !(response.data.is_success) && handleStudents('');
                response.data.data.details && handleStudents(response.data.data.details);
            });
        }

        return () => {
            loading = false;
        }
    }, []);

    return (
        <Section css={sectionStyle}>
            <Container>
            <Button
            onClick={() => handleModalContent(
                <RegisterStudent
                form={form}
                onFinish={storeUser}
                emitMessage={emitMessage}
                isAuth={isAuth}
                resetForm={resetForm}
                handleAlertComponent={handleAlertComponent}
                students={students}
                handleStudents={handleStudents}
                handleHideModal={handleHideModal}
                {...alert && {
                    alert: <Alert
                        status={status}
                        header={header}
                        css={{ marginBottom: '$20', }}>
                        {alert}
                    </Alert>
                }} />, "Add Student"
            )}
            text="Add" />
            </Container>
            <Container>
            {
                (students && (Object.keys(students).length > 0)) ? 
                    <StudentsTable values={students} /> :
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
            {
                alert &&
                <Alert status={status} header={header}>{alert}</Alert>
            }
                {modalContent}
            </Modal>
        }
        </Section>
    )
}

async function getUsers() {
    return request.get("students", {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function storeUser(form) {
    return request.post("student-register", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

export default Students;