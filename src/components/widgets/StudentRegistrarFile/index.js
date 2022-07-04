import {
    ordinalNumbers,
    courseOptions,
    paymentModes,
} from '../../../util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, } from '@fortawesome/free-solid-svg-icons';
import { imagePreviewFileStyle, } from '../../../stitches.config';
import Container from "../../core/Container";

import Text from "../../core/Text";
import StudentRegistrarFileDetails from '../StudentRegistrarFileDetails';
import FilePreview from '../FilePreview';

const styling = {
    '> div': {
        margin: '$20',
    }
}

export const StudentRegistrarFile = ({
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
        console.error('Invalid course, term, and/or year.');
        return;
    }

    const onClick = slug => {
        onDownload(authUser.slug, student.slug, slug);
    }

    return (
        (values && (Object.keys(values).length > 0)) &&
        <Container {...className && { className: className }} css={{ ...styling, ...css }}>
            <Container>
                <StudentRegistrarFileDetails values={values} />
            </Container>
            <Container className="d-flex flex-column">
                <Container>
                    <FontAwesomeIcon
                    icon={faPaperclip}
                    className="fa-fw fa-lg"
                    style={{ color: '#00B4D8', }} />
                    <Text type="span" css={{ marginLeft: '$5', }}>
                        Uploaded files:
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
                    {...values.files && { values: { ...values.files } }}
                    css={{ marginTop: '$30', }} />
                </Container>
            </Container>
        </Container>
    )
}

export default StudentRegistrarFile;