import { useState, useEffect, } from "react";
import { getToken, } from "../../../util/auth";
import { request, } from "../../../util/request";
import { sectionStyle, } from "../../../stitches.config";

import Section from "../../core/Section";
import Container from "../../core/Container";
import Text from "../../core/Text";

export const Dashboard = () => {
    return (
        <Section css={sectionStyle}>
            <Container>
                hello
            </Container>
        </Section>
    )
}

async function getUsers(email) {
    return request.get("admins", {
        params: {
            auth_email: email,
        },
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

export default Dashboard;