import { NavLink, } from "react-router-dom";
import Container from "../../core/Container";
import { navStyle, } from "../../../stitches.config";

const styling = {
    ...navStyle,
    'a': {
        color: '$gray4',
        fontSize: '$large',
    },
    'activeLink': {
        color: '$blue2',
    },
};

export const ProfileTabs = () => {
    const tabLinks = [
        {
            id: 0,
            label: "Payments",
            path: "payments",
        },
        {
            id: 1,
            label: "COR",
            path: "cor",
        },
        {
            id: 2,
            label: "Permits",
            path: "permits",
        },
        {
            id: 3,
            label: "Registrar Files",
            path: "registrar-files",
        },
    ];

    return (
        <Container className="d-flex" css={styling}>
        {
            (tabLinks && (Object.keys(tabLinks).length > 0)) &&
            Object.keys(tabLinks).map((i, val) =>
                <NavLink
                key={Object.values(tabLinks)[val].id}
                to={Object.values(tabLinks)[val].path}
                className={({ isActive }) =>
                    isActive ? 'activeLink' : undefined
                }>{Object.values(tabLinks)[val].label}</NavLink>
            )
        }
        </Container>
    )
}

export default ProfileTabs;