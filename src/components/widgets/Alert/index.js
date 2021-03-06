import { styled } from "../../../stitches.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons, } from "../../../util";
import Container from "../../core/Container";

import NotFound from "../NotFound";
import Heading from "../../core/Heading";

const Wrapper = styled('div', {
    borderRadius: '$small',
    margin: '$10',
    variants: {
        status: {
            success: {
                background: '$green1',
            },
            warning: {
                background: '$yellow1',
            },
            danger: {
                background: '$red1',
            },
            info: {
                background: '$gray1',
            },
        },
    },
});

export const Alert = ({
    className,
    css,
    status,
    children,
    header,
}) => {
    if (!(status)) {
        return <NotFound name="Alert status" />;
    }

    const headerIcon = icons[status];

    if (!(headerIcon)) {
        return <NotFound name="Alert icon" />;
    }

    return (
        <Wrapper 
        {...className && {className: className}}
        status={status}
        css={{
            ...css,
            padding: '$10',
        }}>
            <Container className="d-flex flex-wrap align-items-center">
                <FontAwesomeIcon icon={headerIcon.icon} className="fa-fw fa-xl" style={{ color: headerIcon.color }} />
                <Heading 
                type={4} 
                text={header}
                css={{ margin: '1px 0px 0px 3px', }} />
            </Container>
            <Container css={{ marginTop: '$10', }}>
                {children}
            </Container>
        </Wrapper>
    )
}

export default Alert;