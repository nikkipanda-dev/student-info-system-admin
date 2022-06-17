import Container from "../Container"

export const index = ({
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
