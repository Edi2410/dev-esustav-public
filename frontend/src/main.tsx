import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConfigProvider } from "antd";
import { QueryClientProvider, QueryClient } from "react-query";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AxiosProvider } from "./context/AxiosContext";
import { UserContextProvider } from "./context/UserContext";
import { BrowserRouter } from "react-router-dom";
import hr_HR from "antd/locale/hr_HR";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#c5272f",
      },
      components: {
        Radio: {
          radioSize: 64,
        },
      },
    }}
    locale={hr_HR}
  >
    <BrowserRouter>
      <GoogleOAuthProvider
        clientId={
          import.meta.env.VITE_GOOGLE_CLIENT_ID
            ? import.meta.env.VITE_GOOGLE_CLIENT_ID
            : ""
        }
      >
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>
            <AxiosProvider>
              <App />
            </AxiosProvider>
          </UserContextProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </ConfigProvider>
);

reportWebVitals();
