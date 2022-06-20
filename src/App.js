import { useState, useEffect, } from "react";
import { 
    Routes, 
    Route,
    Navigate,
} from "react-router-dom";
import "./App.css";
import { isAuthCookie, } from "./util/auth";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, } from "@fortawesome/free-solid-svg-icons";
import { globalStyles, spinnerStyle, } from "./stitches.config";

import Container from "./components/core/Container";
import Sidebar from "./components/widgets/Sidebar";
import Navbar from "./components/widgets/Navbar";
import LandingPage from "./components/pages/landing-page";
import Dashboard from "./components/pages/dashboard";
import Settings from "./components/pages/settings";
import Admins from "./components/pages/admins";
import Students from "./components/pages/students";
import NotFound from "./components/pages/not-found";

function App() {
    globalStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [forceRender, setForceRender] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [authUser, setAuthUser] = useState('');

    const handleForceRender = () => setForceRender(!(forceRender));
    const handleUser = authUser => setAuthUser(authUser);
    const handleLoggedIn = () => setIsAuth(true);
    const handleLoggedOut = () => setIsAuth(false);

    useEffect(() => {
        let loading = true;

        if (loading) {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);

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
    
    return (
        <>
        {
            isLoading ? 
            <Container css={{ ...spinnerStyle }}>
                <FontAwesomeIcon icon={faCircleNotch} className="fa-spin fa-fw fa-3x" />
            </Container> :
            <>
            {
                isAuth &&
                <>
                    <Sidebar />
                    <Navbar isAuth={isAuth} handleLoggedOut={handleLoggedOut} />
                </>
            }
                <Routes>
                    <Route path="/" element={<Navigate to={!(isAuth) ? "/admin" : "/dashboard"} />} />
                {
                    !(isAuth) &&
                    <>
                        <Route path="/admin" element={<LandingPage handleLoggedIn={handleLoggedIn} />} />
                        <Route path="/:slug" element={<NotFound isAuth={isAuth} />} />
                    </>
                }
                {
                    isAuth &&
                    <>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/administrators" element={<Admins />} />
                        <Route path="/students" element={<Students />} />
                        <Route path="/:slug" element={<NotFound isAuth={isAuth} />} />
                    </>
                }
                </Routes>            
            </>
        }
        </>
    );
}

export default App;
