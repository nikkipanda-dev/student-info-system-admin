import { useState, useEffect, } from "react";
import Container from "../../core/Container";
import { anchorStyle, } from "../../../stitches.config";

import Card from "../../core/Card";
import Heading from "../../core/Heading";
import Text from "../../core/Text";
import Button from "../../core/Button";
import AdminSettings from "../AdminSettings";

const styling = {
    // target card body
    '> div:nth-child(2)': {
        padding: '$10',
    },
    '@media screen and (max-width: 575px)': {
        'button': {
            marginBottom: '$10',
        }
    },
}

export const UserCard = ({ 
    values, 
    onUpdate,
    authUser,
    emitMessage,
    isModalVisible,
    handleModalContent,
}) => {
    const [administrator, setAdministrator] = useState('');

    const handleAdministrator = payload => setAdministrator(payload);

    const onToggleAdminStatus = values => {
        const form = new FormData();
        form.append("auth_email", authUser.email);
        form.append("email", values.email);

        emitMessage("Loading", "loading", 1.5);

        onUpdate(form).then(response => {
            if (!(response.data.is_success)) {
                emitMessage(response.data.data, "danger", 2);
                return;
            }

            handleAdministrator({ ...administrator, is_admin: response.data.data.details });
            setTimeout(() => {
                emitMessage("Updated administrator status.", "success", 2.5);
            }, 2000);
        });
    }

    useEffect(() => {
        let loading = true;

        if (loading && values && (Object.keys(values).length > 0)) {
            handleAdministrator(values);
        }

        return () => {
            loading = false;
        }
    }, []);

    return (
        (administrator && (Object.keys(administrator).length > 0)) && 
        <Card 
        background="white" 
        radius="default"
        css={{...anchorStyle, ...styling}}>
            <Container>
                <Heading 
                type={4} 
                text={`${administrator.first_name.charAt(0).toUpperCase() + administrator.first_name.slice(1).toLowerCase()} ${administrator.middle_name ? (administrator.middle_name.charAt(0).toUpperCase() + administrator.middle_name.slice(1).toLowerCase()) : ''} ${administrator.last_name.charAt(0).toUpperCase() + administrator.last_name.slice(1).toLowerCase() }`} />
            </Container>
            <Container>
                <Text
                type="span"
                as="a"
                href={`mailto:${administrator.email}`}>
                    {`${administrator.email.toLowerCase()}`}
                </Text>
            </Container>
            <Container 
            className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center" 
            css={{ marginTop: '$10', }}>
                <Button 
                submit 
                className="flex-grow-1 button-sm"
                text={administrator.is_admin ? "Remove as admin" : "Make admin"}
                color={administrator.is_admin ? "red" : "green"}
                onClick={() => onToggleAdminStatus(administrator) } />
            {
                !(isModalVisible) &&
                <Button
                text={isModalVisible ? "Cancel" : "Update"}
                color="yellow"
                className="flex-grow-1 button-sm"
                onClick={() => handleModalContent(
                    <AdminSettings
                    values={administrator}
                    authUser={authUser}
                    slug={administrator.slug}
                    emitMessage={emitMessage}
                    handleAdministrator={handleAdministrator} />, "Update Settings"
                )}
                css={{
                    marginLeft: '$10',
                    '@media screen and (max-width: 575px)': {
                        marginLeft: '0',
                    },
                }} />
            }
            </Container>
        </Card>
    )
}

export default UserCard;