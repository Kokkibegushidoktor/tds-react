import Header from "./Header.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import AuthProvider from "./provider/AuthProvider.tsx";
import Home from "./pages/Home.tsx";
import Profile from "./pages/Profile.tsx";
import Task from "./pages/Task.tsx";
import Tasks from "./pages/Tasks.tsx";
import NewLevel from "./pages/NewLevel.tsx";
import EditLevel from "./pages/EditLevel.tsx";
import NewQuestion from "./pages/NewQuestion.tsx";
import NewTask from "./pages/NewTask.tsx";
import EditQuestion from "./pages/EditQuestion.tsx";
import TaskVariantView from "./pages/TaskVariantView.tsx";
import MyVariants from "./pages/MyVariants.tsx";

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
                    <Route path="/tasks" element={<AuthProvider><Tasks/></AuthProvider>}/>
                    <Route path="/task/:id/newlevel" element={<AuthProvider><NewLevel/></AuthProvider>}/>
                    <Route path="/level/:id" element={<AuthProvider><EditLevel/></AuthProvider>}/>
                    <Route path="/level/:id/newquest" element={<AuthProvider><NewQuestion/></AuthProvider>}/>
                    <Route path="/newtask" element={<AuthProvider><NewTask/></AuthProvider>}/>
                    <Route path="/quest/:id" element={<AuthProvider><EditQuestion/></AuthProvider>}/>
                    <Route path="/getvariant/:id" element={<AuthProvider><TaskVariantView/></AuthProvider>}/>
                    <Route path="/myvariants" element={<AuthProvider><MyVariants/></AuthProvider>}/>

                </Routes>
            </Router>
        </>
    )
}

export default App
