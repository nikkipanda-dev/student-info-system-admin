import { Descriptions, } from 'antd';
import { courseOptions, ordinalNumbers, } from '../../../util';

import Text from '../../core/Text';

export const StudentCorDetails = ({ values, }) => {
    return (
        <Descriptions bordered>
            <Descriptions.Item label="Type" span={3}>
                <Text type="span">{values.type.charAt(0).toUpperCase() + values.type.slice(1).toLowerCase()}</Text>
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

export default StudentCorDetails;