import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faUser,
    faLaptopCode,
    faCube,
    faCubes,
    faBug,
    faLaptopFile
} from "@fortawesome/free-solid-svg-icons";
import { sectionStyle, } from "../../../stitches.config";

import Row from "../../core/Row";
import Column from "../../core/Column";
import Section from "../../core/Section";
import Container from "../../core/Container";
import Heading from "../../core/Heading";
import Image from "../../core/Image";
import Text from "../../core/Text";

export const About = () => {
    const members = [
        {
            id: 1,
            name: "Reyes, Nicole",
            photo: "",
            icon: faLaptopCode,
            role:
                <Container>
                    <Text type="span">Web Developer</Text>
                    <Text type="span">Software Architect</Text>
                    <Text type="span">UX (User Experience) Designer</Text>
                </Container>,
        },
        {
            id: 2,
            name: "Cruz, Krysta Mhae",
            photo: "",
            icon: faLaptopFile,
            role:
                <Container>
                    <Text type="span">Lead Researcher</Text>
                    <Text type="span">Product Owner</Text>
                    <Text type="span">Lead QA Engineer</Text>
                </Container>,
        },
        {
            id: 3,
            name: "Cantago, Luisito",
            photo: "",
            icon: faCubes,
            role:
                <Container>
                    <Text type="span">UI (User Interface) Designer</Text>
                    <Text type="span">Researcher</Text>
                    <Text type="span">Lead Tester</Text>
                </Container>,
        },
        {
            id: 4,
            name: "Decena, Mary Joy",
            photo: "https://student-info-system.sfo3.digitaloceanspaces.com/display_photos/1657104881372.JPEG",
            icon: faCube,
            role:
                <Container>
                    <Text type="span">Researcher</Text>
                    <Text type="span">Assistant Tester</Text>
                    <Text type="span">Assistant QA Engineer</Text>
                </Container>,
        },
        {
            id: 5,
            name: "Arnaiz, Rosalie",
            photo: "",
            icon: faCube,
            role: 
            <Container>
                <Text type="span">Researcher</Text>
                <Text type="span">Assistant Tester</Text>
                <Text type="span">Assistant QA Engineer</Text>
            </Container>,
        },
        {
            id: 6,
            name: "Saavedra, Juan Paolo",
            photo: "",
            icon: faBug,
            role: 
            <Container>
                <Text type="span">Assistant QA Engineer</Text>
            </Container>,
        },
    ]
    
    return (
        <Section css={sectionStyle}>
            <Container>
                <Row css={{
                    '> div:nth-child(n+2)': {
                        marginTop: '$20',
                    }
                }}>
                    <Column className="col-12 d-flex flex-column flex-md-row justify-content-center justify-content-md-between">
                        <Heading type={2} text={`Hi 👋`} />
                        <Heading
                        type={4}
                        text="Group Members"
                        color="info" />
                    </Column>
                    <Column className="col-12" >
                        <Container
                        className="d-flex flex-column flex-lg-row flex-lg-wrap justify-content-lg-between"
                        css={{
                            '> div': {
                                flexGrow: 1,
                                flexBasis: '50%',
                            },
                        }}>
                        {
                            (members && (Object.keys(members).length > 0)) &&
                            Object.keys(members).map((_, val) =>
                                <Container 
                                key={Object.values(members)[val].id} 
                                css={{ padding: '$10', }}>
                                    <Container
                                    className="d-flex" 
                                    css={{
                                        background: '$white',
                                        borderRadius: '$small',
                                        padding: '$15',
                                        boxShadow: '$default',
                                        height: '100%',
                                    }}>
                                    {
                                        Object.values(members)[val].photo ?
                                        <Image 
                                        src={Object.values(members)[val].photo}
                                        css={{
                                            width: '150px',
                                            height: '150px',
                                            objectFit: 'cover',
                                            borderRadius: '$small',
                                        }} /> :
                                        <FontAwesomeIcon icon={faUser} className="fa-fw fa-9x" />
                                    }
                                        <Container 
                                        className="flex-grow-1 d-flex flex-column"
                                        css={{ paddingLeft: '$15', }}>
                                            <Container>
                                                <FontAwesomeIcon 
                                                icon={Object.values(members)[val].icon}
                                                className="fa-fw fa-2x"
                                                style={{
                                                    color: '#00B4D8',
                                                }} />
                                                <Text
                                                type="span"
                                                color="info"
                                                css={{
                                                    fontSize: '1.5rem',
                                                    marginLeft: '$5',
                                                }}>
                                                {Object.values(members)[val].name}
                                            </Text>
                                            </Container>
                                            <Container 
                                            css={{ 
                                                marginTop: '$10',
                                                '> div': { 
                                                    display: 'flex', 
                                                    flexFlow: 'column',
                                                },
                                                '> div span': {
                                                    fontSize: '1rem',
                                                }
                                            }}>
                                                {Object.values(members)[val].role}
                                            </Container>
                                        </Container>
                                    </Container>
                                </Container>
                            )
                        }
                        </Container>
                    </Column>
                </Row>
            </Container>
        </Section>
    )
}

export default About;