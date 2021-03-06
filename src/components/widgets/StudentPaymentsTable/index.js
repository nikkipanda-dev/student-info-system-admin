import { Table, Form, } from 'antd';
import Container from '../../core/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTrash, 
    faPen,
    faCircleCheck,
    faClock,
    faBan,
} from '@fortawesome/free-solid-svg-icons';
import { onDownload, ordinalNumbers, } from '../../../util';

import Text from '../../core/Text';
import Button from '../../core/Button';
import Alert from '../Alert';
import StudentPaymentUpdate from '../StudentPaymentUpdate';

export const StudentPaymentsTable = ({ 
    handleModalContent,
    deletePayment,
    authUser,
    payments,
    handlePayments,
    emitMessage,
    isAuth,
    student,
    updatePayment,
    handleHideModal,
}) => {
    const [form] = Form.useForm();

    const onConfirmDeletion = slug => {
        handleModalContent(<Container className="d-flex flex-column">
            <Alert status="danger" header="Confirmation" css={{ margin: '0' }}><Text type="span">Delete payment?</Text></Alert>
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

        deletePayment(form).then(response => {
            if (!(response.data.is_success)) {
                emitMessage(response.data.data, "danger", 3);
                return;
            }

            handlePayments(Object.values(payments).filter(el => el.slug !== slug))

            handleHideModal();
            setTimeout(() => {
                emitMessage("Payment deleted.", "success", 2.5);
            }, !(response.data.is_success) ? 3000 : 300);
        });
    }
    
    const columns = [
        {
            title: 'Status',
            dataIndex: 'status',
            fixed: 'left',
            width: '130px',
            render: (text) => 
            <>
                <FontAwesomeIcon
                icon={
                    (text === 'verified') ? faCircleCheck :
                    (text === 'pending') ? faClock : faBan
                }
                className="fa-fw fa-lg"
                style={{ color: (text === 'verified') ? '#00B4D8' : '#747474', }} />
                <Text type="span" css={{ marginLeft: '$5', }}>
                    {text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()}
                </Text>
            </>,
        },
        {
            title: 'Amount',
            dataIndex: 'amount_paid',
            width: '100px',
            render: (text) => <Text type="span">&#x20B1;&#xa0;{text}</Text>,
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            width: '100px',
            render: (text) => <Text type="span">&#x20B1;&#xa0;{text ?? parseFloat(0).toFixed(2)}</Text>,
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
            title: 'Created',
            dataIndex: 'created_at',
            width: '200px',
            render: (text) => 
            <Text type="span" color="info">{new Intl.DateTimeFormat('en-US', {
                timeZone: "Asia/Manila",
                hourCycle: 'h24',
                year: 'numeric',
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
            fixed: 'right',
            width: '180px',
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
                onClick={() => handleModalContent(<StudentPaymentUpdate 
                    form={form} 
                    onFinish={updatePayment}
                    onDownload={onDownload}
                    payments={payments}
                    handlePayments={handlePayments}
                    emitMessage={emitMessage}
                    isAuth={isAuth}
                    student={student}
                    slug={record.slug}
                    values={record}
                    handleHideModal={handleHideModal}
                    authUser={authUser} />, "Payment Details")} 
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
        (payments && (Object.keys(payments).length > 0)) &&
        <Container>
            <Table
            columns={columns}
            dataSource={[...payments]}
            rowKey="slug"
            scroll={{
                x: 700,
            }} />
        </Container>
    )
}

export default StudentPaymentsTable;