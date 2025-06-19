import React, { useState } from 'react';
import './App.css';

function App() {
  const [sessionId] = useState(() => Date.now().toString());
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);

  const sendPrompt = async () => {
    if (!prompt.trim()) return;

    const userMsg = { role: 'user', content: prompt };
    setMessages(prev => [...prev, userMsg]);
    
    try {
      const response = await fetch('https://kgnb1ea7la.execute-api.us-east-1.amazonaws.com/prod/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, prompt })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json(); // data.reply contains AI text
      const assistantMsg = { role: 'assistant', content: data.reply };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      const errorMsg = { role: 'assistant', content: `Error: ${error.message}` };
      setMessages(prev => [...prev, errorMsg]);
    }

    setPrompt('');
  };

  return (
    <div className="chat-container">
      <h2>AI Assistant (Nova Pro)</h2>
      <p className="description">
        Powered by Amazon's Nova Pro model, this assistant provides intelligent, real-time responses with memory recall.
        Your chat history is stored to enhance follow-up conversations and context understanding.
      </p>

      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={`msg ${msg.role}`}>
            {msg.content.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        ))}
      </div>

      <textarea
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={sendPrompt}>Send</button>
    </div>
  );
}

export default App;


