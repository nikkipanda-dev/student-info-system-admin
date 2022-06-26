import { 
    useState, 
    useEffect, 
    useRef,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faCircleXmark, } from "@fortawesome/free-solid-svg-icons";
import { styled } from "../../../stitches.config";

import Container from "../../core/Container";
import Label from "../../core/Label";
import Text from "../../core/Text";
import Image from "../../core/Image";
import NotFound from "../NotFound";
import Button from "../../core/Button";

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

const formItemLayout = {
    labelCol: {
        sm: { span: 9, },
        md: { span: 8, },
    },
    wrapperCol: {
        sm: { span: 24, },
        md: { span: 24, },
    },
}

const validateMessages = {
    required: '${label} is required.',
    types: {
        email: '${label} is not a valid email.',
    },
    string: {
        range: "${label} must be must be between ${min} and ${max} characters.",
    },
};

export const StudentCorUpdate = ({
    cors,
    handleCors,
    onFinish,
    emitMessage,
    isAuth,
    student,
    slug,
    handleAlertComponent,
    handleHideModal,
    alert,
    authUser,
}) => {
    const ref = useRef('');

    const [file, setFile] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleFile = value => setFile(value);
    const handleImageUrl = value => setImageUrl(value);

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
                handleAlertComponent("Error", "danger", response.data.data);
                return;
            }

            handleCors(Object.keys(cors).map((_, val) => {
                if (Object.values(cors)[val].slug === slug) {
                    return { 
                        ...Object.values(cors)[val], 
                        slug: response.data.data.details.slug,
                        path: response.data.data.details.path, 
                    }
                }

                return Object.values(cors)[val];
            }));

            handleRemoveImage();
            handleHideModal();
            handleAlertComponent("", "", null);
            setTimeout(() => {
                emitMessage("COR updated.", "success", 2.5);
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
                <Container>
                {
                    alert
                }
                </Container>
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
                    onClick={() => onUpdate()} />
                </Container>
            </Container>
        }
        </Container>
    )
}

export default StudentCorUpdate;