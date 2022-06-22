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