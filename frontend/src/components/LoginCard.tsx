import { useEffect, useState } from "react";
import {
  Card,
  TextInput,
  Button,
  Alert,
  PasswordInput,
  Text,
  CloseButton,
} from "@mantine/core";
import "./Card.css";
import TopAlert from "./TopAlert.tsx";
import { useAuth } from "../context/LoginContext.tsx";
import axios from "axios";

interface LoginCardProps {
  onClose: () => void;
}

function LoginCard({ onClose }: LoginCardProps) {
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn } = useAuth();
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [error, setError] = useState("");

  // Login Handler
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //Prevents page refresh
    try {
      // Replace with your login API endpoint
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/api/users/login/",
        data: {
          user_name: user_name,
          password: password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.status);
      if (response.status === 200) {
        setLoggedIn(true);
        console.log("Login Success!");
        setAlert({ type: "success", message: "Login Successful" });
        setTimeout(() => setAlert(null), 2000);
      } else {
        console.log("Login Failed!");
        setAlert({
          type: "error",
          message: "Login failed. Please check your credentials.",
        });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch {
      setError("Login failed. Please check your credentials.");
      setAlert({
        type: "error",
        message: "Login failed. Please check your credentials.",
      });
      setTimeout(() => setAlert(null), 3000);
      console.log("Login Failed");
    }
  };

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log("Key pressed:", event.key); // Debug key presses
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="overlay">
      <Card
        className="card"
        shadow="md"
        padding="lg"
        radius="md"
        onClick={(e) => e.stopPropagation()}
        withBorder
      >
        {error && <Alert color="red">{error}</Alert>}
        <CloseButton
          onClick={onClose}
          className="closeButton"
          aria-label="Close modal"
        />
        <Text ta="center" size="xl" mb={20}>
          Login
        </Text>
        {alert && <TopAlert type={alert.type} message={alert.message} />}
        <form className="form" onSubmit={handleLogin}>
          <TextInput
            ta="left"
            label="Username"
            placeholder="Your Username"
            value={user_name}
            onChange={(e) => setUsername(e.currentTarget.value)}
            required
            mb="md"
          />
          <PasswordInput
            ta="left"
            label="Password"
            placeholder="Your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
            mb="md"
          />
          <Button type="submit" fullWidth mt="xl">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default LoginCard;
