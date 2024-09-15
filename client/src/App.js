import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AuthenticationPage from "./Pages/AuthenticationPage";
import UserDashboard from "./Pages/UserDashboard";
import ChannelPage from "./Pages/ChannelPage";
import NavigationBar from "./Components/NavigationBar";

export default function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<AuthenticationPage />} path="/auth" />
        <Route element={<UserDashboard />} path="/dashboard" />
        <Route element={<ChannelPage />} path="/channel" />
      </Routes>
    </BrowserRouter>
  );
}
