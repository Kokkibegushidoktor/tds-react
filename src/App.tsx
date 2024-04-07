import Header from "./Header.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import AuthProvider from "./provider/AuthProvider.tsx";
import Home from "./pages/Home.tsx";
import Profile from "./pages/Profile.tsx";
import Task from "./pages/Task.tsx";

function App() {

    return (
        <>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/profile" element={<AuthProvider><Profile/></AuthProvider>}/>
                    <Route path="/task/:id" element={<AuthProvider><Task/></AuthProvider>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App
