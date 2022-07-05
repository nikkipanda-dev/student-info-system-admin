import { NavLink, } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faHouse,
    faUserGroup,
    faGraduationCap,
    faBook,
} from "@fortawesome/free-solid-svg-icons";
import { navStyle, } from "../../../stitches.config";

import Container from "../../core/Container";
import Text from "../../core/Text";

const styling = navStyle;

export const Sidebar = ({ 
    isAuth, 
    authUser,
    className,
    css,
}) => {
    const links = [
        {
            id: 0,
            label: "Dashboard",
            path: "/dashboard",
            icon: faHouse,
        },
        {
            id: 1,
            label: "Administrators",
            path: "/administrators",
            icon: faUserGroup,
        },
        {
            id: 2,
            label: "Students",
            path: "/students",
            icon: faGraduationCap,
        },
        {
            id: 3,
            label: "User Logs",
            path: isAuth && authUser && (Object.keys(authUser).length > 0) && authUser.is_super_admin ? "/user-logs" : '',
            icon: faBook,
        },
    ];

    return (
        <Container 
        className={className} 
        css={{...styling, ...css}}>
        {
            (links && (Object.keys(links).length > 0)) && 
            Object.keys(links).map((_, val) => 
                Object.values(links)[val].path && <NavLink 
                key={Object.values(links)[val].id} 
                to={Object.values(links)[val].path}
                className={({ isActive }) =>
                    isActive ? 'activeLink' : undefined
                }>
                    <Container css={{ margin: '$5', }}>
                        <FontAwesomeIcon icon={Object.values(links)[val].icon} className="fa-fw fa-lg" />
                        <Text 
                        type="span" 
                        css={{ 
                            marginLeft: '$5',
                            color: 'inherit',
                        }}>{Object.values(links)[val].label}</Text>
                    </Container>
                </NavLink>
            )
        }
        </Container>
    )
}

export default Sidebar;