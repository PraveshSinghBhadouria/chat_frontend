import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import styled from 'styled-components';

const glassEffect = `
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  backdrop-filter: blur(15px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
`;

const CenteredContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff, #f0f0f0);
  padding: 20px;
`;

const GlassBox = styled(Box)`
  ${glassEffect}
  padding: 40px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  animation: fadeIn 1s ease-in-out;
  background-color: rgba(255, 255, 255, 0.3);
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled(Typography)`
  margin-bottom: 20px;
  font-weight: bold;
  color: #333;
`;

const SubText = styled(Typography)`
  margin-top: 10px;
  color: #555;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 20px;
  & label.Mui-focused {
    color: #007bff;
  }
  & .MuiInput-underline:after {
    border-bottom-color: #007bff;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: rgba(255, 255, 255, 0.5);
    }
    &:hover fieldset {
      border-color: #007bff;
    }
    &.Mui-focused fieldset {
      border-color: #007bff;
    }
  }
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
  background: #007bff;
  color: #fff;
  &:hover {
    background: #0056b3;
  }
`;

const SignUpButton = styled(Button)`
  margin-top: 10px;
  color: #007bff;
  background: transparent;
  border: none;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const { token, user } = await response.json();
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed');
    }
  };

  return (
    <CenteredContainer maxWidth="xs">
      <GlassBox>
        <Title variant="h4">Login</Title>
        <SubText variant="body1">Please login to your account</SubText>
        <LoginForm onSubmit={handleSubmit}>
          <StyledTextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <StyledTextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <StyledButton variant="contained" type="submit" fullWidth>
            Login
          </StyledButton>
        </LoginForm>
        <SubText variant="body2">Don't have an account?</SubText>
        <SignUpButton onClick={() => navigate('/register')}>
          Sign Up
        </SignUpButton>
      </GlassBox>
    </CenteredContainer>
  );
};

export default Login;
