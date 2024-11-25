// Auth.jsx
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const FormTitle = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: '600',
  marginBottom: '20px',
  textAlign: 'center',
});

const InputField = styled(TextField)({
  marginBottom: '15px',
  width: '100%',
});

const ActionButton = styled(Button)({
  backgroundColor: '#FF6F61',
  color: '#fff',
  padding: '12px 30px',
  fontSize: '1rem',
  fontWeight: '600',
  borderRadius: '50px',
  '&:hover': {
    backgroundColor: '#D9A7C7',
  },
});

const Auth = ({ isLogin, toggleForm, closeForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: 'male',
    password: '',
    username: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
  
    // Determine the URL and body based on login or registration
    const url = isLogin
      ? 'http://localhost:3005/api/auth/login' // Login endpoint
      : 'http://localhost:3005/api/auth/register'; // Register endpoint
  
 
    const body = isLogin
      ? { email: formData.email, password: formData.password } // Login: email and password
      : {
          name: formData.name,
          email: formData.email,
          gender: formData.gender,
          password: formData.password, // Registration: all user info
        };
  
    try {
      // Make the POST request with the correct data
      const response = await axios.post(url, body);
      console.log('Response:', response.data);
      const userId = response.data.userId; 
      Cookies.set('user_id', userId, { expires: 7 });
      

      setLoading(false);
      navigate('/dashboard');

     
      closeForm(); 
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.response?.data?.message || 'Something went wrong');
    }
  };
  
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <FormTitle>{isLogin ? 'Login' : 'Register'}</FormTitle>

   
      {errorMessage && (
        <Typography color="error" variant="body2" align="center" style={{ marginBottom: '15px' }}>
          {errorMessage}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        {isLogin ? (
          <>
            <InputField
              label="email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <ActionButton fullWidth type="submit" disabled={loading}>
              {loading ? 'Logging In...' : 'Login'}
            </ActionButton>
            <Typography align="center" variant="body2" style={{ marginTop: '15px' }} onClick={toggleForm}>
              Don't have an account? Register
            </Typography>
          </>
        ) : (
          <>
            <InputField
              label="Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                label="Gender"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <InputField
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <ActionButton fullWidth type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </ActionButton>
            <Typography align="center" variant="body2" style={{ marginTop: '15px' }} onClick={toggleForm}>
              Already have an account? Login
            </Typography>
          </>
        )}
      </form>
    </Box>
  );
};

export default Auth;
