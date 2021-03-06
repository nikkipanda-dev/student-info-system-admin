import { useState, useEffect, } from "react";
import { request, } from "../../../util/request";
import { getToken, } from "../../../util/auth";
import { Form, } from "antd";
import { emitMessage, } from "../../../util";
import Container from "../../core/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, } from "@fortawesome/free-solid-svg-icons";
import { sectionStyle, } from "../../../stitches.config";

import Section from "../../core/Section";
import Text from "../../core/Text";
import Heading from "../../core/Heading";
import Modal from "../../widgets/Modal";
import Button from "../../core/Button";
import StudentsTable from "../../widgets/StudentsTable";
import RegisterStudent from "../../widgets/RegisterStudent";

export const Students = ({ isAuth, authUser, }) => {
    const [form] = Form.useForm();

    const [students, setStudents] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [title, setTitle] = useState('');

    const handleStudents = payload => setStudents(payload);
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

        if (loading && isAuth && (!(students) || (Object.keys(students).length === 0))) {
            getUsers(authUser.email).then(response => {
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
            <Heading
            type={2}
            text="Students"
            color="info" />
            <Container className="d-flex justify-content-sm-end align-items-sm-center">
            {
                !(isModalVisible) && 
                <Button
                className="flex-grow-1 flex-sm-grow-0"
                onClick={() => handleModalContent(
                    <RegisterStudent
                    form={form}
                    onFinish={storeUser}
                    authUser={authUser}
                    emitMessage={emitMessage}
                    isAuth={isAuth}
                    resetForm={resetForm}
                    students={students}
                    handleStudents={handleStudents}
                    handleHideModal={handleHideModal} />, "Add Student"
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
            width="700px"
            onCancel={handleHideModal}>
                {modalContent}
            </Modal>
        }
        </Section>
    )
}

async function getUsers(email) {
    return request.get("students", {
        params: {
            auth_email: email,
        },
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