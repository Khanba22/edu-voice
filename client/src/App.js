import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AuthenticationPage from "./Pages/AuthenticationPage";
import UserDashboard from "./Pages/UserDashboard";
import ChannelPage from "./Pages/ChannelPage";
import NavigationBar from "./Components/NavigationBar";
import CreateUser from "./Components/CreateUser";
import LoginPage from "./Pages/LoginPage";

export default function App() {

  return (
    <>
      <Routes>
        <Route element={<HomePage />} path="/home" />
        <Route element={<AuthenticationPage />} path="/auth" />
        <Route element={<CreateUser />} path="/auth/create-user" />
        <Route element={<LoginPage />} path="/auth/login" />
        <Route element={<UserDashboard />} path="/dashboard" />
        <Route element={<ChannelPage />} path="/channel" />
      </Routes>
    </>
  );
}
