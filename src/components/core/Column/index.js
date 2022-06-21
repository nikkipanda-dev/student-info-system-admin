import Container from "../Container";

export const Column = ({
    children,
    className,
    css,
}) => {
    return (
        <Container className={className} css={{...css}}>
            {children}
        </Container>
    )
}

export default Column;