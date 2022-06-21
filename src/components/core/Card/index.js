import Container from "../Container";

const styling = {
    background: '$gray1',
    borderRadius: '$default',
}

export const Card = ({
    children,
    className,
    css,
    header,
}) => {
    return (
        <Container className={className} css={{
            ...css,
            ...styling,
        }}>
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