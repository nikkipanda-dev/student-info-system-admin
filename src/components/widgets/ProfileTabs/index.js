import { NavLink, } from "react-router-dom";
import Container from "../../core/Container";
import { navStyle, } from "../../../stitches.config";

const styling = {
    ...navStyle,
    'a': {
        transition: '$default',
        color: '$gray4',
        fontSize: '$large',
        padding: '$15',
        background: '$gray2',
        borderBottom: '1px solid $gray3',
    },
    '.activeLink': {
        color: '$blue2',
        background: '$white',
        borderWidth: '1px 1px 0px',
        borderStyle: 'solid solid none',
        borderColor: '$blue2',
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
        <Container className="d-flex flex-column flex-md-row" css={styling}>
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