import { useLocation, Navigate, } from "react-router-dom"; 
import Container from "../../core/Container";

export const NotFound = ({isAuth,}) => {
    const location = useLocation();

    return (
        <>
        {
            (!(isAuth) && (location.pathname === "/admin")) ? 
            <Navigate to="/admin" /> : 
            (isAuth && (location.pathname === "/admin")) ? 
            <Navigate to="/dashboard" /> : 
            <Container>
                Not found
            </Container> 
        }
        </>
    )
}

export default NotFound;