import { Descriptions, } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCircleCheck, 
    faChartPie, 
    faClock,
} from '@fortawesome/free-solid-svg-icons';
import { paymentModes, courseOptions, ordinalNumbers, } from '../../../util';

import Text from '../../core/Text';

export const StudentPaymentDetails = ({ values, }) => {
    if (!(paymentModes[values.mode_of_payment])) {
        console.error("Invalid payment mode.");
        return;
    }

    return (
        <Descriptions bordered>
            <Descriptions.Item label="Status" span={3}>
                <FontAwesomeIcon
                icon={(values.status === 'verified') ? faCircleCheck : faClock}
                className="fa-fw fa-lg"
                style={{ color: (values.status === 'verified') ? '#00B4D8' : '#747474', }} />
                <Text type="span" css={{ marginLeft: '$5', }}>
                    {values.status.charAt(0).toUpperCase() + values.status.slice(1).toLowerCase()}
                </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Mode of Payment" span={3}>
                <Text type="span">{paymentModes[values.mode_of_payment]}</Text>
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
            {
                values.balance &&
                <Descriptions.Item label="Balance" span={3}>
                    <Text type="span">&#x20B1;&#xa0;{values.balance}</Text>
                </Descriptions.Item>
            }
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

export default  StudentPaymentDetails;