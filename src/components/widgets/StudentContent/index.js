import { 
    Navigate,
    useParams, 
    useOutletContext,
} from "react-router-dom";
import { getToken, } from "../../../util/auth";
import { request, } from "../../../util/request";

import StudentPayments from "../StudentPayments";
import StudentCors from "../StudentCors";
import StudentPermits from "../StudentPermits";
import StudentRegistrarFiles from "../StudentRegistrarFiles";

export const StudentContent = () => {
    const params = useParams();
    const context = useOutletContext();

    return (
        (params.tab_slug === "payments") ? 
        <StudentPayments 
        getPayments={getPayments}
        storePayment={storePayment} 
        updatePayment={updatePayment}
        deletePayment={deletePayment}
        isAuth={context.isAuth} 
        emitMessage={context.emitMessage}
        student={context.student}
        slug={context.slug}
        authUser={context.authUser} /> :
        (params.tab_slug === "cor") ? 
        <StudentCors
        getCors={getCors}
        storeCor={storeCor}
        updateCor={updateCor}
        deleteCor={deleteCor}
        isAuth={context.isAuth}
        emitMessage={context.emitMessage}
        student={context.student}
        slug={context.slug}
        authUser={context.authUser} /> :
        (params.tab_slug === "permits") ? 
        <StudentPermits 
        getPermits={getPermits}
        storePermit={storePermit}
        updatePermit={updatePermit}
        deletePermit={deletePermit}
        isAuth={context.isAuth}
        emitMessage={context.emitMessage}
        student={context.student}
        slug={context.slug}
        authUser={context.authUser} /> :
        (params.tab_slug === "registrar-files") ? 
        <StudentRegistrarFiles 
        getRegistrarFiles={getRegistrarFiles}
        storeRegistrarFile={storeRegistrarFile}
        updateRegistrarFile={updateRegistrarFile}
        deleteRegistrarFile={deleteRegistrarFile}
        isAuth={context.isAuth}
        emitMessage={context.emitMessage}
        student={context.student}
        slug={context.slug}
        authUser={context.authUser} /> : <Navigate to="/not-found" replace={true} />
    )
}

async function getPayments(email, slug) {
    return request.get("student-payments-get", {
        params: {
            auth_email: email,
            slug: slug,
        },
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function storePayment(form) {
    return request.post("student-payment-store", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function updatePayment(form) {
    return request.post("student-payment-update", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function deletePayment(form) {
    return request.post("student-payment-destroy", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function getCors(email, slug) {
    return request.get("student-cors-get", {
        params: {
            auth_email: email,
            slug: slug,
        },
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function storeCor(form) {
    return request.post("student-cor-store", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function updateCor(form) {
    return request.post("student-cor-update", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function deleteCor(form) {
    return request.post("student-cor-destroy", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function getPermits(email, slug) {
    return request.get("student-permits-get", {
        params: {
            auth_email: email,
            slug: slug,
        },
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function storePermit(form) {
    return request.post("student-permit-store", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function updatePermit(form) {
    return request.post("student-permit-update", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function deletePermit(form) {
    return request.post("student-permit-destroy", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function getRegistrarFiles(email, slug) {
    return request.get("student-registrar-files-get", {
        params: {
            auth_email: email,
            slug: slug,
        },
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function storeRegistrarFile(form) {
    return request.post("student-registrar-file-store", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function updateRegistrarFile(form) {
    return request.post("student-registrar-file-update", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function deleteRegistrarFile(form) {
    return request.post("student-registrar-file-destroy", form, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

export default StudentContent;