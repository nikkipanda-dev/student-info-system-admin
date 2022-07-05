import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, } from '@fortawesome/free-solid-svg-icons';
import { Table, Tooltip, } from 'antd';

import Container from '../../core/Container';
import Text from '../../core/Text';
import Button from '../../core/Button';
import AdminSettings from '../AdminSettings';

export const AdminsTable = ({ 
    values,
    onUpdate,
    authUser,
    emitMessage,
    isModalVisible,
    handleModalContent,
    administrators,
    handleAdministrators,
}) => {
    const columns = [
        {
            title: 'First Name',
            dataIndex: 'first_name',
            width: '200px',
            ellipsis: {
                showTitle: false,
            },
            render: (text) => <Text type="span">{`${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`}</Text>,
        },
        {
            title: 'M.I.',
            dataIndex: 'middle_name',
            width: '100px',
            render: (text) => <Text type="span" {...!text && { color: "info" }}>{text ? `${text.charAt(0).toUpperCase()}.` : 'n/a'}</Text>,
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            width: '200px',
            render: (text) => <Text type="span">{`${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`}</Text>,
        },
        {
            title: 'Created',
            dataIndex: 'created_at',
            width: '200px',
            render: (text) => <Text type="span" color="info">{new Intl.DateTimeFormat('en-US', {
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
            fixed: 'right',
            width: '100px',
            render: (_, record) => <Container css={{
                width: '100%',
                'button': {
                    background: 'transparent',
                }
            }}>
                <Button
                text={<Text type="span" color="warning"><FontAwesomeIcon icon={faPen} className="fa-fw" /></Text>}
                className="button-sm"
                onClick={() => handleModalContent(<AdminSettings
                    values={record}
                    authUser={authUser}
                    slug={record.slug}
                    emitMessage={emitMessage}
                    administrators={administrators}
                    handleAdministrators={handleAdministrators} />, "Update Settings")}
                css={{ marginLeft: '$10', }} />
            </Container>,
        },
    ];

    return (
        (values && (Object.keys(values).length > 0)) &&
        <Table
        columns={columns}
        dataSource={[...values]}
        rowKey="slug"
        scroll={{
            x: 700,
        }} />
    )
}

export default AdminsTable;