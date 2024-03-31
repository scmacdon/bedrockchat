import React, { useState } from 'react';
import './App.css';
import chatIcon from './chat.png';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://scottvideo-env.eba-w8nusyj3.us-east-1.elasticbeanstalk.com/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: message }),
      });
      const data = await response.text();
      setResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    setMessage('');
    setResponse('');
    fetchData();
  };

  return (
    <div className="cloudscape-container">
      <h2 className="cloudscape-heading">Welcome to Bedrock Chat App</h2>
      <div className="input-container">
        <textarea
          className="cloudscape-textarea"
          placeholder="Server response will be displayed here..."
          readOnly
          value={response}
        />
        {isLoading && (
          <div className="loading-mask">
            <div className="loading-spinner" />
            Retrieving Data...
          </div>
        )}
        <h4>Enter Prompt:</h4>
        <textarea
          className="cloudscape-textarea"
          placeholder="Type your message..."
          onChange={handleMessageChange}
          value={message}
        />
        <div className="icon-container" onClick={handleClick}>
          <img src={chatIcon} alt="Chat Icon" className="chat-icon" />
        </div>
      </div>
    </div>
  );
}

export default App;




















