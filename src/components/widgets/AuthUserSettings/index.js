import { getToken, } from "../../../util/auth";
import { request, } from "../../../util/request";

import SettingsNameForm from "../SettingsNameForm";
import SettingsEmailForm from "../SettingsEmailForm";
import SettingsPasswordForm from "../SettingsPasswordForm";

export const AuthUserSettings = ({
    slug,
    authUser,
    values,
    handleAdministrator,
    emitMessage,
    handleUser,
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
            handleArrayObj={handleAdministrator}
            handleUser={handleUser} />
            <SettingsEmailForm
            authUser={authUser}
            values={values}
            onFinish={updateEmail}
            emitMessage={emitMessage}
            slug={slug}
            handleArrayObj={handleAdministrator}
            handleUser={handleUser} />
            <SettingsPasswordForm
            authUser={authUser}
            onFinish={updatePassword}
            emitMessage={emitMessage}
            slug={slug}
            handleUser={handleUser}
            authenticated />
        </>
    )
}

async function updateName(form) {
    return request.post("name-update", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function updateEmail(form) {
    return request.post("email-update", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function updatePassword(form) {
    return request.post("password-update", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

export default AuthUserSettings;