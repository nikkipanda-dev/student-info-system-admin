import { Link, } from 'react-router-dom';
import { Table, } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, } from '@fortawesome/free-solid-svg-icons';
import { courseOptions, ordinalNumbers, } from '../../../util';

import Text from '../../core/Text';

export const StudentsTable = ({ values, }) => {
    const columns = [
        {
            title: 'Student #',
            dataIndex: 'student_number',
            fixed: 'left',
            width: '200px',
            render: (text) => <Text type="span" color="info">{text}</Text>,
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            width: '200px',
            ellipsis: {
                showTitle: false,
            },
            render: (text) => <Text type="span">{`${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase() }`}</Text>,
        },
        {
            title: 'M.I.',
            dataIndex: 'middle_name',
            width: '100px',
            render: (text) => <Text type="span" {...!text && {color: "info"}}>{text ? `${text.charAt(0).toUpperCase()}.` : 'n/a'}</Text>,
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            width: '200px',
            ellipsis: {
                showTitle: false,
            },
            render: (text) => <Text type="span">{`${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`}</Text>,
        },
        {
            title: 'Course',
            dataIndex: 'course',
            width: '300px',
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
            title: 'Created',
            dataIndex: 'created_at',
            width: '200px',
            render: (text) => <Text type="span" color="info">{new Intl.DateTimeFormat('en-US', {
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
            dataIndex: 'student_number',
            key: 'action',
            width: '200px',
            fixed: 'right',
            render: (_, record) => 
            <Link to={`/student/${record.slug}`}>
                <FontAwesomeIcon 
                icon={faLink} 
                className="fa-fw fa-md"
                style={{
                    color: '#00B4D8',
                }} />
                <Text 
                type="span" 
                color="info"
                css={{ marginLeft: '$5', }}>View profile</Text>
            </Link>,
        },
    ];

    return (
        (values && (Object.keys(values).length > 0)) && 
        <Table 
        columns={columns} 
        dataSource={[...values]} 
        rowKey="student_number"
        scroll={{
            x: 700,
        }} />
    )
}

export default StudentsTable;