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
import axios from "axios";

interface LoginCardProps {
  onClose: () => void;
}

function RegisterCard({ onClose }: LoginCardProps) {
  //React.FC<LoginCardProps> ({ onLogin }) => {
  const [name, setName] = useState("");
  const [user_name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [error, setError] = useState("");

  // Login Handler
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //Prevents page refresh
    try {
      // Replace with your login API endpoint
      const response = await axios.post(
        "http://localhost:8000/api/users/register/",
        {
          name,
          user_name,
          email,
          password,
        }
      );
      if (response.status === 201) {
        console.log("User registered successfully! procees to Login.");
        setAlert({ type: "success", message: "Registration Successful" });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch {
      setError("Registration failed. User already exists.");
      setAlert({ type: "error", message: "Registration Failed" });
      setTimeout(() => setAlert(null), 3000);
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
          Register
        </Text>
        {alert && <TopAlert type={alert.type} message={alert.message} />}
        <form className="form" onSubmit={handleRegister}>
          <TextInput
            ta="left"
            label="Name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            required
            mb="md"
          />
          <TextInput
            ta="left"
            label="Username"
            placeholder="Your Unique Username"
            value={user_name}
            onChange={(e) => setUsername(e.currentTarget.value)}
            required
            mb="md"
          />
          <TextInput
            ta="left"
            label="Email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
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
            Create Account
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default RegisterCard;
