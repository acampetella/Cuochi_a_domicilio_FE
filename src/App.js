import CookCandidateRegistration from "./pages/CookCandidateRegistration";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserRegistration from "./pages/UserRegistration";
import CookProfile from "./pages/CookProfile";
import UserProfile from "./pages/UserProfile";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/userRegistration" element={<UserRegistration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cookProfile" element={<CookProfile />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/cookCandidateRegistration" element={<CookCandidateRegistration />} />
      </Routes>
    </>
  );
}

export default App;
