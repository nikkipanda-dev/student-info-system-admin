import { useState, useEffect, } from "react";
import { getToken, getAuthEmail, } from "../../../util/auth";
import { request, } from "../../../util/request";
import { useParams, } from "react-router-dom";
import { sectionStyle, studentContentStyle, } from "../../../stitches.config";
import Container from "../../core/Container";

import Section from "../../core/Section";
import Card from "../../core/Card";
import Row from "../../core/Row";
import Column from "../../core/Column";
import Button from "../../core/Button";
import StudentSettings from "../../widgets/StudentSettings";
import StudentBio from "../../widgets/StudentBio";
import ProfileTabs from "../../widgets/ProfileTabs";
import StudentContent from "../../widgets/StudentContent";
import Modal from "../../widgets/Modal";

export const Student = ({ isAuth, }) => {
    const params = useParams();

    const [student, setStudent] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [title, setTitle] = useState('');

    const handleStudent = payload => setStudent(payload);
    const handleShowModal = () => setIsModalVisible(true);
    const handleHideModal = () => setIsModalVisible(false);
    const handleTitle = title => setTitle(title);

    const handleModalContent = (payload, title) => {
        setModalContent(payload);
        handleTitle(title);
        handleShowModal();
    };

    useEffect(() => {
        let loading = true;

        if (loading && !(student) && params.slug) {
            getUser(params.slug).then(response => {
                console.info('res ', response);
                !(response.data.is_success) && handleStudent('');
                response.data.data.details && handleStudent(response.data.data.details);
            })

            .catch (err => {
                console.error('err ', err);
            });
        }

        return () => {
            loading = false;
        }
    }, []);

    return (
        (isAuth && params.slug && (student && (Object.keys(student).length > 0))) && 
        <Section css={sectionStyle}>
            <Container>
                <Button
                onClick={() => handleModalContent(
                    <StudentSettings 
                    slug={params.slug} 
                    values={student}
                    handleStudent={handleStudent } />, "Add Student"
                )}
                text="Add" />
                <Row>
                    <Column className="col-sm-4">
                        <StudentBio values={student} />
                    </Column>
                    <Column className="col-sm-8">
                        <Card
                        className="d-flex flex-column"
                        background="white"
                        radius="small">
                            <Container css={studentContentStyle}>
                                <ProfileTabs />
                                <StudentContent />
                            </Container>
                        </Card>
                    </Column>
                </Row>
            </Container>
            <Modal
            isVisible={isModalVisible}
            maskClosable={false}
            title={title}
            onCancel={handleHideModal}>
                {modalContent}
            </Modal>
        </Section>
    )
}

async function getUser(slug) {
    return request.get("student", {
        params: {
            auth_email: getAuthEmail(),
            slug: slug,
        },
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

export default Student;