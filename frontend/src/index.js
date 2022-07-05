import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "web3uikit";
import Context from "./Context";


ReactDOM.render(
  <React.StrictMode>
      <NotificationProvider>
        <Context>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Context>
      </NotificationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
