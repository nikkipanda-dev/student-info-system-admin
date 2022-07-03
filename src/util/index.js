import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faCircleNotch,
    faCircleInfo,
    faCircleCheck,
    faCircleExclamation,
    faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { message, } from "antd";
import Container from "../components/core/Container";
import Text from "../components/core/Text";
import Alert from "../components/widgets/Alert";
import { 
    fadeOut, 
    spinnerStyle,
    sectionStyle,
} from "../stitches.config";

export const Spinner = () => {
    return (
        <Container css={{padding: '$15',}}>
            <Container css={sectionStyle}>
                <Container css={{ ...spinnerStyle, animation: `${fadeOut} .2s ease-in-out .2s 1 normal forwards`, }}>
                    <FontAwesomeIcon icon={faCircleNotch} className="fa-spin fa-fw fa-3x" />
                </Container>
            </Container>
        </Container>
    )
}

export const getErrorMessage = message => {
    return <Text type="span" color="danger">{message}</Text>;
}

export const icons = {
    loading: {
        icon: faCircleNotch,
        color: "#E3E3E3",
    },
    info: {
        icon: faCircleInfo,
        color: "#E3E3E3",
    },
    success: {
        icon: faCircleCheck,
        color: "#178931",
    },
    warning: {
        icon: faCircleExclamation,
        color: "#f0ca57",
    },
    danger: {
        icon: faCircleXmark,
        color: "#DC3545",
    },
}

export const key = 'updatable';

export const getMessage = (values) => {
    if (!(values.status)) {
        console.error("Message component has no status");
        return;
    }

    if (!(icons[values.status])) {
        console.error("Message component's status is invalid.");
        return;
    }

    return message.open({
        content: (
            <Container className="d-flex align-items-center">
                <FontAwesomeIcon icon={icons[values.status].icon} className={`fa-fw fa-xl ${(values.status === "loading") && "fa-spin"}`} style={{ color: icons[values.status].color }} />
                <Text type="span" css={{ margin: '3px 0px 0px $5', }}>{values.content}</Text>
            </Container>
        ),
        key,
        duration: values.duration ?? 3,
    });
}

export const isProfileTab = value => {
    let isTab = false;

    if (value) {
        const patterns = [
            /\/student\/[^"]+?\/payments$/,
            /\/student\/[^"]+?\/cor$/,
            /\/student\/[^"]+?\/permits$/,
            /\/student\/[^"]+?\/registrar-files$/
        ];

        for (let i in patterns) {
            if (value.match(new RegExp(patterns[i]))) {
                isTab = true;
                break;
            }
        }
    }

    return isTab;
}

export const paymentModes = {
    bank_transfer_bdo: "Bank Transfer (BDO)",
    bank_transfer_security_bank: "Bank Transfer (Security Bank)",
    cash: "Cash",
    gcash: "GCash",
}

export const ordinalNumbers = {
    1: "1st",
    2: "2nd",
    3: "3rd",
    4: "4th",
}

export const paymentTypes = {
    full: "Full",
    installment: "Installment",
}

export const courseOptions = {
    bsit: "Bachelor of Science in Information Technology",
    bscs: "Bachelor of Science in Computer Science",
    bsis: "Bachelor of Science in Information Systems",
    bsba: "Bachelor of Science in Business Administration",
};

export const statusOptions = {
    pending: "Pending",
    verified: "Verified",
}

export const getAlertComponent = (
    header, 
    status, 
    message,
    css,
) => {
    return ( 
        <>
        {
            message && 
            <Alert
            status={status}
            header={header}
            css={{ margin: '$50 0px', ...css, }}>
                {message}
            </Alert>   
        }
        </>
    )
}

export const emitMessage = (content, status, duration) => {
    return getMessage({
        content: content,
        status: status,
        duration: duration,
    });
}

export const onDownload = (authUserSlug, studentSlug, value) => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}student/file/download/${authUserSlug}/${studentSlug}/${value}`;
}