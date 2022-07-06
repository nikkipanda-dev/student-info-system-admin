import { ordinalNumbers, courseOptions, } from '../../../util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, } from '@fortawesome/free-solid-svg-icons';
import { imagePreviewFileStyle, } from '../../../stitches.config';
import Container from "../../core/Container";

import Text from "../../core/Text";
import StudentCorDetails from "../StudentCorDetails";
import FilePreview from '../FilePreview';

const styling = {
    '> div': {
        margin: '$20',
    }
}

export const StudentPermit = ({
    values,
    onDownload,
    authUser,
    student,
    className,
    css,
}) => {
    if (!(values)) {
        return;
    }

    if (!(courseOptions[values.course]) || !(ordinalNumbers[values.term]) || !(ordinalNumbers[values.year])) {
        console.error('Invalid course, mode of payment, term and/or year.');
        return;
    }

    const onClick = slug => {
        onDownload(authUser.slug, student.slug, slug);
    }

    return (
        (values && (Object.keys(values).length > 0)) &&
        <Container {...className && { className: className }} css={{ ...styling, ...css }}>
            <Container>
                <StudentCorDetails values={values} />
            </Container>
            <Container className="d-flex flex-column">
                <Container>
                    <FontAwesomeIcon
                    icon={faPaperclip}
                    className="fa-fw fa-lg"
                    style={{ color: '#00B4D8', }} />
                    <Text type="span" css={{ marginLeft: '$5', }}>
                        Uploaded file:
                    </Text>
                </Container>
                <Container
                className="d-flex flex-column"
                css={{
                    'img': imagePreviewFileStyle,
                    'img:hover': {
                        cursor: 'pointer',
                    },
                }}>
                    <FilePreview
                    onClick={onClick}
                    {...values && values.file && { values: values.file }}
                    css={{ marginTop: '$30', }} />
                </Container>
            </Container>
        </Container>
    )
}

export default StudentPermit;