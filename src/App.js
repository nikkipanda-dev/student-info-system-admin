import { 
    useState, 
    useEffect,
    useLayoutEffect,
} from "react";
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
import UserLogs from "./components/pages/user-logs";
import NotFound from "./components/pages/not-found";
import Row from "./components/core/Row";
import Column from "./components/core/Column";
import { Spinner } from "./util";

function App() {
    globalStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [isMobileView, setIsMobileView] = useState(false);
    const [isContentLoading, setIsContentLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const [authUser, setAuthUser] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const width = 1000;

    const handleHideLoading = () => setIsContentLoading(false);
    const handleIsMobileView = isMobileView => setIsMobileView(isMobileView);
    const handleShowSpinner = () => setIsLoading(true);
    const handleHideSpinner = () => setIsLoading(false);
    const handleUser = authUser => setAuthUser(authUser);
    const handleLoggedIn = () => setIsAuth(true);
    const handleLoggedOut = () => setIsAuth(false);

    const handleNavigator = () => {
        (location.pathname === "/" || location.pathname === "/admin") && navigate("/dashboard", { replace: true });
        
        if (isAuth && authUser && (Object.keys(authUser).length > 0) && !(authUser.is_super_admin)) {
            (location.pathname === "/user-logs") && navigate("/dashboard", { replace: true });
            (location.pathname === "/administrators") && navigate("/dashboard", { replace: true });
        }
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

        (window.innerWidth < width) ? handleIsMobileView(true) : handleIsMobileView(false);

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

    useLayoutEffect(() => {
        let loading = true;
        
        const onViewportWidthChange = () => {
            (window.innerWidth < width) ? handleIsMobileView(true) : handleIsMobileView(false);
        }

        if (loading) {
            window.addEventListener('resize', onViewportWidthChange);
        }

        return () => {
            loading = false;
            window.removeEventListener('resize', onViewportWidthChange);
        };
    }, []);
    
    return (
        <>
        {
            !(isContentLoading) && 
            <Main>
                <Row>
                {
                    (isAuth && !(isMobileView)) &&
                    <Column className="col-sm-3 col-lg-2" css={{ background: '$white', }}>
                        <Sidebar 
                        className="d-flex flex-column"
                        isAuth={isAuth} 
                        authUser={authUser}
                        isMobileView={isMobileView}
                        css={{ 
                            minHeight: '100vh',
                            position: 'sticky',
                            top: 0,
                            padding: '$15',
                            transition: '$default',
                            zIndex: '99999',
                        }} />
                    </Column>
                }
                    <Column 
                    className={(isAuth && !(isMobileView)) ? "col-sm-9 col-lg-10" : "col-12"} 
                    css={{ 
                        // background: '$green1', 
                        padding: '0 !important',
                    }}>
                    {
                        isAuth &&
                        <Navbar 
                        isAuth={isAuth}
                        authUser={authUser}
                        isMobileView={isMobileView}
                        handleLoggedOut={handleLoggedOut} />
                    }
                    {
                        (isLoading && (location.pathname ? !(isProfileTab(location.pathname)) : null)) ?
                        <Spinner /> : 
                        <Container css={{ marginTop: '$30', padding: '0px $20', }}>
                        {
                            !(isAuth) ?
                                <Routes>
                                    <Route index element={<LandingPage handleLoggedIn={handleLoggedIn} isAuth={isAuth} />} />
                                    <Route path="/admin" element={<LandingPage handleLoggedIn={handleLoggedIn} isAuth={isAuth} />} />
                                </Routes> : 
                                <Routes>
                                    <Route path="/dashboard" element={<Dashboard isAuth={isAuth} authUser={authUser} />} />
                                    <Route path="/settings" element={<Settings 
                                    isAuth={isAuth} 
                                    authUser={authUser}
                                    handleUser={handleUser} />} />
                                    {
                                        authUser.is_super_admin && 
                                        <Route path="/administrators" element={<Admins isAuth={isAuth} authUser={authUser} />} />
                                    }
                                    <Route path="/students" element={<Students isAuth={isAuth} authUser={authUser} />} />
                                    <Route path="/student/:slug" element={<Student isAuth={isAuth} authUser={authUser} />}>
                                        <Route index element={<StudentContent isAuth={isAuth} />} />
                                        <Route path=":tab_slug" element={<StudentContent isAuth={isAuth} />} />
                                    </Route>
                                    {
                                        authUser.is_super_admin && 
                                        <Route path="/user-logs" element={<UserLogs isAuth={isAuth} authUser={authUser} />} />
                                    }
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
