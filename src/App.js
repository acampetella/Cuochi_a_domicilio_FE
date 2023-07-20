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
import CookInfo from "./pages/CookInfo";
import CookMenus from "./pages/CookMenus";
import AddMenu from "./pages/AddMenu";
import RequestsManager from "./pages/RequestsManager";
import RequestForm from "./pages/RequestForm";
import CookPublicProfile from "./pages/CookPublicProfile";


const cercaDoppione = (element, arr) => {
  for(let i = 0; i < arr.length; i++) {
    if (element === arr[i]) {
      return true;
    }
  }
  return false;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/userRegistration" element={<UserRegistration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cookCandidateRegistration" element={<CookCandidateRegistration />} />
        <Route path="/cookPublicProfile/:cookId" element={<CookPublicProfile />} />
        <Route element={<ProtectedRoutes/>}>
          <Route path="/cookProfile" element={<CookProfile />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/adminProfile" element={<AdminProfile />} />
          <Route path="/userInfoChange" element={<UserInfoChange />} />
          <Route path="/cookInfo" element={<CookInfo />} />
          <Route path="/cookMenus" element={<CookMenus />} />
          <Route path="/addMenu" element={<AddMenu />} />
          <Route path="/userRequestsManager" element={<RequestsManager />} />
          <Route path="/cookRequestsManager" element={<RequestsManager />} />
          <Route path="/requestForm/:cookId" element={<RequestForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

