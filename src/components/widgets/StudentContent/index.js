import Container from "../../core/Container";
import { 
    useLocation, 
    useParams, 
    useOutlet,
    Outlet,
} from "react-router-dom";
import { studentContentStyle, } from "../../../stitches.config";

import Card from "../../core/Card";
import Text from "../../core/Text";

export const StudentContent = ({
    className,
    css,
}) => {
    return (
        <Outlet />
    )
}

export default StudentContent;