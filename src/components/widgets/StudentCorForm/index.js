import {
    useState,
    useEffect,
    useRef,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faCircleXmark, } from "@fortawesome/free-solid-svg-icons";
import { styled, } from "../../../stitches.config";

import Button from "../../core/Button";
import Image from "../../core/Image";
import Text from "../../core/Text";
import Alert from "../Alert";
import Container from "../../core/Container";
import Label from "../../core/Label";
import NotFound from "../NotFound";

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
    const [status, setStatus] = useState('');
    const [header, setHeader] = useState('');

    const handleFile = value => setFile(value);
    const handleImageUrl = value => setImageUrl(value);
    const handleAlert = message => setAlert(message);
    const handleStatus = status => setStatus(status);
    const handleHeader = header => setHeader(header);
    let arr;

    const paymentModes = [
        {
            id: 1,
            value: "bank_transfer_bdo",
            label: "Bank Transfer (BDO)",
            isDisabled: false,
        },
        {
            id: 2,
            value: "bank_transfer_security_bank",
            label: "Bank Transfer (Security Bank)",
            isDisabled: false,
        },
        {
            id: 3,
            value: "cash",
            label: "Cash",
            isDisabled: false,
        },
        {
            id: 4,
            value: "gcash",
            label: "GCash",
            isDisabled: false,
        },
    ];

    const termOptions = [
        {
            id: 1,
            value: "full",
            label: "Full",
        },
        {
            id: 2,
            value: "installment",
            label: "Installment",
        },
    ];

    const statusOptions = [
        {
            id: 1,
            value: "pending",
            label: "Pending",
        },
        {
            id: 2,
            value: "verified",
            label: "Verified",
        },
    ];

    const handleAlertComponent = (header, status, message) => {
        if (!(message)) {
            handleAlert('');
            return;
        }

        handleHeader(header);
        handleStatus(status);
        handleAlert(<Text type="span">{message}</Text>);
    }

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
                handleAlertComponent("Error", "danger", response.data.data);
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
            handleAlertComponent("", "", null);
            setTimeout(() => {
                emitMessage("COR added.", "success", 2.5);
            }, 2000);
        })

        .catch(err => {
            if (err.response && err.response.data.errors) {
                err.response.data.errors.image && handleAlertComponent("Error", "danger", err.response.data.errors.image[0]);
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
        <Container css={styling}>
            <Container>
            {
                alert &&
                <Alert status={status} header={header} css={{ margin: '0' }}>{alert}</Alert>
            }
            </Container>
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
            <Container>
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
                css={{ color: '$red2', }}
                onClick={() => handleRemoveImage()} />
                <Container className="d-flex">
                    <Button
                    submit
                    text="Submit"
                    color="blue"
                    className="flex-grow-1 flex-sm-grow-0"
                    onClick={() => onStore()} />
                </Container>
            </Container>
        }
        </Container>
    )
}

export default StudentCorForm;