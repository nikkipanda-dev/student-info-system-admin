import { Table, } from 'antd';
import Container from '../../core/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, } from '@fortawesome/free-solid-svg-icons';
import { onDownload, } from '../../../util';

import Text from '../../core/Text';
import Button from '../../core/Button';
import Image from '../../core/Image';
import Alert from '../Alert';
import StudentCorUpdate from "../StudentCorUpdate";

export const StudentCorTable = ({ 
    handleModalContent,
    emitMessage,
    isAuth,
    student,
    cors,
    handleCors,
    updateCor,
    handleHideModal,
    deleteCor,
    authUser,
}) => {
    const onDownloadFile = value => {
        onDownload(authUser.slug, student.slug, value);
    }

    const onConfirmDeletion = slug => {
        handleModalContent(<Container className="d-flex flex-column">
            <Alert status="danger" header="Confirmation" css={{ margin: '0' }}><Text type="span">Delete certificate of registration?</Text></Alert>
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

        deleteCor(form).then(response => {
            if (!(response.data.is_success)) {
                emitMessage(response.data.data, "danger", 3);
                return;
            }

            handleCors(Object.values(cors).filter(el => el.slug !== slug))
            handleHideModal();
            setTimeout(() => {
                emitMessage("COR deleted.", "success", 2.5);
            }, !(response.data.is_success) ? 3000 : 300);
        });
    }

    const columns = [
        {
            title: 'Course',
            dataIndex: 'course',
            width: '100px',
            render: (text) => <Text type="span">{text}</Text>,
        },
        {
            title: 'Year',
            dataIndex: 'year',
            width: '100px',
            render: (text) => <Text type="span">{text}</Text>,
        },
        {
            title: 'Term',
            dataIndex: 'term',
            width: '100px',
            render: (text) => <Text type="span">{text}</Text>,
        },
        {
            title: 'Image',
            dataIndex: 'slug',
            width: '130px',
            render: (_, record) => <Image
                src={record.file[0].path}
                onClick={() => onDownloadFile(record.slug)}
                css={{
                    width: '100px',
                    width: '100px',
                    objectFit: 'cover',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                }} />,
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
            dataIndex: 'student_number',
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
                onClick={() => handleModalContent(<StudentCorUpdate
                    onFinish={updateCor}
                    cors={cors}
                    onDownload={onDownload}
                    handleCors={handleCors}
                    emitMessage={emitMessage}
                    isAuth={isAuth}
                    student={student}
                    slug={record.slug}
                    values={record}
                    handleHideModal={handleHideModal}
                    authUser={authUser} />, "COR Details")}
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
        (cors && (Object.keys(cors).length > 0)) &&
        <Table
        columns={columns}
        dataSource={[...cors]}
        rowKey="slug"
        scroll={{
            x: 700,
        }} />
    )
}

export default StudentCorTable;