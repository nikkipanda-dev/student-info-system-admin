import Container from "../../core/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, } from "@fortawesome/free-solid-svg-icons";
import { studentBioStyle, } from "../../../stitches.config";

import Card from "../../core/Card";
import Text from "../../core/Text";

export const StudentBio = ({
    className,
    css,
}) => {
    return (
        <Card 
        className={'d-flex flex-column ' + (className ? (' ' + className) : '')} 
        css={css}
        background="white"
        radius="small">
            <Container css={{...studentBioStyle}}>
                <FontAwesomeIcon icon={faUser} className="fa-fw fa-10x" />
                <Text type="span">Jane Doe</Text>
                <Text type="span">janedoe@email.com</Text>
                <Text type="span">Bachelor of Science in Information Technology</Text>
                <Text type="span">1st year, 1st term</Text>
            </Container>
        </Card>
    )
}

export default StudentBio;