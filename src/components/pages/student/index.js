import { getToken, } from "../../../util/auth";
import { request, } from "../../../util/request";
import Container from "../../core/Container";

import Section from "../../core/Section";

export const Student = () => {
    return (
        <Section>
            Student
        </Section>
    )
}

async function getUser(email) {
    return request.get("student", {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

export default Student;