import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  List,
  ListItem,
  TextField,
  Button,
  Box,
} from '@mui/material';
import styled, { keyframes } from 'styled-components';

const socket = io('http://localhost:5000');

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ChatContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: center;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: #fafafa;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const ChatHeader = styled(Typography)`
  margin-bottom: 20px;
  font-weight: bold;
  color: #333;
`;

const ChatBox = styled(Box)`
  flex-grow: 1;
  width: 100%;
  overflow-y: auto;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #ffffff;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MessageList = styled(List)`
  padding: 0;
`;

const MessageItem = styled(ListItem)`
  display: flex;
  justify-content: ${(props) => (props.isOwn ? 'flex-end' : 'flex-start')};
  margin: 10px 0;
  padding: 0;
`;

const MessageBubble = styled(Box)`
  background-color: ${(props) => (props.isOwn ? '#d1f7c4' : '#ffffff')};
  padding: 12px;
  border-radius: ${(props) => (props.isOwn ? '12px 12px 0 12px' : '12px 12px 12px 0')};
  max-width: 70%;
  text-align: left;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
  align-self: ${(props) => (props.isOwn ? 'flex-end' : 'flex-start')};
`;

const InputForm = styled(Box)`
  display: flex;
  width: 100%;
  gap: 10px;
`;

const ChatWindow = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      socket.emit('authenticate', token);
    }

    socket.on('authenticated', () => {
      setAuthenticated(true);
    });

    socket.on('unauthorized', (message) => {
      alert(message);
    });

    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('newMessage');
      socket.off('authenticated');
      socket.off('unauthorized');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authenticated) {
      socket.emit('sendMessage', { receiverId: id, message: newMessage });
      setNewMessage('');
    } else {
      alert('You need to be authenticated to send messages.');
    }
  };

  return (
    <ChatContainer maxWidth="sm">
      <ChatHeader variant="h4" gutterBottom>
        Chat with User {id}
      </ChatHeader>
      <ChatBox>
        <MessageList>
          {messages.map((msg, index) => (
            <MessageItem key={index} isOwn={msg.senderId === userId}>
              <MessageBubble isOwn={msg.senderId === userId}>
                {msg.message}
              </MessageBubble>
            </MessageItem>
          ))}
        </MessageList>
      </ChatBox>
      <InputForm component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          InputProps={{ style: { padding: '10px' } }}
        />
        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
      </InputForm>
    </ChatContainer>
  );
};

export default ChatWindow;
