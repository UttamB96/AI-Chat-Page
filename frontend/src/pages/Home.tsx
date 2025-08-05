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
//import { useHomeContext } from "../context/HomeContext";
import { useAuth } from "../context/LoginContext";
import axios from "axios";
import { useState } from "react";

const Home = () => {
  //const { isLoggedIn } = useHomeContext();
  const [userMessage, setUserMessage] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const { loggedIn } = useAuth();
  const [loading, setLoading] = useState(false);

  // Chat Handler
  const handleChat = async () => {
    if (!userMessage) return; // Don't send if message is empty

    setLoading(true);
    try {
      // Replace this URL with your API endpoint
      const response = await axios.post(
        "http://localhost:8000/api/chat/generate/",
        { prompt: userMessage },
        {
          withCredentials: true, // Makes sure that cookies are included in the request
        }
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
        <div
          style={{ marginTop: "20px", marginBottom: "20px" }}
          className="input-send-container"
        >
          <TextInput
            size="xl"
            radius="md"
            disabled={loading || !loggedIn} //|| !userMessage || !isLoggedIn}
            //description="Converse with Chatterbox here"
            placeholder="How can I assist you today?"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleChat()}
            className="input-field"
          />

          <Button
            className="send-button"
            size="lg"
            onClick={handleChat}
            disabled={loading} //|| !isLoggedIn }//|| !userMessage } // Disable the button when loading or message is empty
          >
            Send
          </Button>
        </div>
        {aiResponse && !loading && (
          <div
            style={{
              marginBottom: "20px",
              maxHeight: "200px", // you can adjust this height
              overflowY: "auto",
              paddingRight: "10px", // avoids scrollbar overlapping text
              scrollBehavior: "smooth",
            }}
          >
            <Text size="xl" style={{ border: "none" }}>
              {aiResponse}
            </Text>
          </div>
        )}

        {loading && (
          <div style={{ marginTop: "20px" }}>
            <Loader color="#F0E130" />
          </div>
        )}
      </Center>
    </Container>
  );
};

export default Home;
