import { getToken, } from "../../../util/auth";
import { request, } from "../../../util/request";

import SettingsNameForm from "../SettingsNameForm";
import SettingsEmailForm from "../SettingsEmailForm";
import SettingsPasswordForm from "../SettingsPasswordForm";

export const AdminSettings = ({
    slug,
    authUser,
    values,
    handleAdministrator,
    emitMessage,
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
            handleArrayObj={handleAdministrator} />
            <SettingsEmailForm
            authUser={authUser}
            values={values}
            onFinish={updateEmail}
            emitMessage={emitMessage}
            slug={slug}
            handleArrayObj={handleAdministrator} />
            <SettingsPasswordForm
            authUser={authUser}
            onFinish={updatePassword}
            emitMessage={emitMessage}
            slug={slug} />
        </>
    )
}

async function updateName(form) {
    return request.post("admin-name-update", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function updateEmail(form) {
    return request.post("admin-email-update", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function updatePassword(form) {
    return request.post("admin-password-update", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

export default AdminSettings;