import { useState, useEffect, } from "react";
import { emitMessage, } from "../../../util";
import { sectionStyle, } from "../../../stitches.config";

import Container from "../../core/Container";
import Section from "../../core/Section";
import Row from "../../core/Row";
import Column from "../../core/Column";
import Card from "../../core/Card";
import AuthUserSettings from "../../widgets/AuthUserSettings";

export const Settings = ({ 
    isAuth, 
    authUser,
    handleUser,
}) => {
    const [administrator, setAdministrator] = useState('');

    const handleAdministrator = payload => setAdministrator(payload);

    useEffect(() => {
        let loading = true;

        if (loading && isAuth && authUser && (Object.keys(authUser).length > 0)) {            
            handleAdministrator(authUser);
        }

        return () => {
            loading = false;
        }
    }, []);

    return (
        <Section css={sectionStyle}>
            <Container>
                <Row>
                    <Column className="col-12">
                        <Card header="Header">
                            <AuthUserSettings
                            slug={authUser.slug}
                            authUser={authUser}
                            values={administrator}
                            handleAdministrator={handleAdministrator}
                            emitMessage={emitMessage}
                            handleUser={handleUser} />
                        </Card>
                    </Column>
                </Row>
            </Container>
        </Section>
    )
}

export default Settings;