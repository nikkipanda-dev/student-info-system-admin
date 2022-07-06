import { useState, useEffect, } from "react";
import { getToken, } from "../../../util/auth";
import { request, } from "../../../util/request";
import { sectionStyle, } from "../../../stitches.config";

import Section from "../../core/Section";
import Container from "../../core/Container";
import Row from "../../core/Row";
import Column from "../../core/Column";
import TuitionFeeOverview from "../../widgets/TuitionFeeOverview";
import StudentsOverview from "../../widgets/StudentsOverview";
import AdminsOverview from "../../widgets/AdminsOverview";
import RecentActivites from "../../widgets/RecentActivities";

import Heading from "../../core/Heading";

export const Dashboard = ({ isAuth, authUser, }) => {
    const [users, setUsers] = useState([]);
    const [payments, setPayments] = useState([]);
    const [recentActivites, setRecentActivities] = useState([]);

    const handleUsers = payload => setUsers(payload);
    const handlePayments = payload => setPayments(payload);
    const handleRecentActivites = payload => setRecentActivities(payload);

    useEffect(() => {
        let loading = true;

        if (loading && isAuth && authUser && (Object.keys(authUser).length > 0)) {
            getUsers(authUser.email).then(response => {
                response.data.data.details && handleUsers(response.data.data.details);
            });

            getPayments(authUser.email).then(response => {
                response.data.data.details && handlePayments(response.data.data.details);
            });

            getRecentActivities(authUser.email).then(response => {
                response.data.data.details && handleRecentActivites(response.data.data.details);
            });
        }

        return () => {
            loading = false;
        }
    }, []);

    return (
        isAuth && authUser && (Object.keys(authUser).length > 0) &&
        <Section css={sectionStyle}>
            <Container>
                <Row css={{ 
                    '> div:nth-child(n+2)': {
                        marginTop: '$20', 
                    }
                }}>
                    <Column className="col-12 d-flex flex-column flex-md-row justify-content-center justify-content-md-between">
                        <Heading type={2} text={`Hi, ${authUser.first_name} 👋`} />
                        <Heading 
                        type={4} 
                        text={`${new Date().getFullYear()} Overview`}
                        color="info" />
                    </Column>
                    <Column className="col-12">
                        <TuitionFeeOverview values={payments} />
                    </Column>
                    <Column className="col-12">
                        <StudentsOverview values={users && (Object.keys(users).length > 0) && users.students} />
                    </Column>
                    <Column className="col-12 col-md-4">
                        <AdminsOverview values={users && (Object.keys(users).length > 0) && users.administrators} />
                    </Column>
                    <Column className="col-12 col-md-8">
                        <RecentActivites values={recentActivites} />
                    </Column>
                </Row>
            </Container>
        </Section>
    )
}

async function getUsers(email) {
    return request.get("users-count", {
        params: {
            auth_email: email,
        },
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function getPayments(email) {
    return request.get("payments-count", {
        params: {
            auth_email: email,
        },
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

async function getRecentActivities(email) {
    return request.get("recent-activities-count", {
        params: {
            auth_email: email,
        },
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        }
    });
}

export default Dashboard;