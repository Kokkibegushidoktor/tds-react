import Header from "./Header.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import AuthProvider from "./provider/AuthProvider.tsx";
import Home from "./pages/Home.tsx";

function App() {

    return (
        <>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signup" element={<SignUp/>
                    }/>
                </Routes>
            </Router>
        </>
    )
}

export default App
