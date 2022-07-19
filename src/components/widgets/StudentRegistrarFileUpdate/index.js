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
import { getErrorMessage, getAlertComponent, } from "../../../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faCloudArrowUp, 
    faCircleXmark,
    faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { 
    styled,
    containerFileStyle,
    imagePreviewFileStyle,
} from "../../../stitches.config";

import Container from "../../core/Container";
import Label from "../../core/Label";
import Image from "../../core/Image";
import Text from "../../core/Text";
import Button from "../../core/Button";
import NotFound from "../NotFound";
import StudentRegistrarFile from "../StudentRegistrarFile";

const NativeInput = styled('input', {});

const styling = {
    '@media screen and (max-width: 575px)': {
        'button': {
            marginTop: '$10',
        }
    },
}

const formItemLayout = {
    labelCol: {
        sm: { span: 11, },
        md: { span: 10, },
    },
    wrapperCol: {
        sm: { span: 24, },
        md: { span: 24, },
    },
}

export const StudentRegistrarFileUpdate = ({
    form,
    onFinish,
    onDownload,
    registrarFiles,
    handleRegistrarFiles,
    emitMessage,
    isAuth,
    student,
    slug,
    values,
    handleHideModal,
    authUser,
}) => {
    const ref = useRef('');

    const [registrarFile, setRegistrarFile] = useState('');
    const [isFormShown, setIsFormShown] = useState(false);
    const [helpers, setHelpers] = useState('');
    const [files, setFiles] = useState('');
    const [imageUrls, setImageUrls] = useState('');
    const [alert, setAlert] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleRegistrarFile = payload => setRegistrarFile(payload); 
    const handleToggleForm = () => setIsFormShown(!(isFormShown));
    const handleFiles = value => setFiles(value);
    const handleImageUrls = value => setImageUrls(value);
    const handleIsSubmitted = () => setIsSubmitted(true);
    const handleAlertComponent = payload => setAlert(payload);

    const handleHelpers = payload => setHelpers(payload);

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

    const handleRemoveImage = value => {
        let target = Object.values(imageUrls).find(el => el.id === value);
        target && URL.revokeObjectURL(target.src);

        handleFiles(Object.values(files).filter(el => el.id !== value));
        handleImageUrls(Object.values(imageUrls).filter(el => el.id !== value));
    }

    const onResetForm = () => {
        handleAlertComponent(getAlertComponent(null, null, null));
        handleHideModal();
        handleFiles('');
        handleImageUrls('');
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

        let arr = [];
        let ctr = 0;

        for (let i of ref.current.files) {
            ++ctr;
            arr.push({
                details: i,
                id: ctr,
            })
        }

        console.info('arr ', arr);

        handleFiles(arr);
    }

    const onUpdate = values => {
        handleIsSubmitted();

        if (!(isAuth)) {
            console.error('on update registrar file: not auth');
            return;
        }

        const storeForm = new FormData();

        for (let i in values) {
            values[i] && storeForm.append(i, values[i]);
        }

        storeForm.append("auth_email", authUser.email);
        storeForm.append("student_slug", student.slug);
        storeForm.append("slug", registrarFile.slug);

        let ctr = 0;
        for (let i of files) {
            ++ctr;

            storeForm.append(`registrar_files[${ctr}]`, i.details);
        }

        emitMessage("Loading", "loading", 2);

        onFinish(storeForm).then(response => {
            if (!(response.data.is_success)) {
                handleAlertComponent(getAlertComponent("Error", "danger", response.data.data));
                return;
            }

            handleRegistrarFiles(Object.keys(registrarFiles).map((_, val) => {
                if (Object.values(registrarFiles)[val].slug === slug) {
                    return {
                        ...Object.values(registrarFiles)[val],
                        description: response.data.data.details.description,
                        status: response.data.data.details.status,
                        files: response.data.data.details.files,
                    }
                }

                return Object.values(registrarFiles)[val];
            }));

            handleRegistrarFile({
                ...registrarFile,
                description: response.data.data.details.description,
                status: response.data.data.details.status,
                files: response.data.data.details.files,
            });
            
            onResetForm(form);
            setTimeout(() => {
                emitMessage("Registrar file updated.", "success", 2.5);
            }, 2000);
        })

        .catch(err => {
            console.info('err ', err);
            if (err.response && err.response.data.errors) {
                handleHelpers({
                    registrar_files: err.response.data.errors.registrar_files && getErrorMessage(err.response.data.errors.registrar_files[0]),
                    description: err.response.data.errors.description && getErrorMessage(err.response.data.errors.description[0]),
                    status: err.response.data.errors.status && getErrorMessage(err.response.data.errors.status[0]),
                });
            }
        });
    }

    useEffect(() => {
        let loading = true;
        let arr = [];

        if (loading && (files && (Object.keys(files).length > 0))) {
            for (let i of files) {
                arr.push({
                    src: URL.createObjectURL(i.details),
                    id: i.id,
                })
            }

            handleImageUrls(arr);
        }

        return () => {
            loading = false;
        }
    }, [files]);

    useEffect(() => {
        return () => {
            if (imageUrls && (Object.keys(imageUrls).length > 0)) {
                for (let i of imageUrls) {
                    URL.revokeObjectURL(i.src);
                }
            }
        }
    }, [imageUrls]);

    useEffect(() => {
        let loading = true;

        if (loading && (values && (Object.keys(values).length > 0))) {
            form.setFieldsValue({
                description: values.description,
                status: values.status,
            });
        }

        return () => {
            loading = false;
        }
    }, [values]);

    useEffect(() => {
        let loading = true;
        
        if (loading && (values && (Object.keys(values).length > 0))) {
            handleRegistrarFile(values);
        }

        return () => {
            loading = false;
        }
    }, []);

    return (
        (registrarFile && (Object.keys(registrarFile).length > 0)) && 
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
                <StudentRegistrarFile
                values={registrarFile}
                onDownload={onDownload}
                authUser={authUser}
                student={student} />
            </Container> : 
            <Container css={{ marginTop: '$20', }}>
            {
                alert
            }
            {
                (!(files) || (Object.keys(files).length === 0)) &&
                <Container>
                    <NativeInput
                    type="file"
                    ref={ref}
                    id="registrar-file-images"
                    hidden
                    accept=".jpg,.jpeg,.png"
                    multiple
                    onChange={() => onInputChange()} />

                    <Label
                    htmlFor="registrar-file-images"
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
                <Container 
                className="d-flex flex-wrap justify-content-center justify-content-md-start align-items-center"
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
                {
                    (imageUrls && (Object.keys(imageUrls))) &&
                    Object.keys(imageUrls).map((i, val) => 
                    <Container
                    className="d-flex flex-column align-items-center" 
                    key={Object.values(imageUrls)[val].id}>
                        <Image src={Object.values(imageUrls)[val].src} />
                        <Button
                        text={
                            <Container className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faCircleXmark} className="fa-fw fa-2x" /><Text type="span" color="danger" css={{ display: 'inline-block', marginTop: '$5 ', }}>Remove</Text>
                            </Container>
                        }
                        color="transparent"
                        css={{ 
                            color: '$red2',
                            marginTop: '$5',
                        }}
                        onClick={() => handleRemoveImage(Object.values(imageUrls)[val].id)} />
                    </Container>)
                }
                    <Text type="span" color="danger">{helpers && helpers.registrar_files}</Text>
                </Container>

            {
                (registrarFile && (Object.keys(registrarFile).length > 0)) &&
                <Container
                css={{
                    ...styling, 
                    marginTop: '$50', 
                    padding: '$15',
                }}>
                    <Form
                    name="student-registrar-files-form"
                    {...formItemLayout}
                    form={form}
                    onFinish={onUpdate}
                    autoComplete="off">

                        <Form.Item
                        name="description"
                        {...helpers && helpers.description && { help: helpers.description }}
                        rules={[{
                            required: true,
                            message: "Description is required.",
                        }, {
                            type: 'string',
                            min: 2,
                            max: 500,
                            message: "Description must be must be at least 2 and not more than 500 characters.",
                        }]}>
                            <Input.TextArea
                            rows={4}
                            placeholder="Description"
                            maxLength={500} />
                        </Form.Item>

                    {
                        (statusOptions && (Object.keys(statusOptions).length > 0)) &&
                        <Form.Item
                            label="Status"
                            name="status"
                            {...helpers && helpers.status && { help: helpers.status }}
                            rules={[{
                                required: true,
                                message: "Status is required.",
                            }]}>
                            <Radio.Group>
                                {
                                    Object.keys(statusOptions).map((_, val) => <Radio key={Object.values(statusOptions)[val].id} value={Object.values(statusOptions)[val].value}>{Object.values(statusOptions)[val].label}</Radio>)
                                }
                            </Radio.Group>
                        </Form.Item>
                    }

                        <Container className="d-flex justify-content-sm-center align-items-sm-center">
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
                            {...isSubmitted && { disabled: isSubmitted }} />
                        </Container>
                    </Form>
                </Container>
            }   
            </Container>
        }
        </Container>
    )
}

export default StudentRegistrarFileUpdate;