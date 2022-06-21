import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, } from "@fortawesome/free-solid-svg-icons";
import Container from "../components/core/Container";
import { fadeOut, spinnerStyle, } from "../stitches.config";

export const Spinner = () => {
    return (
        <Container css={{ ...spinnerStyle, animation: `${fadeOut} .2s ease-in-out .5s 1 normal forwards`, }}>
            <FontAwesomeIcon icon={faCircleNotch} className="fa-spin fa-fw fa-3x" />
        </Container>
    )
}
