import Container from "../../core/Container";
import { 
    Navigate,
    useParams, 
    useOutletContext,
} from "react-router-dom";
import { getToken, } from "../../../util/auth";
import { request, } from "../../../util/request";
import { getAuthEmail, } from "../../../util/auth";

import StudentPayments from "../StudentPayments";
import StudentCors from "../StudentCors";
import StudentPermits from "../StudentPermits";
import StudentRegistrarFiles from "../StudentRegistrarFiles";

export const StudentContent = ({
    className,
    css,
}) => {
    const params = useParams();
    const context = useOutletContext();

    return (
        (params.tab_slug === "payments") ? 
        <StudentPayments 
        storePayment={storePayment} 
        updatePayment={updatePayment}
        deletePayment={deletePayment}
        isAuth={context.isAuth} 
        emitMessage={context.emitMessage}
        student={context.student}
        getPayments={getPayments}
        slug={context.slug}
        authUser={context.authUser} /> :
        (params.tab_slug === "cor") ? <StudentCors /> :
        (params.tab_slug === "permits") ? <StudentPermits /> :
        (params.tab_slug === "registrar-files") ? <StudentRegistrarFiles /> : <Navigate to="/not-found" replace={true} />
    )
}

async function getPayments(slug) {
    return request.get("student-payments-get", {
        params: {
            auth_email: getAuthEmail(),
            slug: slug,
        },
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function storePayment(form) {
    return request.post("student-payments-store", form, {
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

export default StudentContent;