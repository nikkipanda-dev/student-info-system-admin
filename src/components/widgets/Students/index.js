import { Link, } from 'react-router-dom';
import { Table, } from 'antd';

import Text from '../../core/Text';

export const Students = ({ values, }) => {
    const columns = [
        {
            title: 'Student #',
            dataIndex: 'student_number',
            render: (text) => <Text type="span">{text}</Text>,
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            render: (text) => <Text type="span">{text}</Text>,
        },
        {
            title: 'M.I.',
            dataIndex: 'middle_name',
            render: (text) => <Text type="span">{text && `${text.charAt(0)}.`}</Text>,
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            render: (text) => <Text type="span">{text}</Text>,
        },
        {
            title: 'Course',
            dataIndex: 'course',
            render: (text) => <Text type="span">{text}</Text>,
        },
        {
            title: 'Year',
            dataIndex: 'year',
            render: (text) => <Text type="span">{text}</Text>,
        },
        {
            title: 'Term',
            dataIndex: 'term',
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
        {
            title: 'Action',
            dataIndex: 'student_number',
            key: 'action',
            render: (_, record) => <Link to={`/student/${record.slug}`}>View profile</Link>,
        },
    ];

    return (
        (values && (Object.keys(values).length > 0)) && 
        <Table 
        columns={columns} 
        dataSource={[...values]} 
        rowKey="student_number" />
    )
}

export default Students;