import React, { useState } from 'react';
import { fetchAiChatResponse } from './api/chat';
import { Container, TextField, Button, Paper, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { marked } from 'marked'; 
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; 

const Chat = () => {
  const [apiKey, setApiKey] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleSend = async () => {
    const userMessage = { sender: 'user', text: input };
    const botResponse = await fetchAiChatResponse(input, apiKey);
    const botMessage = { sender: 'bot', text: botResponse };
    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
        <Typography variant="h4" gutterBottom>AI-Chat</Typography>
        <List style={{ maxHeight: '400px', overflow: 'auto' }}>
          {messages.map((msg, index) => (
            <ListItem key={index} style={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <Box
                position="relative"
                onMouseEnter={(e) => {
                  const button = e.currentTarget.querySelector('.copy-button');
                  if (button) button.style.display = 'block';
                }}
                onMouseLeave={(e) => {
                  const button = e.currentTarget.querySelector('.copy-button');
                  if (button) button.style.display = 'none';
                }}
                style={{ width: '100%' }}
              >
                <ListItemText
                  primary={
                    <span dangerouslySetInnerHTML={{ __html: marked(msg.text) }} />
                  }
                  style={{
                    backgroundColor: msg.sender === 'user' ? '#e0f7fa' : '#f1f8e9',
                    padding: '8px 16px',
                    borderRadius: '16px',
                    color: msg.sender === 'user' ? '#000' : '#000'
                  }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  className="copy-button"
                  onClick={() => navigator.clipboard.writeText(msg.text)}
                  style={{
                    display: 'none',
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                  }}
                  startIcon={<ContentCopyIcon />}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'blue';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '';
                    e.currentTarget.style.color = '';
                  }}
                >
                  コピー
                </Button>
              </Box>
              {/* <ListItemText
                primary={
                  <span dangerouslySetInnerHTML={{ __html: marked(msg.text) }} />
                }
                style={{
                  backgroundColor: msg.sender === 'user' ? '#e0f7fa' : '#f1f8e9',
                  padding: '8px 16px',
                  borderRadius: '16px',
                  color: msg.sender === 'user' ? '#000' : '#000'
                }}
              /> */}
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box display="flex" flexDirection="column" gap="8px">
        <TextField
          value={apiKey}
          onChange={handleApiKeyChange}
          placeholder="Enter API Key..."
          variant="outlined"
          fullWidth
        />
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          variant="outlined"
          fullWidth
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button variant="contained" color="primary" onClick={handleSend}>
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default Chat;