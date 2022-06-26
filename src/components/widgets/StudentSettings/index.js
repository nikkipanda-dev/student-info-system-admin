import { useState, } from "react";
import { Form } from 'antd';
import { getToken, } from "../../../util/auth";
import { request, } from "../../../util/request";
import { getMessage, } from "../../../util";

import Text from "../../core/Text";
import Alert from "../Alert";
import StudentSettingsNameForm from "../StudentSettingsNameForm";
import StudentSettingsDisplayPhotoForm from "../StudentSettingsDisplayPhotoForm";
import StudentSettingsEmailForm from "../StudentSettingsEmailForm";
import StudentSettingsPasswordForm from "../StudentSettingsPasswordForm";

export const StudentSettings = ({ 
    slug, 
    authUser,
    values,
    handleStudent,
}) => {
    const [emailForm] = Form.useForm();
    
    const [alert, setAlert] = useState('');
    const [status, setStatus] = useState('');
    const [header, setHeader] = useState('');
    const [courseHelp, setCourseHelp] = useState('');
    const [yearHelp, setYearHelp] = useState('');
    const [termHelp, setTermHelp] = useState('');

    const handleAlert = message => setAlert(message);
    const handleStatus = status => setStatus(status);
    const handleHeader = header => setHeader(header);
    const handleCourseHelp = message => setCourseHelp(message);
    const handleYearHelp = message => setYearHelp(message);
    const handleTermHelp = message => setTermHelp(message);

    const resetForm = () => {
        emailForm.resetFields();
        handleHeader('');
        handleStatus('');
        handleAlert('');
        handleCourseHelp('');
        handleYearHelp('');
        handleTermHelp('');
    }

    const handleAlertComponent = (header, status, message) => {
        if (!(message)) {
            handleAlert('');
            return;
        }

        handleHeader(header);
        handleStatus(status);
        handleAlert(<Text type="span">{message}</Text>);
    }

    const emitMessage = (content, status, duration) => {
        return getMessage({
            content: content,
            status: status,
            duration: duration,
        });
    }

    return (
        (values && (Object.keys(values).length > 0)) && 
        <>
            <StudentSettingsNameForm
            authUser={authUser}
            values={values}
            onFinish={updateName}
            emitMessage={emitMessage}
            slug={slug}
            handleAlertComponent={handleAlertComponent}
            handleStudent={handleStudent}
            {...alert && {
                alert: <Alert
                    status={status}
                    header={header}
                    css={{ marginBottom: '$20', }}>
                    {alert}
                </Alert>
            }} />
            <StudentSettingsDisplayPhotoForm
            authUser={authUser}
            values={values}
            onFinish={updateDisplayPhoto}
            emitMessage={emitMessage}
            slug={slug}
            handleAlertComponent={handleAlertComponent}
            handleStudent={handleStudent}
            {...alert && {
                alert: <Alert
                    status={status}
                    header={header}
                    css={{ marginBottom: '$20', }}>
                    {alert}
                </Alert>
            }} />
            <StudentSettingsEmailForm
            authUser={authUser}
            values={values}
            onFinish={updateEmail}
            emitMessage={emitMessage}
            slug={slug}
            handleAlertComponent={handleAlertComponent}
            handleStudent={handleStudent}
            {...alert && {
                alert: <Alert
                    status={status}
                    header={header}
                    css={{ marginBottom: '$20', }}>
                    {alert}
                </Alert>
            }} />
            <StudentSettingsPasswordForm
            authUser={authUser}
            onFinish={updatePassword}
            emitMessage={emitMessage}
            slug={slug}
            handleAlertComponent={handleAlertComponent}
            handleStudent={handleStudent}
            {...alert && {
                alert: <Alert
                    status={status}
                    header={header}
                    css={{ marginBottom: '$20', }}>
                    {alert}
                </Alert>
            }} />
        </>

    )
}

async function updateName(form) {
    return request.post("student-name-update", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function updateEmail(form) {
    return request.post("student-email-update", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function updatePassword(form) {
    return request.post("student-password-update", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function updateDisplayPhoto(form) {
    return request.post("student-display-photo-update", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

export default StudentSettings;