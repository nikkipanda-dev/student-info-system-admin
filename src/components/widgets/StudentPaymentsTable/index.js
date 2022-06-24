import { Link, } from 'react-router-dom';
import { Table, Form, } from 'antd';
import Container from '../../core/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, } from '@fortawesome/free-solid-svg-icons';
import { getAuthEmail, } from '../../../util/auth';

import Text from '../../core/Text';
import Button from '../../core/Button';
import Alert from '../Alert';
import StudentPaymentUpdate from '../StudentPaymentUpdate';
import StudentPayment from '../StudentPayment';

export const StudentPaymentsTable = ({ 
    values, 
    handleModalContent,
    deletePayment,
    payments,
    handlePayments,
    emitMessage,
    isAuth,
    student,
    updatePayment,
    handleAlertComponent,
    handleHideModal,
    alert,
}) => {
    console.info('payments ', values)
    const [form] = Form.useForm();

    const paymentModes = {
        bank_transfer_bdo: "Bank Transfer (BDO)",
        bank_transfer_security_bank: "Bank Transfer (Security Bank)",
        cash: "Cash",
        gcash: "GCash",
    }

    const termOptions = {
        full: "Full",
        installment: "Installment",
    }

    const statusOptions = {
        pending: "Pending",
        verified: "Verified",
    }

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

        form.append("auth_email", getAuthEmail());
        form.append("student_slug", student.slug);
        form.append("slug", slug);

        emitMessage("Loading", "loading", 2);

        deletePayment(form).then(response => {
            console.info('res ', response.data);
            if (!(response.data.is_success)) {
                handleAlertComponent("Error", "danger", response.data.data);
                return;
            }

            // handlePayments(Object.keys(payments).map((i, val) => {
            //     if (Object.values(payments)[val].slug === slug) {
            //         console.info("Target ", Object.values(payments)[val].id);
            //         return { ...Object.values(payments)[val], status: response.data.data.details.status }
            //     }

            //     return Object.values(payments)[val]
            // }));

            handlePayments(Object.values(payments).filter(el => el.slug !== slug))

            handleHideModal();
            setTimeout(() => {
                emitMessage("Payment updated.", "success", 2.5);
            }, 2000);
        });
    }
    
    const columns = [
        {
            title: 'Status',
            dataIndex: 'status',
            fixed: 'left',
            width: '100px',
            render: (text) => <Text type="span">{text}</Text>,
        },
        {
            title: 'Amount',
            dataIndex: 'amount_paid',
            width: '100px',
            render: (text) => <Text type="span">{text}</Text>,
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
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
            title: 'Created',
            dataIndex: 'created_at',
            width: '200px',
            render: (text) => <Text type="span">{new Intl.DateTimeFormat('en-US', {
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
            width: '200px',
            render: (_, record) => <Container css={{ 
                    'button': {
                        background: 'transparent',
                    }
                }}>
                <Button
                text={<Text type="span" color="info">View</Text>}
                className="button-sm"
                css={{
                    color: '$gray4',
                }}
                onClick={() => handleModalContent(<StudentPayment />, "Payment Details")} />
                    <Button 
                    text={<Text type="span" color="warning"><FontAwesomeIcon icon={faPen} className="fa-fw" /></Text>}
                    className="button-sm"
                    css={{
                        color: '$gray4',
                    }}
                    onClick={() => handleModalContent(<StudentPaymentUpdate 
                        form={form} 
                        onFinish={updatePayment}
                        payments={payments}
                        handlePayments={handlePayments}
                        emitMessage={emitMessage}
                        isAuth={isAuth}
                        student={student}
                        slug={record.slug}
                        values={{
                            status: record.status,
                        }}
                        handleAlertComponent={handleAlertComponent}
                        handleHideModal={handleHideModal} />, "Update Payment")} />
                    <Button 
                    text={<Text type="span" color="danger"><FontAwesomeIcon icon={faTrash} className="fa-fw" /></Text>} 
                    css={{ color: '$red2', marginLeft: '$10', }}
                    onClick={() => onConfirmDeletion(record.slug)} />
                </Container>,
        },
    ];

    return (
        (values && (Object.keys(values).length > 0)) &&
        <Container>
            <Table
            columns={columns}
            dataSource={[...values]}
            rowKey="slug"
            scroll={{
                x: 700,
            }} />
        </Container>
    )
}

export default StudentPaymentsTable;