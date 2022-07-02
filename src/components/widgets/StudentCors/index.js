import { useState, useEffect, } from "react";
import Container from "../../core/Container";

import Modal from "../Modal";
import Button from "../../core/Button";
import Text from "../../core/Text";
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
    const [cors, setCors] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [title, setTitle] = useState('');

    const handleCors = payload => setCors(payload);
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

        if (loading && (!(cors) || (Object.keys(cors).length === 0))) {
            getCors(authUser.email, slug).then(response => {
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
                    cors={cors}
                    handleCors={handleCors}
                    authUser={authUser}
                    handleHideModal={handleHideModal} />, "Add a COR"
                )}
                color={isModalVisible ? '' : "yellow"}
                text={isModalVisible ? "Cancel" : "Add a COR"} />
            }
            </Container>
            <Container css={{ marginTop: '$30', }}>
            {
                (cors && (Object.keys(cors).length > 0)) ?
                <StudentCorTable
                handleModalContent={handleModalContent}
                emitMessage={emitMessage}
                isAuth={isAuth}
                student={student}
                cors={cors}
                handleCors={handleCors}
                updateCor={updateCor}
                handleHideModal={handleHideModal}
                deleteCor={deleteCor}
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

export default StudentCors;