import Container from "../../core/Container";
import { studentContentStyle, } from "../../../stitches.config";

import Card from "../../core/Card";
import Text from "../../core/Text";

export const StudentContent = ({
    className,
    css,
}) => {
    return (
        <Card
        className={'d-flex flex-column ' + (className ? (' ' + className) : '')}
        css={css}
        background="white"
        radius="small">
            <Container css={studentContentStyle}>
                INSERT TABS HERE
            </Container>
        </Card>
    )
}

export default StudentContent;