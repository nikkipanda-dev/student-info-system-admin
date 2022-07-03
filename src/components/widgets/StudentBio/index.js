import Container from "../../core/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, } from "@fortawesome/free-solid-svg-icons";
import { ordinalNumbers, courseOptions, } from "../../../util";
import { 
    studentBioStyle, 
    anchorStyle,
    displayPhotoStyle,
} from "../../../stitches.config";

import Card from "../../core/Card";
import Text from "../../core/Text";
import Image from "../../core/Image";

const styling = anchorStyle;

export const StudentBio = ({
    values,
    className,
    css,
}) => {
    if (!(courseOptions[values.course])) {
        console.error('Invalid course.');
        return;
    }

    if (!(ordinalNumbers[values.term])) {
        console.error('Invalid term.');
        return;
    }

    return (
        <Card 
        className={'d-flex flex-column ' + (className ? (' ' + className) : '')} 
        css={css}
        background="white"
        radius="small">
            <Container css={{ ...studentBioStyle, ...styling }}>
            {
                values.display_photo ? <Image src={values.display_photo} css={displayPhotoStyle} /> : 
                <FontAwesomeIcon icon={faUser} className="fa-fw fa-10x" />
            }
                <Text type="span">{`${values.first_name} ${values.middle_name ?? ''} ${values.last_name}`}</Text>
                <Text 
                type="span" 
                as="a" 
                href={`mailto:${values.email}`}>
                    {`${values.email}`}
                </Text>
                <Text type="span">{`${courseOptions[values.course]}`}</Text>
                <Text type="span">{`${ordinalNumbers[values.year]} year, ${ordinalNumbers[values.term]} term`}</Text>
            </Container>
        </Card>
    )
}

export default StudentBio;