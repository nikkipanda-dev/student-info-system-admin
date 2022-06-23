import { useState, useEffect, } from "react";
import { getAuthEmail, } from "../../../util/auth";
import Container from "../../core/Container";

import Card from "../../core/Card";
import Heading from "../../core/Heading";
import Button from "../../core/Button";

export const UserCard = ({ 
    values, 
    onUpdate,
    emitMessage,
}) => {
    console.info('val ', values);

    const [administrator, setAdministrator] = useState('');

    const handleAdministrator = payload => setAdministrator(payload);

    const onToggleAdminStatus = values => {
        const form = new FormData();
        form.append("auth_email", getAuthEmail());
        form.append("email", values.email);

        emitMessage("Loading", "loading", 2);

        onUpdate(form).then(response => {
            if (!(response.data.is_success)) {
                emitMessage(response.data.data, "danger", 2);
                return;
            }

            handleAdministrator({...administrator, is_admin: response.data.data.details});
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
        <Card background="white" radius="default">
            <Container>
                <Heading type={4} text={`${administrator.first_name} ${administrator.last_name}`} />
            </Container>
            <Container>
                <Button 
                submit 
                text={administrator.is_admin ? "Remove as admin" : "Make admin"}
                color={administrator.is_admin ? "red" : "green"}
                onClick={() => onToggleAdminStatus(values) } />
            </Container>
        </Card>
    )
}

export default UserCard;