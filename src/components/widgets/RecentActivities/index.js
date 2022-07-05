import { Timeline } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, } from '@fortawesome/free-solid-svg-icons';

import Container from "../../core/Container";
import Card from '../../core/Card';
import Heading from "../../core/Heading";
import Text from "../../core/Text";

const styling = {
    '> div': {
        background: '$white',
        borderRadius: '$small',
        padding: '$15',
    }
}

export const RecentActivities = ({ values, }) => {
    return (
        <Container className="d-flex flex-column" css={styling}>
            <Card>
            {
                ((values) && (Object.keys(values).length > 0)) ? 
                <Container className="d-flex flex-column">
                    <Heading
                        type={3}
                        text="Recent Activities"
                        color="info" />
                    <Timeline style={{ marginTop: '20px', }}>
                    {
                        values &&
                        Object.keys(values).map((_, val) =>
                            <Timeline.Item key={val} dot={<FontAwesomeIcon icon={faCircle} className="fa-fw fa-2xs" style={{ color: '#00B4D8', }}/>}>
                                <Container className="d-flex flex-column">
                                    <Text type="span">{Object.values(values)[val].description}</Text>
                                    <Text type="span" color="info">{Object.values(values)[val].created_at}</Text>
                                </Container>
                            </Timeline.Item>
                        )
                    }
                    </Timeline>
                </Container> : <Text type="span">No data</Text>
            }

            </Card>
        </Container>
    )
}

export default RecentActivities;