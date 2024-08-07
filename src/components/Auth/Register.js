import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const CenteredContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.05);
`;

const GlassCard = styled(Box)`
  max-width: 400px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.2);
  padding: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  }
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 15px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  margin-top: 15px;
  background: #007bff;
  color: #fff;
  width: 100%;
  &:hover {
    background: #0056b3;
  }
`;

const LoginButton = styled(Button)`
  margin-top: 10px;
  color: #007bff;
  width: 100%;
  border: none;
  background: none;
  text-decoration: underline;
  &:hover {
    background: none;
    color: #0056b3;
  }
`;

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Successfully Registered',
          text: 'You can now log in.',
        }).then(() => {
          navigate('/login');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Please try again.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Please try again.',
      });
    }
  };

  return (
    <CenteredContainer maxWidth="xs">
      <GlassCard>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <StyledTextField
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <StyledButton variant="contained" type="submit">
            Register
          </StyledButton>
        </form>
        <LoginButton onClick={() => navigate('/login')}>
          Already have an account? Login
        </LoginButton>
      </GlassCard>
    </CenteredContainer>
  );
};

export default Register;
