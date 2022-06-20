import Container from "../Container"

const Row = ({
    children,
    css,
    className,
}) => {
    return (
        <Container className={'row m-0' + (className ? (' ' + className) : '')} css={{...css}}>
            {children}
        </Container>
    )
}

export default Row;