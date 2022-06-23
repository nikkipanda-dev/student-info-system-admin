import { useState, useEffect, } from "react";
import { getToken, getAuthEmail, } from "../../../util/auth";
import { request, } from "../../../util/request";
import { useParams, useOutlet, Outlet, } from "react-router-dom";
import { sectionStyle, } from "../../../stitches.config";
import Container from "../../core/Container";

import Section from "../../core/Section";
import Row from "../../core/Row";
import Column from "../../core/Column";
import StudentBio from "../../widgets/StudentBio";
import StudentContent from "../../widgets/StudentContent";

export const Student = ({ isAuth, }) => {
    const params = useParams();

    const [student, setStudent] = useState('');

    const handleStudent = payload => setStudent(payload);

    useEffect(() => {
        let loading = true;

        if (loading && !(student) && params.slug) {
            getUser(params.slug).then(response => {
                console.info('res ', response);
                !(response.data.is_success) && handleStudent('');
                response.data.data.details && handleStudent(response.data.data.details);
            })

            .catch (err => {
                console.error('err ', err);
            });
        }

        return () => {
            loading = false;
        }
    }, []);

    return (
        isAuth && 
        <Section css={sectionStyle}>
            <Container>
                <Row>
                    <Column className="col-sm-4">
                        <StudentBio />
                    </Column>
                    <Column className="col-sm-8">
                        <Outlet />
                    </Column>
                </Row>
            </Container>
        </Section>
    )
}

async function getUser(slug) {
    return request.get("student", {
        params: {
            auth_email: getAuthEmail(),
            slug: slug,
        },
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

export default Student;