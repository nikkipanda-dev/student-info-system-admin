import { useState, useEffect, } from "react";
import { request, } from "../../../util/request";
import { getToken, } from "../../../util/auth";
import { Form, } from "antd";
import { emitMessage, } from "../../../util";
import Container from "../../core/Container";
import { sectionStyle, } from "../../../stitches.config";

import Section from "../../core/Section";
import Text from "../../core/Text";
import Heading from "../../core/Heading";
import UserLogsTable from "../../widgets/UserLogsTable";

export const UserLogs = ({ isAuth, authUser, }) => {
    const [userLogs, setUserLogs] = useState([]);

    const handleUserLogs = payload => setUserLogs(payload);

    useEffect(() => {
        let loading = true;

        if (loading && isAuth && (!(userLogs) || (Object.keys(userLogs).length === 0))) {
            getUserLogs(authUser.email).then(response => {
                console.info('res ', response.data);
                !(response.data.is_success) && handleUserLogs('');
                response.data.data.details && handleUserLogs(response.data.data.details);
            });
        }

        return () => {
            loading = false;
        }
    }, []);

    return (
        <Section css={sectionStyle}>
            <Heading
            type={2}
            text="User Logs"
            color="info" />
            <Container css={{ marginTop: '$30', }}>
            {
                (userLogs && (Object.keys(userLogs).length > 0)) ?
                <UserLogsTable values={userLogs} /> :
                <Text type="span">No data</Text>
            }
            </Container>
        </Section>
    )
}

async function getUserLogs(email) {
    return request.get("user-logs", {
        params: {
            auth_email: email,
        },
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

export default UserLogs;