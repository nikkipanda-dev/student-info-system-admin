import { Link } from "react-router-dom"; 
import Container from "../../core/Container";

export const Sidebar = () => {
    const links = [
        {
            id: 0,
            label: "Dashboard",
            path: "/dashboard",
        },
        {
            id: 1,
            label: "Settings",
            path: "/settings",
        },
        {
            id: 2,
            label: "Administrators",
            path: "/administrators",
        },
        {
            id: 3,
            label: "Students",
            path: "/students",
        },
    ]

    return (
        <Container>
        {
            (links && (Object.keys(links).length > 0)) && 
            Object.keys(links).map((i, val) => 
                <Link key={Object.values(links)[val].id} to={Object.values(links)[val].path}>{Object.values(links)[val].label}</Link>
            )
        }
        </Container>
    )
}

export default Sidebar;