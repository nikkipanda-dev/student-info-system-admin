import Container from "../../core/Container";
import { styled } from "../../../stitches.config";

const Wrapper = styled('div', {
    position: 'sticky',
    top: 0,
    background: 'blue',
});

export const Navbar = () => {
    return (
        <Container css={{
            position: 'sticky',
            top: 0,
        }}>
            <Wrapper>
                <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, molestias!
                </span>
                <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, molestias!
                </span>
            </Wrapper>
        </Container>
    )
}

export default Navbar;