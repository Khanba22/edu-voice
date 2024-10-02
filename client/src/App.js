import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AuthenticationPage from "./Pages/AuthenticationPage";
import UserDashboard from "./Pages/UserDashboard";
import ChannelPage from "./Pages/ChannelPage";
import NavigationBar from "./Components/NavigationBar";
import { useContext, useEffect } from "react";
import { UserContext } from "./Contexts/UserContext";
import CreateUser from "./Components/CreateUser";

export default function App() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userContext.isAuthenticated) {
      navigate("/auth");
    }
  }, []);
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<AuthenticationPage />} path="/auth" />
        <Route element={<CreateUser />} path="/auth/create-user" />
        <Route element={<UserDashboard />} path="/dashboard" />
        <Route element={<ChannelPage />} path="/channel" />
      </Routes>
    </>
  );
}
