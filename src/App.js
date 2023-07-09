import CookCandidateRegistration from "./pages/CookCandidateRegistration";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserRegistration from "./pages/UserRegistration";
import CookProfile from "./pages/CookProfile";
import UserProfile from "./pages/UserProfile";
import AdminProfile from "./pages/AdminProfile";
import ProtectedRoutes from "./middlewares/ProtectedRoute";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserInfoChange from "./pages/UserInfoChange";
import CookInfo from "./components/CookInfo";
import CookMenus from "./components/CookMenus";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/userRegistration" element={<UserRegistration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cookCandidateRegistration" element={<CookCandidateRegistration />} />
        <Route element={<ProtectedRoutes/>}>
          <Route path="/cookProfile" element={<CookProfile />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/adminProfile" element={<AdminProfile />} />
          <Route path="/userInfoChange" element={<UserInfoChange />} />
          <Route path="/cookInfo" element={<CookInfo />} />
          <Route path="/cookMenus" element={<CookMenus />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
