import "@mantine/core/styles.css";
import "./App.css";
import myIcon from "./assets/parrot.svg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Button, Group, MantineProvider } from "@mantine/core";

import Home from "./pages/Home";
import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";
import { useState } from "react";
import { HomeContextProvider, useHomeContext } from "./context/HomeContext";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useHomeContext();

  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleRegister = () => {
    setShowRegister(true);
  };

  return (
    <MantineProvider>
      <Group className="page-icon" justify="flex-start" mt="md">
        <img src={myIcon} alt="Home Icon" className="top-left-icon" />
      </Group>
      <HomeContextProvider>
        <Router>
          <Group className="login-bar" justify="flex-end" mt="md">
            <Button
              //justify="left"
              variant="filled"
              color="pink"
              size="lg"
              onClick={handleLogin}
            >
              Login
            </Button>
            {showLogin && (
              <LoginCard
                onClose={() => setShowLogin(false)}
                onLogin={() => setIsLoggedIn(true)}
              />
            )}
            <Button
              variant="filled"
              color="grape"
              size="lg"
              onClick={handleRegister}
            >
              Register
            </Button>
            {showRegister && (
              <RegisterCard
                onClose={() => setShowRegister(false)}
                onLogin={() => setIsLoggedIn(true)}
              />
            )}
          </Group>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </HomeContextProvider>
    </MantineProvider>
  );
}

export default App;
