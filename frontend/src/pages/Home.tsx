//import { useContext, useState } from "react";
import "./Home.css";
import {
  Container,
  Center,
  Title,
  TextInput,
  Button,
  Loader,
  Text,
} from "@mantine/core";
//import LoginCard from "../components/LoginCard";
import { useHomeContext } from "../context/HomeContext";
import axios from "axios";
import { useState } from "react";

const Home = () => {
  const { isLoggedIn } = useHomeContext();
  const [userMessage, setUserMessage] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Chat Handler
  const handleChat = async () => {
    if (!userMessage) return; // Don't send if message is empty

    setLoading(true);
    try {
      // Replace this URL with your API endpoint
      const response = await axios.post(
        "http://localhost:8000/api/chat/generate",
        { prompt: userMessage },
      );

      // Handle the response from the AI API
      setAiResponse(response.data.response); // Assuming response contains the AI message in `response`
      setUserMessage(""); // Clear the input after sending
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse("Sorry, there was an error getting the response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Center style={{ height: "50vh", flexDirection: "column" }}>
        <Title className="typewriter" order={1}>
          Welcome to Chatterbox.
        </Title>
        {aiResponse && !loading && (
          <div style={{ marginBottom: "20px" }}>
            <Text size="sm">{aiResponse}</Text>
          </div>
        )}

        {loading && (
          <div style={{ marginTop: "20px" }}>
            <Loader color="#F0E130" />
          </div>
        )}

        <div className="input-send-container">
          <TextInput
            size="xl"
            radius="md"
            disabled={loading || !userMessage || !isLoggedIn}
            //description="Converse with Chatterbox here"
            placeholder="How can I assist you today?"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleChat()}
            className="input-field"
            //style={{ marginTop: "30px", marginBottom: "10px" }}
          />

          <Button
            className="send-button"
            size="lg"
            onClick={handleChat}
            disabled={loading || !userMessage || !isLoggedIn} // Disable the button when loading or message is empty
          >
            Send
          </Button>
        </div>
      </Center>
    </Container>
  );
};

export default Home;
