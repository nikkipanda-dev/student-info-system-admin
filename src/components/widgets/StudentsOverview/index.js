import { 
    courseOptions, 
    ordinalNumbers,
    enrollmentCategories,
} from "../../../util";
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

export const StudentsOverview = ({ values, }) => {
    return (
        <Container className="d-flex flex-column" css={styling}>
            <Card>
            {
                ((values) && (Object.keys(values).length > 0)) ? 
                <Container className="d-flex flex-column">
                    <Heading
                    type={3}
                    text="Students"
                    color="info" />
                    <Text type="span" color="info">
                    {
                        `${values.count} student${(values.count > 1) ? 's' : ''}`
                    } in total
                    </Text>
                    <Container className="d-flex flex-wrap" css={itemsStyling}>
                        <Container className="d-flex flex-column">
                            <Text type="span" size="large">Course</Text>
                            {
                                (values && values.by_course_count && (Object.keys(values.by_course_count).length > 0)) &&
                                Object.keys(values.by_course_count).map((i, val) =>
                                    <Container key={i}>
                                        <Text type="span">{`${courseOptions[i]}:`}</Text>
                                        <Text type="span" css={{ marginLeft: '$5', }}>{Object.values(values.by_course_count)[val]}</Text>
                                    </Container>
                                )
                            }
                        </Container>
                        <Container className="d-flex flex-column">
                            <Text type="span" size="large">Year Level</Text>
                            <Container className="d-flex flex-column flex-lg-row" css={{ '> div': { flex: 1, } }}>
                                {
                                    (values && values.by_year_level_count && (Object.keys(values.by_year_level_count).length > 0)) &&
                                    Object.keys(values.by_year_level_count).map((i, val) =>
                                        <Container key={i}>
                                            <Container css={{ width: '70px', }}>
                                                <Text type="span">{`${ordinalNumbers[i]}:`}</Text>
                                            </Container>
                                            <Text type="span" css={{ marginLeft: '$5', }}>{Object.values(values.by_year_level_count)[val]}</Text>
                                        </Container>
                                    )
                                }
                            </Container>
                        </Container>
                    </Container>
                    <Container className="d-flex flex-wrap" css={itemsStyling}>
                        <Container className="d-flex flex-column">
                            <Text type="span" size="large">Enrollment Status</Text>
                            <Container className="d-flex flex-column flex-lg-row" css={{ '> div': { flex: 1, } }}>
                                {
                                    (values && values.by_enrollment_status_count && (Object.keys(values.by_enrollment_status_count).length > 0)) &&
                                    Object.keys(values.by_enrollment_status_count).map((i, val) =>
                                        <Container key={i}>
                                            <Container css={{ width: '70px', }}>
                                                <Text type="span">{`${enrollmentCategories[i]}:`}</Text>
                                            </Container>
                                            <Text type="span" css={{ marginLeft: '$5', }}>{Object.values(values.by_enrollment_status_count)[val]}</Text>
                                        </Container>
                                    )
                                }
                            </Container>
                        </Container>
                    </Container>
                </Container> : <Text type="span">No data</Text>
            }
            </Card>
        </Container>
    )
}

export default StudentsOverview;