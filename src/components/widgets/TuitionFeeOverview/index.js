import { paymentModes, } from "../../../util";
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

export const TuitionFeeOverview = ({ values, }) => {
    return (
        <Container className="d-flex flex-column" css={styling}>
            <Card>
            {
                ((values) && (Object.keys(values).length > 0) && values.students) ? 
                <Container className="d-flex flex-column">
                    <Heading
                    type={3}
                    text="Tuition Fees"
                    color="info" />
                    <Text type="span" color="info">
                    {
                        `${values.students.count} student${(values.students.count > 1) ? 's' : ''}`
                    } paid
                    </Text>
                    <Container className="d-flex flex-wrap" css={itemsStyling}>
                        <Container className="d-flex flex-column">
                            <Text type="span" size="large">Status</Text>
                            <Container>
                                <Text type="span">Pending:</Text>
                                <Text type="span" css={{ marginLeft: '$5', }}>{values.students.by_status_count.pending}</Text>
                            </Container>
                            <Container>
                                <Text type="span">Verified:</Text>
                                <Text type="span" css={{ marginLeft: '$5', }}>{values.students.by_status_count.verified}</Text>
                            </Container>
                        </Container>
                        <Container className="d-flex flex-column">
                            <Text type="span" size="large">Amount</Text>
                            <Container>
                                <Text type="span">Fully paid:</Text>
                                <Text type="span" css={{ marginLeft: '$5', }}>{values.students.by_amount_per_type_count.full}</Text>
                            </Container>
                            <Container>
                                <Text type="span">Installment:</Text>
                                <Text type="span" css={{ marginLeft: '$5', }}>{values.students.by_amount_per_type_count.installment}</Text>
                            </Container>
                        </Container>
                        <Container className="d-flex flex-column">
                            <Text type="span" size="large">Mode of Payment</Text>
                            {
                                (values.students && values.students.by_mode_of_payment_count && (Object.keys(values.students.by_mode_of_payment_count).length > 0)) && 
                                Object.keys(values.students.by_mode_of_payment_count).map((i, val) => 
                                    <Container key={i}>
                                        <Text type="span">{`${paymentModes[i]}:`}</Text>
                                        <Text type="span" css={{ marginLeft: '$5', }}>{Object.values(values.students.by_mode_of_payment_count)[val]}</Text>
                                    </Container>
                                )
                            }
                        </Container>
                        <Container className="d-flex flex-column">
                            <Text type="span" size="large">Payment Type</Text>
                            <Container>
                                <Text type="span">Fully paid:</Text>
                                <Text type="span" css={{ marginLeft: '$5', }}>{values.students.by_payment_type_count.full}</Text>
                            </Container>
                            <Container>
                                <Text type="span">Installment:</Text>
                                <Text type="span" css={{ marginLeft: '$5', }}>{values.students.by_payment_type_count.installment}</Text>
                            </Container>
                        </Container>
                    </Container>
                </Container> : <Text type="span">No data</Text>
            }
            </Card>
        </Container>
    )
}

export default TuitionFeeOverview;