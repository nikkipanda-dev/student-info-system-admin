import Container from "../Container"

export const index = ({
    children,
    css,
    className,
}) => {
    return (
        <Container className={className} css={{...css}}>
            {children}
        </Container>
    )
}
