import { getToken, } from "../../../util/auth";
import { request, } from "../../../util/request";

import SettingsNameForm from "../SettingsNameForm";
import SettingsCourseForm from "../SettingsCourseForm";
import SettingsYearTermForm from "../SettingsYearTermForm";
import SettingsDisplayPhotoForm from "../SettingsDisplayPhotoForm";
import SettingsEmailForm from "../SettingsEmailForm";
import SettingsPasswordForm from "../SettingsPasswordForm";

export const StudentSettings = ({ 
    slug, 
    authUser,
    values,
    emitMessage,
    handleStudent,
}) => {
    return (
        (values && (Object.keys(values).length > 0)) && 
        <>
            <SettingsNameForm
            authUser={authUser}
            values={values}
            onFinish={updateName}
            emitMessage={emitMessage}
            slug={slug}
            handleArrayObj={handleStudent} />
            <SettingsCourseForm
            authUser={authUser}
            values={values}
            onFinish={updateCourse}
            emitMessage={emitMessage}
            slug={slug}
            handleArrayObj={handleStudent} />
            <SettingsYearTermForm
            authUser={authUser}
            values={values}
            onFinish={updateYearTerm}
            emitMessage={emitMessage}
            slug={slug}
            handleArrayObj={handleStudent} />
            <SettingsDisplayPhotoForm
            authUser={authUser}
            values={values}
            onFinish={updateDisplayPhoto}
            emitMessage={emitMessage}
            slug={slug}
            handleArrayObj={handleStudent} />
            <SettingsEmailForm
            authUser={authUser}
            values={values}
            onFinish={updateEmail}
            emitMessage={emitMessage}
            slug={slug}
            handleArrayObj={handleStudent} />
            <SettingsPasswordForm
            authUser={authUser}
            onFinish={updatePassword}
            emitMessage={emitMessage}
            slug={slug} />
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

async function updateCourse(form) {
    return request.post("student-course-update", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function updateYearTerm(form) {
    return request.post("student-year-term-update", form, {
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