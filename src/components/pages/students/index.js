import { useState, useEffect, } from "react";
import { request, } from "../../../util/request";
import { getToken, getAuthEmail, } from "../../../util/auth";
import { Form, message, } from "antd";
import { getErrorMessage, getMessage, } from "../../../util";
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
    const [firstNameHelp, setFirstNameHelp] = useState('');
    const [middleNameHelp, setMiddleNameHelp] = useState('');
    const [lastNameHelp, setLastNameHelp] = useState('');
    const [studentNumberHelp, setStudentNumberHelp] = useState('');
    const [courseHelp, setCourseHelp] = useState('');
    const [yearHelp, setYearHelp] = useState('');
    const [termHelp, setTermHelp] = useState('');
    const [emailHelp, setEmailHelp] = useState('');
    const [passwordHelp, setPasswordHelp] = useState('');

    const handleStudents = payload => setStudents(payload);
    const handleShowModal = () => setIsModalVisible(true);
    const handleHideModal = () => setIsModalVisible(false);
    const handleTitle = title => setTitle(title);
    const handleAlert = message => setAlert(message);
    const handleStatus = status => setStatus(status);
    const handleHeader = header => setHeader(header);
    const handleFirstNameHelp = message => setFirstNameHelp(message);
    const handleMiddleNameHelp = message => setMiddleNameHelp(message);
    const handleLastNameHelp = message => setLastNameHelp(message);
    const handleStudentNumberHelp = message => setStudentNumberHelp(message);
    const handleCourseHelp = message => setCourseHelp(message);
    const handleYearHelp = message => setYearHelp(message);
    const handleTermHelp = message => setTermHelp(message);
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
            console.error('on store student: not auth');
            return;
        }

        const storeForm = new FormData();

        for (let i in values) {
            values[i] && storeForm.append(i, values[i]);
        }

        storeForm.append("auth_email", getAuthEmail());

        emitMessage("Loading", "loading", 2);

        storeUser(storeForm).then(response => {
            if (!(response.data.is_success)) {
                handleHeader("Error");
                handleStatus("danger");
                handleAlert(<Text type="span">{response.data.data}</Text>);
                return;
            }

            arr = students;
            (Object.values(arr).length > 0) && arr.push(response.data.data.details);
            if (Object.values(arr).length === 0) {
                arr = [response.data.data.details]
            }

            resetForm();
            handleStudents(arr);
            handleHideModal();
            setTimeout(() => {
                emitMessage("Student added.", "success", 2.5);
            }, 2000);
        })

        .catch(err => {
            if (err.response && err.response.data.errors) {
                console.info('err ', err.response.data.errors);
                err.response.data.errors.first_name && handleFirstNameHelp(getErrorMessage(err.response.data.errors.first_name[0]));
                err.response.data.errors.middle_name && handleMiddleNameHelp(getErrorMessage(err.response.data.errors.middle_name[0]));
                err.response.data.errors.last_name && handleLastNameHelp(getErrorMessage(err.response.data.errors.last_name[0]));
                err.response.data.errors.course && handleCourseHelp(getErrorMessage(err.response.data.errors.course[0]));
                err.response.data.errors.student_number && handleStudentNumberHelp(getErrorMessage(err.response.data.errors.student_number[0]));
                err.response.data.errors.year && handleYearHelp(getErrorMessage(err.response.data.errors.year[0]));
                err.response.data.errors.term && handleTermHelp(getErrorMessage(err.response.data.errors.term[0]));
                err.response.data.errors.email && handleEmailHelp(getErrorMessage(err.response.data.errors.email[0]));
                err.response.data.errors.password && handlePasswordHelp(getErrorMessage(err.response.data.errors.password[0]));
            }
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
            {
                alert &&
                <Alert status={status} header={header}>
                    {alert}
                </Alert>
            }
            <Button
            onClick={() => handleModalContent(
                <RegisterStudent
                    form={form}
                    onFinish={onStore}
                    firstNameHelp={firstNameHelp}
                    middleNameHelp={middleNameHelp}
                    lastNameHelp={lastNameHelp}
                    studentNumberHelp={studentNumberHelp}
                    courseHelp={courseHelp}
                    yearHelp={yearHelp}
                    termHelp={termHelp}
                    emailHelp={emailHelp}
                    passwordHelp={passwordHelp} />, "Add Student"
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