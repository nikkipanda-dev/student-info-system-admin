import { NavLink, } from "react-router-dom"; 
import Container from "../../core/Container";
import { navStyle, } from "../../../stitches.config";

const styling = navStyle;

export const Sidebar = () => {
    const links = [
        {
            id: 0,
            label: "Dashboard",
            path: "/dashboard",
        },
        {
            id: 1,
            label: "Administrators",
            path: "/administrators",
        },
        {
            id: 2,
            label: "Students",
            path: "/students",
        },
    ]

    return (
        <Container className="d-flex flex-column" css={styling}>
        {
            (links && (Object.keys(links).length > 0)) && 
            Object.keys(links).map((i, val) => 
                <NavLink 
                key={Object.values(links)[val].id} 
                to={Object.values(links)[val].path}
                className={({ isActive }) =>
                    isActive ? 'activeLink' : undefined
                }>{Object.values(links)[val].label}</NavLink>
            )
        }
        </Container>
    )
}

export default Sidebar;