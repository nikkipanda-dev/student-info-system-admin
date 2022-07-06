import { 
    useState, 
    useEffect, 
    useRef,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faCircleXmark, } from "@fortawesome/free-solid-svg-icons";
import { getAlertComponent, } from "../../../util";
import { 
    styled,
    containerFileStyle,
    imagePreviewFileStyle,
} from "../../../stitches.config";

import Container from "../../core/Container";
import Label from "../../core/Label";
import Text from "../../core/Text";
import Image from "../../core/Image";
import NotFound from "../NotFound";
import Button from "../../core/Button";
import StudentCor from "../StudentCor";

const NativeInput = styled('input', {});

const styling = {
    'img': {
        width: '100%',
        height: 'auto',
        maxWidth: '400px',
        maxHeight: '400px',
        objectFit: 'cover',
    },
    '@media screen and (max-width: 575px)': {
        'button': {
            marginTop: '$10',
        }
    },
}

export const StudentCorUpdate = ({
    cors,
    onDownload,
    handleCors,
    onFinish,
    emitMessage,
    isAuth,
    student,
    slug,
    values,
    handleHideModal,
    authUser,
}) => {
    const ref = useRef('');

    const [cor, setCor] = useState('');
    const [isFormShown, setIsFormShown] = useState(false);
    const [file, setFile] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [alert, setAlert] = useState('');

    const handleCor = payload => setCor(payload);
    const handleToggleForm = () => setIsFormShown(!(isFormShown));
    const handleFile = value => setFile(value);
    const handleImageUrl = value => setImageUrl(value);
    const handleAlertComponent = payload => setAlert(payload);

    const handleRemoveImage = () => {
        handleFile('');
        handleImageUrl('');
    }

    const onInputChange = () => {
        if (!(ref.current)) {
            <NotFound name="Input" />
            return;
        }

        if (!(ref.current.files)) {
            <NotFound name="Input" />
            return;
        }

        handleFile(ref.current.files[0]);
    }

    const onUpdate = () => {
        if (!(isAuth)) {
            console.error('on update cor: not auth');
            return;
        }

        const storeForm = new FormData();

        storeForm.append("auth_email", authUser.email);
        storeForm.append("student_slug", student.slug);
        storeForm.append("slug", slug);
        storeForm.append('image', file);

        emitMessage("Loading", "loading", 2);

        onFinish(storeForm).then(response => {
            if (!(response.data.is_success)) {
                handleAlertComponent(getAlertComponent("Error", "danger", response.data.data, { marginTop: '0', }));
                return;
            }

            handleCors(Object.keys(cors).map((_, val) => {
                if (Object.values(cors)[val].slug === slug) {
                    return { 
                        ...Object.values(cors)[val], 
                        slug: response.data.data.details.slug,
                        file: response.data.data.details.file, 
                    }
                }

                return Object.values(cors)[val];
            }));

            handleRemoveImage();
            handleHideModal();
            handleAlertComponent(getAlertComponent(null, null, null));
            setTimeout(() => {
                emitMessage("COR updated.", "success", 2.5);
            }, 2000);
        })

        .catch(err => {
            if (err.response && err.response.data.errors) {
                err.response.data.errors.image && handleAlertComponent(getAlertComponent("Error", "danger", err.response.data.errors.image[0], { marginTop: '0', }));
            }
        });
    }

    useEffect(() => {
        let loading = true;

        if (loading && file) {
            handleImageUrl(URL.createObjectURL(file));
        }

        return () => {
            loading = false;
        }
    }, [file]);

    useEffect(() => {
        return () => {
            if (file) {
                URL.revokeObjectURL(file);
            }
        }
    }, [imageUrl]);

    useEffect(() => {
        let loading = true;

        if (loading && (values && (Object.keys(values).length > 0))) {
            handleCor(values);
        }

        return () => {
            loading = false;
        }
    }, []);

    return (
        <Container>
            <Container className="d-flex justify-content-sm-end align-items-sm-center">
                <Button
                text={isFormShown ? "Cancel" : "Update"}
                color={isFormShown ? '' : "yellow"}
                className="flex-grow-1 flex-sm-grow-0"
                onClick={() => handleToggleForm()} />
            </Container>
        {
            !(isFormShown) ? 
            <Container css={styling}>
                <StudentCor 
                values={cor}
                onDownload={onDownload}
                authUser={authUser}
                student={student} />
            </Container> :
            <Container css={{ marginTop: '$20', }}>
            {
                alert
            }       
            {
                !(file) &&
                <Container>
                    <NativeInput
                    type="file"
                    ref={ref}
                    id="image"
                    hidden
                    accept=".jpg,.jpeg,.png"
                    onChange={() => onInputChange()} />

                    <Label
                    htmlFor="image"
                    uploadSize="medium"
                    className="d-flex flex-column justify-content-center align-items-center upload">
                        <FontAwesomeIcon icon={faCloudArrowUp} className="fa-fw" />
                        <Text
                        type="span"
                        color="blue2"
                        css={{ fontSize: '$heading3' }}>
                            Upload
                        </Text>
                        <Text
                        type="span"
                        color="info"
                        css={{ marginTop: '$10', }}>
                            Supported formats: .jpg, .jpeg, .png
                        </Text>
                    </Label>
                </Container>
            }

            {/* Display preview */}
            {
                imageUrl &&
                <>
                    <Container
                    className="d-flex flex-column justify-content-center"
                    css={{
                        '> div': {
                            flex: 1,
                            ...containerFileStyle,
                        },
                        '> div > img': {
                            ...imagePreviewFileStyle,
                            width: '200px',
                            height: '200px',
                        },
                    }}>
                        <Container className="d-flex flex-column align-items-center">
                            <Image src={imageUrl} />
                            <Button
                            text={
                                <Container className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={faCircleXmark} className="fa-fw fa-2x" />
                                    <Text
                                    type="span"
                                    color="danger"
                                    css={{ display: 'inline-block', marginTop: '$5 ', }}>
                                        Remove
                                    </Text>
                                </Container>
                            }
                            color="transparent"
                            css={{ 
                                color: '$red2',
                                marginTop: '$5',
                            }}
                            onClick={() => handleRemoveImage()} />
                        </Container>
                    </Container>
                    <Container 
                    className="d-flex justify-content-sm-center align-items-sm-center"
                    css={{ marginTop: '$20', }}>
                        <Button
                        submit
                        text="Submit"
                        color="blue"
                        className="flex-grow-1 flex-sm-grow-0"
                        onClick={() => onUpdate()} />
                    </Container>
                </>
            }
            </Container>
        }
        </Container>
    )
}

export default StudentCorUpdate;