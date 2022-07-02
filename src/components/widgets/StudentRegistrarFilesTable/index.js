import { Table, Form, } from 'antd';
import Container from '../../core/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, } from '@fortawesome/free-solid-svg-icons';

import Text from '../../core/Text';
import Button from '../../core/Button';
import Alert from '../Alert';
import StudentRegistrarFileUpdate from '../StudentRegistrarFileUpdate';

export const StudentRegistrarFilesTable = ({ 
    resetForm,
    handleModalContent,
    emitMessage,
    isAuth,
    student,
    registrarFiles,
    handleRegistrarFiles,
    updateRegistrarFile,
    handleHideModal,
    deleteRegistrarFile,
    authUser,
 }) => {
    const [form] = Form.useForm();

    const onConfirmDeletion = slug => {
        handleModalContent(<Container className="d-flex flex-column">
            <Alert status="danger" header="Confirmation" css={{ margin: '0' }}><Text type="span">Delete registrar file?</Text></Alert>
            <Container className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center" css={{ marginTop: '$20', }}>
                <Button
                text="Cancel"
                className="flex-grow-1 flex-sm-grow-0"
                onClick={() => handleHideModal()} />
                <Button
                text="Delete"
                className="flex-grow-1 flex-sm-grow-0"
                onClick={() => onDelete(slug)}
                color="red" />
            </Container>
        </Container>, "Confirmation");
    }

    const onDelete = slug => {
        const form = new FormData();

        form.append("auth_email", authUser.email);
        form.append("student_slug", student.slug);
        form.append("slug", slug);

        emitMessage("Loading", "loading", 2);

        deleteRegistrarFile(form).then(response => {
            if (!(response.data.is_success)) {
                emitMessage(response.data.data, "danger", 3);
                return;
            }

            handleRegistrarFiles(Object.values(registrarFiles).filter(el => el.slug !== slug))

            handleHideModal();
            setTimeout(() => {
                emitMessage("Registrar file deleted.", "success", 2.5);
            }, !(response.data.is_success) ? 3000 : 300);
        });
    }

    const columns = [
        {
            title: 'Status',
            dataIndex: 'status',
            width: '100px',
            render: (text) => <Text type="span">{text}</Text>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            width: '300px',
            render: (text) => <Text type="span">{text}</Text>,
        },
        {
            title: 'Created',
            dataIndex: 'created_at',
            width: '180px',
            render: (text) => <Text type="span">{new Intl.DateTimeFormat('en-US', {
                timeZone: "Asia/Manila",
                hourCycle: 'h24',
                year: '2-digit',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            }).format(new Date(text))}</Text>,
        },
        {
            title: 'Action',
            dataIndex: 'slug',
            key: 'action',
            width: '180px',
            fixed: 'right',
            render: (_, record) => <Container css={{
                width: '100%',
                'button': {
                    background: 'transparent',
                }
            }}>
                <Button
                text={<Text type="span" color="warning"><FontAwesomeIcon icon={faPen} className="fa-fw" /></Text>}
                className="button-sm"
                onClick={() => handleModalContent(<StudentRegistrarFileUpdate
                    form={form}
                    resetForm={resetForm}
                    onFinish={updateRegistrarFile}
                    registrarFiles={registrarFiles}
                    handleRegistrarFiles={handleRegistrarFiles}
                    emitMessage={emitMessage}
                    isAuth={isAuth}
                    student={student}
                    slug={record.slug}
                    values={record}
                    handleHideModal={handleHideModal}
                    authUser={authUser} />, "Update Registrar File")}
                css={{ marginLeft: '$10', }} />
                <Button
                text={<Text type="span" color="danger"><FontAwesomeIcon icon={faTrash} className="fa-fw" /></Text>}
                className="button-sm"
                css={{ color: '$red2', marginLeft: '$10', }}
                onClick={() => onConfirmDeletion(record.slug)} />
            </Container>,
        },
    ];

    return (
        (registrarFiles && (Object.keys(registrarFiles).length > 0)) &&
        <Table
        columns={columns}
        dataSource={[...registrarFiles]}
        rowKey="slug"
        scroll={{
            x: 760,
        }} />
    )
}

export default StudentRegistrarFilesTable;