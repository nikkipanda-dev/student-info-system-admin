import { useState, useEffect, } from "react";
import { 
    Routes, 
    Route,
    Navigate,
    useNavigate,
    useLocation,
} from "react-router-dom";
import "./App.css";
import { isAuthCookie, } from "./util/auth";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, } from "@fortawesome/free-solid-svg-icons";
import { 
    globalStyles, 
    spinnerStyle,
    fadeOut,
} from "./stitches.config";

import Container from "./components/core/Container";
import Main from "./components/core/Main";
import Sidebar from "./components/widgets/Sidebar";
import Navbar from "./components/widgets/Navbar";
import LandingPage from "./components/pages/landing-page";
import Dashboard from "./components/pages/dashboard";
import Settings from "./components/pages/settings";
import Admins from "./components/pages/admins";
import Students from "./components/pages/students";
import NotFound from "./components/pages/not-found";
import Row from "./components/core/Row";
import Column from "./components/core/Column";
import { Spinner } from "./util";

function App() {
    globalStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [forceRender, setForceRender] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [authUser, setAuthUser] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleShowSpinner = () => setIsLoading(true);
    const handleHideSpinner = () => setIsLoading(false);
    const handleForceRender = () => setForceRender(!(forceRender));
    const handleUser = authUser => setAuthUser(authUser);
    const handleLoggedIn = () => setIsAuth(true);
    const handleLoggedOut = () => setIsAuth(false);

    // Handle state is no user cookies
    useEffect(() => {
        let loading = true;

        if (loading) {
            handleShowSpinner();

            if (!(isAuthCookie())) {
                handleLoggedOut();
                return;
            }

            handleLoggedIn();
            handleUser(JSON.parse(Cookies.get('auth_admin')));
        }

        return () => {
            loading = false;
        }
    }, []);

    // Show spinner
    useEffect(() => {
        let loading = true;

        if (loading && (!(isLoading))) {
            handleShowSpinner();
        }

        return () => {
            loading = false;
        }
    }, [location.pathname]);

    // Hide spinner
    useEffect(() => {
        let loading = true;

        if (loading && isLoading) {
            setTimeout(() => {
                handleHideSpinner();
            }, 700);
        }

        return () => {
            loading = false;
        }
    }, [isLoading]);

    useEffect(() => {
        let loading = true;

        if (loading) {
            // Redirect catch all slug if user is unauthenticated
            !(isAuth) && ((location.pathname === "/") || location.pathname[1]) && navigate("/admin", { replace: true });

            // Redirect authenticated user to dashboard if pathname is root or /admin 
            isAuth && ((location.pathname === "/") || location.pathname === "/admin") && navigate("/dashboard", { replace: true });
        }

        return () => {
            loading = false;
        }
    }, [isAuth]);
    
    return (
        <>
        {
            isLoading ?
            <Spinner /> :
            <Main>
                <Row>
                {
                    isAuth &&
                    <Column className="col">
                        <Sidebar />
                    </Column>
                }
                    <Column className="col">
                    {
                        isAuth &&
                        <Navbar isAuth={isAuth} handleLoggedOut={handleLoggedOut} handleShowSpinner={handleShowSpinner} />
                    }
                    </Column>
                </Row>
                <Routes>
                    <Route path="/admin" element={<LandingPage handleLoggedIn={handleLoggedIn} isAuth={isAuth} />} />
                    <Route path="/:slug" element={<NotFound isAuth={isAuth} />} />
                    <Route path="/dashboard" element={<Dashboard isAuth={isAuth} />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/administrators" element={<Admins />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/:slug" element={<NotFound isAuth={isAuth} />} />
                </Routes>
            </Main>
            }
        </>
    );
}

export default App;
