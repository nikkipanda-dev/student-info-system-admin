import {
    useState,
    useEffect,
    useRef,
} from "react";
import {
    Form,
    Input,
    Radio,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faCircleXmark, } from "@fortawesome/free-solid-svg-icons";
import { getErrorMessage, getAlertComponent, } from "../../../util";
import { styled } from "../../../stitches.config";

import Container from '../../core/Container';
import Alert from '../Alert';
import Text from "../../core/Text";
import Button from "../../core/Button";
import NotFound from "../NotFound";
import Label from "../../core/Label";
import Image from "../../core/Image";

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

export const StudentPermitUpdate = ({
    form,
    onFinish,
    permits,
    handlePermits,
    emitMessage,
    resetForm,
    isAuth,
    student,
    slug,
    values,
    handleHideModal,
    authUser,
}) => {
    const ref = useRef('');

    const [permit, setPermit] = useState('');
    const [isFormShown, setIsFormShown] = useState(false);
    const [helpers, setHelpers] = useState('');
    const [file, setFile] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [alert, setAlert] = useState('');

    const handlePermit = payload => setPermit(payload);
    const handleToggleForm = () => setIsFormShown(!(isFormShown));
    const handleFile = value => setFile(value);
    const handleImageUrl = value => setImageUrl(value);
    const handleAlertComponent = payload => setAlert(payload);

    const handleHelpers = payload => setHelpers(payload);

    const typeOptions = [
        {
            id: 1,
            value: "prelim",
            label: "Prelim",
        },
        {
            id: 2,
            value: "midterm",
            label: "Midterm",
        },
        {
            id: 3,
            value: "final",
            label: "Final",
        },
    ];

    const onResetForm = () => {
        handleRemoveImage();
        handleAlertComponent(getAlertComponent(null, null, null));
        handleHideModal();
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

    const onUpdate = value => {
        if (!(isAuth)) {
            console.error('on store permit: not auth');
            return;
        }

        const storeForm = new FormData();

        for (let i in value) {
            value[i] && storeForm.append(i, value[i]);
        }

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

            handlePermits(Object.keys(permits).map((_, val) => {
                if (Object.values(permits)[val].slug === slug) {
                    return {
                        ...Object.values(permits)[val],
                        slug: response.data.data.details.slug,
                        path: response.data.data.details.path,
                    }
                }

                return Object.values(permits)[val];
            }));

            onResetForm();
            setTimeout(() => {
                emitMessage("Permit updated.", "success", 2.5);
            }, 2000);
        })

        .catch(err => {
            if (err.response && err.response.data.errors) {
                handleHelpers({
                    image: err.response.data.errors.image && getErrorMessage(err.response.data.errors.image[0]),
                    type: err.response.data.errors.type && getErrorMessage(err.response.data.errors.type[0]),
                });
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
            form.setFieldsValue({
                type: values.type,
            });
        }

        return () => {
            loading = false;
        }
    }, [values]);

    useEffect(() => {
        let loading = true;

        if (loading && (values && (Object.keys(values).length > 0))) {
            handlePermit(values);
        }

        return () => {
            loading = false;
        }
    }, []);

    return (
        <Container css={styling}>
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
                <Text type="span">Edit</Text>
            </Container> :
            <Container css={styling}>
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
                    <Text type="span" color="danger">{helpers && helpers.type}</Text>
                </Container>
            }

            {
                file &&
                <Container>
                    <Form
                    name="student-permit-form"
                    {...formItemLayout}
                    form={form}
                    onFinish={onUpdate}
                    autoComplete="off">

                    {
                        (typeOptions && (Object.keys(typeOptions).length > 0)) &&
                        <Form.Item
                        label="Type"
                        name="type"
                        {...helpers && helpers.type && { help: helpers.type }}
                        rules={[{
                            required: true,
                            message: "Type is required.",
                        }]}>
                            <Radio.Group>
                            {
                                Object.keys(typeOptions).map((_, val) => <Radio key={Object.values(typeOptions)[val].id} value={Object.values(typeOptions)[val].value}>{Object.values(typeOptions)[val].label}</Radio>)
                            }
                            </Radio.Group>
                        </Form.Item>
                    }

                        <Container className="d-flex">
                            <Button
                            submit
                            text="Submit"
                            color="blue"
                            className="flex-grow-1 flex-sm-grow-0" />
                        </Container>
                    </Form>
                </Container>
            }
            </Container>
        }
        </Container>
    )
}

export default StudentPermitUpdate;