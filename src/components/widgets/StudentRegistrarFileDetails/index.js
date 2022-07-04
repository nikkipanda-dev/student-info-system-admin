import { Descriptions, } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleCheck,
    faClock,
    faBan,
} from '@fortawesome/free-solid-svg-icons';
import { courseOptions, ordinalNumbers, } from '../../../util';

import Text from '../../core/Text';

export const StudentRegistrarFileDetails = ({ values, }) => {
    return (
        <Descriptions bordered>
            <Descriptions.Item label="Status" span={3}>
                <FontAwesomeIcon
                icon={
                    (values.status === 'verified') ? faCircleCheck : 
                    (values.status === 'pending') ? faClock : faBan
                }
                className="fa-fw fa-lg"
                style={{ color: (values.status === 'verified') ? '#00B4D8' : '#747474', }} />
                <Text type="span" css={{ marginLeft: '$5', }}>
                    {values.status.charAt(0).toUpperCase() + values.status.slice(1).toLowerCase()}
                </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={3}>
                <Text type="span">{values.description ? values.description : "n/a"}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Date Added" span={3}>
                <Text type="span">{new Intl.DateTimeFormat('en-US', {
                    timeZone: "Asia/Manila",
                    hourCycle: 'h24',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                }).format(new Date(values.created_at))}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Course" span={3}>
                <Text type="span">{courseOptions[values.course]}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Year Level" span={3}>{
                <Text type="span">{ordinalNumbers[values.year]}</Text>
            }</Descriptions.Item>
            <Descriptions.Item label="Term" span={3}>
                <Text type="span">{ordinalNumbers[values.term]}</Text>
            </Descriptions.Item>
        </Descriptions>
    )
}

export default StudentRegistrarFileDetails;