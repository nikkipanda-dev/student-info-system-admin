import { useState, useEffect, } from "react";
import { getToken, } from "../../../util/auth";
import { Outlet, } from "react-router-dom";
import { request, } from "../../../util/request";
import { 
    useParams, 
    useNavigate,
} from "react-router-dom";
import { sectionStyle, studentContentStyle, } from "../../../stitches.config";
import Container from "../../core/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUserEdit, } from "@fortawesome/free-solid-svg-icons";
import { emitMessage, } from "../../../util";

import Section from "../../core/Section";
import Card from "../../core/Card";
import Row from "../../core/Row";
import Column from "../../core/Column";
import Button from "../../core/Button";
import StudentSettings from "../../widgets/StudentSettings";
import StudentBio from "../../widgets/StudentBio";
import ProfileTabs from "../../widgets/ProfileTabs";
import Modal from "../../widgets/Modal";
import Text from "../../core/Text";

const styling = {
    '@media screen and (max-width: 575px)': {
        'button': {
            marginTop: '$10',
        }
    },
}

export const Student = ({ isAuth, authUser, }) => {
    const params = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [title, setTitle] = useState('');

    const handleStudent = payload => setStudent(payload);
    const handleShowModal = () => setIsModalVisible(true);
    const handleHideModal = () => setIsModalVisible(false);
    const handleTitle = title => setTitle(title);

    const handleNavigator = path => {
        navigate(path, { replace: true });
    }

    const handleModalContent = (payload, title) => {
        setModalContent(payload);
        handleTitle(title);
        handleShowModal();
    };

    useEffect(() => {
        let loading = true;

        if (loading && !(student) && params.slug) {
            // Redirect to index payments tab 
            !(params.tab_slug) && navigate("payments");

            getUser(authUser.email, params.slug).then(response => {
                !(response.data.is_success) && handleStudent('');
                response.data.data.details && handleStudent(response.data.data.details);
            });
        }

        return () => {
            loading = false;
        }
    }, []);

    return (
        (isAuth && params.slug && (student && (Object.keys(student).length > 0)) && params.tab_slug) && 
        <Section css={sectionStyle}>
            <Container 
            className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center" 
            css={styling}>
                <Button
                className="flex-grow-1 flex-sm-grow-0"
                onClick={() => handleNavigator("/students")}
                text={
                    <>
                        <FontAwesomeIcon icon={faArrowLeft} className="fa-fw fa-md" />
                        <Text 
                        type="span" 
                        size="default"
                        css={{ marginLeft: '$5', }}>
                            Back to students
                        </Text>
                    </>
                } />
            {
                !(isModalVisible) && 
                <Button
                className="flex-grow-1 flex-sm-grow-0"
                onClick={() => handleModalContent(
                    <StudentSettings
                    slug={params.slug}
                    values={student}
                    authUser={authUser}
                    emitMessage={emitMessage}
                    handleStudent={handleStudent} />, "Update Settings"
                )}
                color={isModalVisible ? '' : "yellow"}
                text={
                    isModalVisible ? "Cancel" : 
                    <>
                        <FontAwesomeIcon icon={faUserEdit} className="fa-fw fa-md" />
                        <Text 
                        type="span"
                        size="default" 
                        css={{ marginLeft: '$5', }}>
                            Update
                        </Text>
                    </>
                } />
            }
            </Container>
            <Container css={{ marginTop: '$30', }}>
                <Row>
                    <Column className="col-12 col-md-4">
                        <StudentBio values={student} />
                    </Column>
                    <Column className="col-12 col-md-8">
                        <Card
                        className="d-flex flex-column"
                        background="white"
                        radius="small">
                            <Container css={studentContentStyle}>
                                <ProfileTabs />
                                <Outlet context={{
                                    isAuth: isAuth,
                                    emitMessage: emitMessage,
                                    student: student,
                                    slug: params.slug,
                                    authUser: authUser,
                                }}/>
                            </Container>
                        </Card>
                    </Column>
                </Row>
            </Container>
            <Modal
            isVisible={isModalVisible}
            maskClosable={false}
            title={title}
            width="700px"
            onCancel={handleHideModal}>
                {modalContent}
            </Modal>
        </Section>
    )
}

async function getUser(email, slug) {
    return request.get("student", {
        params: {
            auth_email: email,
            slug: slug,
        },
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

export default Student;