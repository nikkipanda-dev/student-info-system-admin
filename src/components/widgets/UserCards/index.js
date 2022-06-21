import Container from "../../core/Container";

import UserCard from "../UserCard";

export const UserCards = ({
    values,
    className,
    css,
    onUpdate,
    emitMessage,
}) => {
    console.info(values);

    return (
        <Container className={className} css={css}>
        {
            Object.keys(values).map((_, val) => <UserCard 
            key={Object.values(values)[val].email} 
            values={Object.values(values)[val]}
            onUpdate={onUpdate}
            emitMessage={emitMessage} />)
        }
        </Container>
    )
}

export default UserCards;