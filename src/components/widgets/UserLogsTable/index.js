import { Table, } from 'antd';

import Text from '../../core/Text';

export const UserLogsTable = ({ values, }) => {
    const columns = [
        {
            title: 'Description',
            dataIndex: 'description',
            fixed: 'left',
            width: '800px',
            render: (text) => <Text type="span">{text}</Text>,
        },
        {
            title: 'Page',
            dataIndex: 'page',
            render: (text) => <Text type="span">{text}</Text>,
        },
        {
            title: 'Created',
            dataIndex: 'created_at',
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
    ];

    return (
        (values && (Object.keys(values).length > 0)) &&
        <Table
        columns={columns}
        dataSource={[...values]}
        rowKey="created_at"
        scroll={{
            x: 1500,
        }} />
    )
}

export default UserLogsTable;