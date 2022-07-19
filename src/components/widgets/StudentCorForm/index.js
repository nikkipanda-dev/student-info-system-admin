import {
    useState,
    useEffect,
    useRef,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faCloudArrowUp, 
    faCircleXmark,
    faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { getAlertComponent, } from "../../../util";
import { 
    styled,
    containerFileStyle, 
    imagePreviewFileStyle,
} from "../../../stitches.config";

import Button from "../../core/Button";
import Image from "../../core/Image";
import Text from "../../core/Text";
import Container from "../../core/Container";
import Label from "../../core/Label";
import NotFound from "../NotFound";

const NativeInput = styled('input', {});

const styling = {
    '@media screen and (max-width: 575px)': {
        'button': {
            marginTop: '$10',
        }
    },
}

export const StudentCorForm = ({
    student,
    onFinish,
    emitMessage,
    isAuth,
    cors,
    handleCors,
    authUser,
    handleHideModal,
}) => {
    const ref = useRef('');

    const [file, setFile] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [alert, setAlert] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleFile = value => setFile(value);
    const handleImageUrl = value => setImageUrl(value);
    const handleIsSubmitted = () => setIsSubmitted(true);
    const handleAlertComponent = payload => setAlert(payload);
    let arr;

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

    const onStore = () => {
        handleIsSubmitted();

        if (!(isAuth)) {
            console.error('on store cor: not auth');
            return;
        }

        const storeForm = new FormData();

        storeForm.append("auth_email", authUser.email);
        storeForm.append("student_slug", student.slug);
        storeForm.append('image', file);

        emitMessage("Loading", "loading", 2);

        onFinish(storeForm).then(response => {
            if (!(response.data.is_success)) {
                handleAlertComponent(getAlertComponent("Error", "danger", response.data.data, { marginTop: '0', }));
                return;
            }

            arr = cors;
            (Object.values(arr).length > 0) && arr.push(response.data.data.details);
            if (Object.values(arr).length === 0) {
                arr = [response.data.data.details]
            }

            handleRemoveImage();
            handleCors(arr);
            handleHideModal();
            handleAlertComponent(getAlertComponent(null, null, null));
            setTimeout(() => {
                emitMessage("COR added.", "success", 2.5);
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

    return (
        <Container>
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
                css={{ margin: 'auto', }}
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
                css={{
                    marginTop: '$20',
                    width: '100%',
                }}>
                    <Button
                    submit
                    text={
                        isSubmitted ?
                        <>
                            <FontAwesomeIcon icon={faCircleNotch} className="fa-fw" />
                            <Text type="span" css={{ marginLeft: '$5', }}>Submitting</Text>
                        </> : "Submit"
                    }
                    color="blue"
                    className="flex-grow-1 flex-sm-grow-0"
                    onClick={() => onStore()}
                    {...isSubmitted && { disabled: isSubmitted }} />
                </Container>
            </>
        }
        </Container>
    )
}

export default StudentCorForm;