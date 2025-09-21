// src/components/ChatSection.jsx
import { useState, useRef, useEffect } from 'react';

export default function ChatSection() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '👋 Welcome to DiabTrack AI! Ask me anything about Type 2 Diabetes.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const container = messagesEndRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const updatedMessages = [...messages, { role: 'user', content: input }];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://webapp-diabtrack-rh8c.onrender.com/chatapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = await res.json();
      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: data.reply || '🤖 No response received.' },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: '⚠️ No response received.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-12 p-6 bg-white shadow-md rounded-xl">
  <h2 className="text-2xl font-bold mb-4 text-blue-700">Ask DiabTrack AI</h2>

  {/* Chat Scroll Container */}
  <div className="space-y-3 h-[400px] overflow-y-auto pr-2 mb-4" ref={messagesEndRef}>
    {messages.map((msg, idx) => (
      <div
        key={idx}
        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
      >
        <div
          className={`px-4 py-2 rounded-lg max-w-[70%] whitespace-pre-line ${
            msg.role === 'user'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {msg.content}
        </div>
      </div>
    ))}
    {loading && <p className="text-sm italic text-gray-400">Typing...</p>}
  </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Ask something..."
          disabled={loading}
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}


