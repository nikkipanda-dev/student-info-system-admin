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
import StudentPaymentDetails from '../StudentPaymentDetails';
import FilePreview from '../FilePreview';

const styling = {
    '> div' :{
        margin: '$20',
    }
}

export const StudentPayment = ({ 
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

    if (!(courseOptions[values.course]) || !(paymentModes[values.mode_of_payment]) || !(ordinalNumbers[values.term]) || !(ordinalNumbers[values.year])) {
        console.error('Invalid course, mode of payment, term and/or year.');
        return;
    }

    const onClick = slug => {
        onDownload(authUser.slug, student.slug, slug);
    }

    return (
        (values && (Object.keys(values).length > 0)) && 
        <Container {...className && {className: className}} css={{...styling, ...css}}>
            <Container>
                <StudentPaymentDetails values={values} />
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
                    {...values.files && {values: {...values.files}}}
                    css={{ marginTop: '$30', }} />
                </Container>
            </Container>
        </Container>
    )
}

export default StudentPayment;