import { Form, Table, } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, } from '@fortawesome/free-solid-svg-icons';
import { 
    onDownload, 
    courseOptions,
    ordinalNumbers,
} from '../../../util';

import Text from '../../core/Text';
import Image from '../../core/Image';
import Alert from '../Alert';
import Container from '../../core/Container';
import Button from '../../core/Button';
import StudentPermitUpdate from '../StudentPermitUpdate';

export const StudentPermitsTable = ({
    handleModalContent,
    emitMessage,
    isAuth,
    student,
    permits,
    handlePermits,
    updatePermit,
    handleHideModal,
    deletePermit,
    authUser,
 }) => {
    const [form] = Form.useForm();

    const onDownloadFile = value => {
        onDownload(authUser.slug, student.slug, value);
    }

    const onConfirmDeletion = slug => {
        handleModalContent(<Container className="d-flex flex-column">
            <Alert status="danger" header="Confirmation" css={{ margin: '0' }}><Text type="span">Delete permit?</Text></Alert>
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

        deletePermit(form).then(response => {
            if (!(response.data.is_success)) {
                emitMessage(response.data.data, "danger", 3);
                return;
            }

            handlePermits(Object.values(permits).filter(el => el.slug !== slug))
            handleHideModal();
            setTimeout(() => {
                emitMessage("Permit deleted.", "success", 2.5);
            }, !(response.data.is_success) ? 3000 : 300);
        });
    }

    const columns = [
        {
            title: 'Course',
            dataIndex: 'course',
            width: '200px',
            ellipsis: {
                showTitle: false,
            },
            render: (text) => 
            <>
                <Text type="span" color="blue2">{`[${text.toUpperCase()}]`}</Text>
                <Text
                    type="span"
                    css={{ marginLeft: '$5', }}>{courseOptions[text]}</Text>
            </>,
        },
        {
            title: 'Year',
            dataIndex: 'year',
            width: '100px',
            render: (text) => <Text type="span">{ordinalNumbers[text]}</Text>,
        },
        {
            title: 'Term',
            dataIndex: 'term',
            width: '100px',
            render: (text) => <Text type="span">{ordinalNumbers[text]}</Text>,
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
            render: (text) => 
            <Text type="span" color="info">{new Intl.DateTimeFormat('en-US', {
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
            render: (_, record) => 
            <Container css={{
                width: '100%',
                'button': {
                    background: 'transparent',
                }
            }}>
                <Button
                text={<Text type="span" color="warning"><FontAwesomeIcon icon={faPen} className="fa-fw" /></Text>}
                className="button-sm"
                onClick={() => handleModalContent(<StudentPermitUpdate
                    form={form}
                    onFinish={updatePermit}
                    permits={permits}
                    onDownload={onDownload}
                    handlePermits={handlePermits}
                    emitMessage={emitMessage}
                    isAuth={isAuth}
                    student={student}
                    slug={record.slug}
                    values={record}
                    handleHideModal={handleHideModal}
                    authUser={authUser} />, "Permit Details")}
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
        (permits && (Object.keys(permits).length > 0)) &&
        <Table
        columns={columns}
        dataSource={[...permits]}
        rowKey="slug"
        scroll={{
            x: 700,
        }} />
    )
}

export default StudentPermitsTable;