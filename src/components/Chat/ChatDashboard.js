import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress, Button } from "@mui/material";
import styled, { keyframes } from 'styled-components';
import { getData } from "../../services/ServerServices";
import LogoutIcon from '@mui/icons-material/Logout';
import ChatIcon from '@mui/icons-material/Chat';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  background: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`;

const StyledButton = styled(Button)`
  background-color: #ff4757 !important;
  color: #fff !important;
  &:hover {
    background-color: #e84118 !important;
  }
`;

const ChatList = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  overflow: hidden;
`;

const ChatItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
  text-decoration: none;
  color: #333;
  transition: background 0.3s;

  &:hover {
    background: #f1f2f6;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ChatText = styled.div`
  margin-left: 10px;
`;

const getCurrentUserId = () => {
  const user = JSON.parse(localStorage.getItem("user"));  
  return user ? user.id : null;  
};

const ChatDashboard = () => {
  const [chatSessions, setChatSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return; 
    }

    const fetchUsers = async () => {
      try {
        const response = await getData("users/"); 
        const data = await response;
        const currentUserId = getCurrentUserId();
        const filteredUsers = data.filter((user) => user.id !== currentUserId);
        setChatSessions(filteredUsers);
      } catch (error) {
        setError("Error fetching users");
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user"); 
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress style={{ color: "#fff" }} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>
          <Title>Error</Title>
        </Header>
        <p style={{ color: "#fff" }}>{error}</p>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Chat Dashboard</Title>
        <StyledButton
          variant="contained"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </StyledButton>
      </Header>
      <ChatList>
        {chatSessions.map((session) => (
          <ChatItem to={`/chat/${session.id}`} key={session.id}>
            <ChatIcon color="primary" />
            <ChatText>{session.email}</ChatText>
          </ChatItem>
        ))}
      </ChatList>
    </Container>
  );
};

export default ChatDashboard;
