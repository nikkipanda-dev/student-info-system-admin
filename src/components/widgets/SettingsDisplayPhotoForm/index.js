import { 
    useState, 
    useEffect, 
    useRef,
} from "react";
import Container from "../../core/Container";
import { getErrorMessage, getAlertComponent, } from "../../../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faCloudArrowUp, 
    faCircleXmark,
    faUser,
    faPen,
    faBan,
} from "@fortawesome/free-solid-svg-icons";
import { styled } from "../../../stitches.config";

import Button from "../../core/Button";
import Heading from "../../core/Heading";
import Text from "../../core/Text";
import Label from "../../core/Label";
import NotFound from "../NotFound";
import Image from "../../core/Image";

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

const Input = styled('input', {});

export const StudentSettingsDisplayPhotoForm = ({
    authUser,
    onFinish,
    values,
    slug,
    emitMessage,
    handleArrayObj,
}) => {
    const ref = useRef('');

    const [isVisible, setIsVisible] = useState(false);
    const [displayPhoto, setDisplayPhoto] = useState('');
    const [file, setFile] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageHelp, setImageHelp] = useState('');
    const [alert, setAlert] = useState('');

    const handleToggleForm = () => setIsVisible(!(isVisible));
    const handleDisplayPhoto = payload => setDisplayPhoto(payload);
    const handleFile = value => setFile(value);
    const handleImageUrl = value => setImageUrl(value);
    const handleImageHelp = message => setImageHelp(message);
    const handleAlertComponent = payload => setAlert(payload);

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

    const handleRemoveImage = () => {
        if (ref.current) {
            ref.current.value = '';
        }

        handleFile('');
        handleImageUrl('');
        handleAlertComponent(null, null, null);
        handleToggleForm();
    }

    const onUpdateDisplayPhoto = values => {
        if (!(file)) {
            console.error('No file to upload.');
            return;
        }

        const updateForm = new FormData();

        for (let i in values) {
            values[i] && updateForm.append(i, values[i]);
        }

        updateForm.append("auth_email", authUser.email);
        updateForm.append("slug", slug);
        updateForm.append("image", file);

        emitMessage("Loading", "loading", 2);

        onFinish(updateForm).then(response => {
            if (!(response.data.is_success)) {
                handleAlertComponent(getAlertComponent("Error", "danger", response.data.data));
                return;
            }

            console.info('url ', response.data.data.details);
            handleRemoveImage();
            handleDisplayPhoto(response.data.data.details);
            handleAlertComponent(getAlertComponent(null, null, null));
            handleToggleForm();
            setTimeout(() => {
                emitMessage("Display photo updated.", "success", 2.5);
            }, 2000);
        })

        .catch(err => {
            if (err.response && err.response.data.errors) {
                err.response.data.errors.email && handleImageHelp(getErrorMessage(err.response.data.errors.email[0]));
            }
        });
    }

    useEffect(() => {
        let loading = true;

        if (loading && (values && (Object.keys(values).length > 0))) {
            values.display_photo && handleDisplayPhoto(values.display_photo);
        }

        return () => {
            loading = false;
        }
    }, []);

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
            imageUrl && URL.revokeObjectURL(imageUrl);
        }
    }, [imageUrl]);

    useEffect(() => {
        let loading = true;

        if (loading && !(isVisible)) {
            if (ref.current) {
                ref.current.value = '';
            }

            handleFile('');
            handleImageUrl('');
            handleAlertComponent(null, null, null);
        }

        return () => {
            loading = false;
        }
    }, [isVisible]);

    useEffect(() => {
        let loading = true;

        if (loading && values && (Object.keys(values).length > 0) && displayPhoto) {
            handleArrayObj({
                ...values,
                display_photo: displayPhoto,
            });
        }

        return () => {
            loading = false;
        }
    }, [displayPhoto]);
    
    return (
        <Container css={styling}>
        {
            alert
        }
            <Container
            className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center"
            css={{ margin: '$30 0px $15', }}>
                <Heading type={4} text="Display Photo" />
                <Button
                text={
                    <>
                        <FontAwesomeIcon icon={isVisible ? faBan : faPen} className="fa-fw fa-md" />
                        <Text
                        type="span"
                        size="default"
                        css={{ marginLeft: '$5', }}>{isVisible ? "Cancel" : "Update"}</Text>
                    </> 
                }
                color={isVisible ? "" : "yellow"}
                className="flex-grow-1 flex-sm-grow-0"
                onClick={() => handleToggleForm()} />
            </Container>
        {
            !(isVisible) && 
            <Container css={{ marginBottom: '$15', textAlign: 'center', }}>
            {
                displayPhoto ? <Image src={displayPhoto} /> : 
                <FontAwesomeIcon icon={faUser} className="fa-fw fa-10x" />
            }
            </Container>
        }
        {
            isVisible && 
            <Container className="d-flex flex-column align-items-center">
                <Input
                type="file"
                ref={ref}
                id="display-photo"
                hidden
                accept=".jpg,.jpeg,.png"
                onChange={() => onInputChange()} />
            {
                !(imageUrl) &&
                <Label
                htmlFor="display-photo"
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
            }
            </Container>
        }
        {
            (imageUrl && isVisible) && 
            <>
                <Container className="d-flex flex-column align-items-center">
                    <Image src={imageUrl} />
                    <Button
                    text={
                        <Container className="d-flex align-items-center">
                            <FontAwesomeIcon icon={faCircleXmark} className="fa-fw fa-2x" /><Text type="span" color="danger" css={{ display: 'inline-block', marginTop: '$5 ', }}>Remove</Text>
                        </Container>
                    }
                    color="transparent"
                    css={{ color: '$red2', }}
                    onClick={() => handleRemoveImage()} />
                </Container>
                <Container 
                className="d-flex flex-column flex-sm-row justify-content-sm-center align-items-sm-center"
                css={{
                    marginTop: '$20',
                }}>
                    <Button
                    submit
                    text="Submit"
                    color="blue"
                    className="flex-grow-1 flex-sm-grow-0"
                    onClick={() => onUpdateDisplayPhoto()} />
                </Container>
            </>
        }
        </Container>
    )
}

export default StudentSettingsDisplayPhotoForm;