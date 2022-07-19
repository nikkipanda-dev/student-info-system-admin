import { itemsStyling, } from "../../../stitches.config";

import Container from "../../core/Container";
import Card from "../../core/Card";
import Heading from "../../core/Heading";
import Text from "../../core/Text";

const styling = {
    '> div': {
        background: '$white',
        borderRadius: '$small',
        padding: '$15',
    }
}

export const AdminsOverview = ({ values, }) => {
    return (
        <Container className="d-flex flex-column" css={styling}>
            <Card>
            {
                ((values) && (Object.keys(values).length > 0)) ? 
                <Container className="d-flex flex-column">
                    <Heading
                        type={3}
                        text="Administrators"
                        color="info" />
                    <Text 
                    type="span" 
                    as="b"
                    color="info">
                        {
                            `${values.count} administrator${(values.count > 1) ? 's' : ''}`
                        } in total
                    </Text>
                </Container> : <Text type="span">No data</Text>
            }
            </Card>
        </Container>
    )
}

export default AdminsOverview;