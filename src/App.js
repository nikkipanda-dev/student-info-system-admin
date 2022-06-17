import { Routes, Route, } from "react-router-dom";
import "./App.css";
import { globalStyles, } from "./stitches.config";

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

    return (
        <>
            <Sidebar />
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/administrators" element={<Admins />} />
                <Route path="/students" element={<Students />} />
                <Route path="/:slug" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
