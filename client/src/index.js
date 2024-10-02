import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import { UserContextProvider } from "./Contexts/UserContext";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Contexts/AuthContext";
import { ChannelContextProvider } from "./Contexts/ChannelContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={Store}>
      <UserContextProvider>
        <AuthContextProvider>
          <ChannelContextProvider>
            <App />
          </ChannelContextProvider>
        </AuthContextProvider>
      </UserContextProvider>
    </Provider>
  </BrowserRouter>
);
