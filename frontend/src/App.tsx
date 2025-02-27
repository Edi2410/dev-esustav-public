import React from "react";
import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { useUserContext } from "./hooks/useUserContext";
import { MainLayout } from "./layouts/MainLayout";

function App() {
  const { user } = useUserContext();
  return <div className="App">{user ? <MainLayout /> : <LoginPage />}</div>;
}

export default App;
