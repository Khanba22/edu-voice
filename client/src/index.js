import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// import { SocketProvider } from "./Contexts/SocketContext";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import { UserContextProvider } from "./Contexts/UserContext";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={Store}>
      <UserContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </UserContextProvider>
    </Provider>
  </BrowserRouter>
);
