import { useState, useEffect, } from "react";
import { 
    Routes, 
    Route,
    useNavigate,
    useLocation,
} from "react-router-dom";
import "./App.css";
import { isAuthCookie, } from "./util/auth";
import Cookies from "js-cookie";
import { isProfileTab, } from "./util";
import { globalStyles, } from "./stitches.config";

import Container from "./components/core/Container";
import Main from "./components/core/Main";
import Sidebar from "./components/widgets/Sidebar";
import Navbar from "./components/widgets/Navbar";
import LandingPage from "./components/pages/landing-page";
import Dashboard from "./components/pages/dashboard";
import Settings from "./components/pages/settings";
import Admins from "./components/pages/admins";
import Students from "./components/pages/students";
import Student from "./components/pages/student";
import StudentContent from "./components/widgets/StudentContent";
import NotFound from "./components/pages/not-found";
import Row from "./components/core/Row";
import Column from "./components/core/Column";
import { Spinner } from "./util";

function App() {
    globalStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [isContentLoading, setIsContentLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const [authUser, setAuthUser] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleHideLoading = () => setIsContentLoading(false);
    const handleShowSpinner = () => setIsLoading(true);
    const handleHideSpinner = () => setIsLoading(false);
    const handleUser = authUser => setAuthUser(authUser);
    const handleLoggedIn = () => setIsAuth(true);
    const handleLoggedOut = () => setIsAuth(false);

    const handleNavigator = () => {
        (location.pathname === "/" || location.pathname === "/admin") && navigate("/dashboard", { replace: true });
    }

    // Handle state is no user cookies
    useEffect(() => {
        let loading = true;

        if (loading) {
            handleShowSpinner();

            if (!(isAuthCookie())) {
                !(isAuth) && navigate("/admin", { replace: true });
                handleLoggedOut();
                return;
            }

            handleLoggedIn();
            handleNavigator();
            handleUser(JSON.parse(Cookies.get('auth_admin')));
        }

        return () => {
            loading = false;
        }
    }, [isAuth]);

    // Show spinner
    useEffect(() => {
        let loading = true;

        if (loading && (!(isLoading))) {
            handleNavigator();
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
                handleHideLoading();
            }, 600);
        }

        return () => {
            loading = false;
        }
    }, [isLoading]);
    
    return (
        <>
        {
            !(isContentLoading) && 
            <Main>
                <Row>
                {
                    isAuth &&
                    <Column className="col-sm-3">
                        <Sidebar />
                    </Column>
                }
                    <Column className={isAuth ? "col-sm-9" : "col"}>
                    {
                        isAuth &&
                        <Navbar isAuth={isAuth} handleLoggedOut={handleLoggedOut} />
                    }
                    {
                        (isLoading && (location.pathname ? !(isProfileTab(location.pathname)) : null)) ?
                        <Spinner /> : 
                        <Container css={{ padding: '$15', }}>
                            {
                                !(isAuth) ?
                                    <Routes>
                                        <Route index element={<LandingPage handleLoggedIn={handleLoggedIn} isAuth={isAuth} />} />
                                        <Route path="/admin" element={<LandingPage handleLoggedIn={handleLoggedIn} isAuth={isAuth} />} />
                                    </Routes> : 
                                    <Routes>
                                        <Route path="/dashboard" element={<Dashboard isAuth={isAuth} />} />
                                        <Route path="/settings" element={<Settings 
                                        isAuth={isAuth} 
                                        authUser={authUser}
                                        handleUser={handleUser} />} />
                                        <Route path="/administrators" element={<Admins isAuth={isAuth} authUser={authUser} />} />
                                        <Route path="/students" element={<Students isAuth={isAuth} authUser={authUser} />} />
                                        <Route path="/student/:slug" element={<Student isAuth={isAuth} authUser={authUser} />}>
                                            <Route index element={<StudentContent isAuth={isAuth} />} />
                                            <Route path=":tab_slug" element={<StudentContent isAuth={isAuth} />} />
                                        </Route>
                                        <Route path="/:slug" element={<NotFound isAuth={isAuth} />} />
                                    </Routes>
                            }
                        </Container>
                    }
                    </Column>
                </Row>
            </Main>
            }
        </>
    );
}

export default App;
