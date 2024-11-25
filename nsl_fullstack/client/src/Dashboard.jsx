import React, { useState } from 'react';
import Cookies from 'js-cookie';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import ProfileSettings from './ProfileSettings';
import ContactUs from './ContactUs';

// Styled AppBar matching LandingPage style
const Navbar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FF6F61, #D9A7C7)',
  borderRadius: '0 0 40% 40%',
  padding: '20px 50px',
  [theme.breakpoints.down('sm')]: {
    padding: '10px 20px', // Reduced padding for mobile
  },
}));

const Dashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false); // State for Contact Us modal
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for Sidebar Drawer
  const isMobile = useMediaQuery('(max-width:600px)'); // Check if the screen width is less than 600px
  const userid = Cookies.get('user_id');

  const user = {
    name: userid,
  };

  const handleDeleteAccount = () => {
    console.log('Account deleted');
  };

  const cards = [
    {
      title: 'Learn Nepali Sign Language',
      path: '/learn',
      img: '/apple-learning.gif',
      button: (
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#FFB800',
            color: '#fff',
            borderRadius: '20px',
            padding: '10px 20px',
            '&:hover': {
              backgroundColor: '#FFD700',
              boxShadow: '0 0 10px 5px rgba(255, 215, 0, 0.6)',
              transform: 'scale(1.1)',
            },
          }}
          onClick={() => (window.location.href = '/learn')}
        >
          Click Me
        </Button>
      ),
    },
    {
      title: 'Contact Us',
      path: '#', // No need to use path since it's a popup
      img: '/email-us.gif',
      button: (
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#FFB800',
            color: '#fff',
            borderRadius: '20px',
            padding: '10px 20px',
            '&:hover': {
              backgroundColor: '#FFD700',
              boxShadow: '0 0 10px 5px rgba(255, 215, 0, 0.6)',
              transform: 'scale(1.1)',
            },
          }}
          onClick={() => setIsContactOpen(true)} // Open Contact Us modal
        >
          Click Me
        </Button>
      ),
    },
    {
      title: 'Nepali Sign Language Translator',
      path: '/sign-translator',
      img: '/sign-language-translator.gif',
      button: (
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#FFB800',
            color: '#fff',
            borderRadius: '20px',
            padding: '10px 20px',
            '&:hover': {
              backgroundColor: '#FFD700',
              boxShadow: '0 0 10px 5px rgba(255, 215, 0, 0.6)',
              transform: 'scale(1.1)',
            },
          }}
          onClick={() => (window.location.href = '/sign-translator')}
        >
          Click Me
        </Button>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: '#FFF9E5', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Navbar with gradient and rounded bottom */}
      <Navbar position="sticky">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="NSL-logo.png"
              alt="NSL Logo"
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                marginRight: '10px',
              }}
            />
            <Typography
              variant="h6"
              style={{
                fontWeight: 'bold',
                fontSize: '2rem',
                color: 'white',
              }}
            >
              Dashboard
            </Typography>
          </Box>

          {/* Buttons for desktop */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: 'rgba(255, 111, 97, 0.85)', // Semi-transparent but visible
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: '50px',
                  padding: '10px 20px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    backgroundColor: '#FF6F61',
                  },
                }}
                onClick={() => setIsProfileOpen(true)}
              >
                Profile Settings
              </Button>

              <Button
                variant="contained"
                style={{
                  backgroundColor: 'rgba(0, 153, 51, 0.85)', // Green tint for logout
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: '50px',
                  padding: '10px 20px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    backgroundColor: '#008000',
                  },
                }}
                onClick={() => {
                  Cookies.remove('user_id'); // Delete the user ID cookie
                  window.location.href = '/'; // Redirect to home page
                }}
              >
                Logout
              </Button>
            </Box>
          )}

          {/* Sidebar Menu for mobile */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setIsDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Navbar>

      {/* Drawer for Mobile Sidebar */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem button onClick={() => setIsProfileOpen(true)}>
              <ListItemText primary="Profile Settings" />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={() => {
                Cookies.remove('user_id');
                window.location.href = '/';
              }}
            >
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Profile Settings Modal */}
      <ProfileSettings
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onDeleteAccount={handleDeleteAccount}
      />

      {/* Contact Us Modal */}
      <ContactUs open={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Hero Section */}
      <Box sx={{ padding: '30px', borderRadius: '8px', marginTop: '20px', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
          Welcome
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '10px' }}>
          Explore the tools below to enhance your experience with Nepali Sign Language.
        </Typography>
      </Box>

      {/* Cards Section */}
      <Container sx={{ marginTop: '40px' }}>
        <Grid container justifyContent="center" spacing={3}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                    backgroundColor: '#FFCC00', // Imperial Yellow
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={card.img}
                  alt={card.title}
                  sx={{
                    objectFit: 'cover',
                    borderBottom: '2px solid #ddd',
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: 'center',
                      color: '#333',
                      fontWeight: 'bold',
                      marginBottom: '10px',
                    }}
                  >
                    {card.title}
                  </Typography>

                  <Box display="flex" justifyContent="center">
                    {/* This button comes from the cards array */}
                    {card.button}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
