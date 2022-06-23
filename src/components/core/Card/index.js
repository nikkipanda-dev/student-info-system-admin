import Container from "../Container";

export const Card = ({
    children,
    className,
    css,
    header,
    background,
    radius,
}) => {
    return (
        <Container 
        className={className} 
        css={css}
        background={background}
        radius={radius}>
            <Container>
                {header}
            </Container>
            <Container>
                {children}
            </Container>
        </Container>
    )
}

export default Card;