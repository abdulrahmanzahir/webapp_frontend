import { useState } from "react";
import axios from "axios";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("https://backend-gfgy.onrender.com/chatapi", {
        messages: updatedMessages,
      });

      const reply = response.data.reply;
      setMessages([...updatedMessages, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([...updatedMessages, {
        role: "assistant",
        content: "Error: Could not connect to ReemAI backend.",
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>💬 Talk to ReemAI</h2>

      <div style={{
        height: 400,
        overflowY: "scroll",
        border: "1px solid #ccc",
        padding: 15,
        marginBottom: 15,
        background: "#f9f9f9"
      }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: 10 }}>
            <strong>{msg.role === "user" ? "You" : "ReemAI"}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div style={{ display: "flex" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={sendMessage} disabled={loading} style={{ padding: 10, marginLeft: 10 }}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

