import { useState } from "react";
import { Card, TextInput, Button, Group, Alert } from "@mantine/core";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    try {
      // Replace with your registration API endpoint
      const response = await axios.post("/api/users/register", {
        name,
        username,
        email,
        password,
      });
      if (response.status === 201) {
        setSuccess("Registration successful. You can now log in.");
      }
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Card shadow="sm" padding="lg">
      {error && <Alert color="red">{error}</Alert>}
      {success && <Alert color="green">{success}</Alert>}
      <TextInput
        label="Name"
        placeholder="Your Full Name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <TextInput
        label="Username"
        placeholder="Your Unique Username"
        value={username}
        onChange={(e) => setUsername(e.currentTarget.value)}
      />
      <TextInput
        label="Email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <TextInput
        label="Password"
        placeholder="Your password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <Group justify="apart" mt="md">
        <Button onClick={handleRegister}>Register</Button>
      </Group>
    </Card>
  );
};

export default Register;
