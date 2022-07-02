import Container from "../../core/Container";

import UserCard from "../UserCard";

export const UserCards = ({
    values,
    className,
    css,
    onUpdate,
    authUser,
    emitMessage,
    isModalVisible,
    handleModalContent,
}) => {
    return (
        (values && (Object.keys(values).length > 0)) && 
        <Container className={className} css={css}>
        {
            Object.keys(values).map((_, val) => <UserCard 
            key={Object.values(values)[val].email} 
            values={Object.values(values)[val]}
            onUpdate={onUpdate}
            authUser={authUser}
            emitMessage={emitMessage}
            isModalVisible={isModalVisible}
            handleModalContent={handleModalContent} />)
        }
        </Container>
    )
}

export default UserCards;