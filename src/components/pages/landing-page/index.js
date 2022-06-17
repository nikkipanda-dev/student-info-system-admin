import { request, } from "../../../util/request";
import Container from "../../core/Container";

import Login from "../../widgets/Login";

export const LandingPage = () => {
    const onStore = values => {
        login().then(response => {
            console.info('res ', response);
        })

        .catch(err => {
            console.error('err ', err);
        });
    }

    return (
        <Container>
            Landing page
            <Login onFinish={onStore}/>
        </Container>
    )
}

async function login() {
    return request.post("login");
}

export default LandingPage;