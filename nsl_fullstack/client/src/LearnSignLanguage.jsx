import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { 
  AppBar, Toolbar, Typography, Button, Box, Dialog, DialogActions, DialogContent, useMediaQuery, IconButton, Drawer, List, ListItem, ListItemText, Divider 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import ContactUs from './ContactUs';

const Navbar = styled(AppBar)({
  background: 'linear-gradient(135deg, #FF6F61, #D9A7C7)',
  borderRadius: '0 0 40% 40%',
  padding: '10px 20px',
  overflow: 'hidden',
});

const LearnSignLanguage = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // Sidebar state
  const videoRef = useRef(null);

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    fetch('http://localhost:3005/api/videos')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        return response.json();
      })
      .then((data) => {
        setVideos(data);
      })
      .catch((err) => {
        setError('Error fetching videos: ' + err.message);
      });
  }, []);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsPlaying(false);
  };

  const closeVideoPlayer = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div style={{ backgroundColor: '#FFF9E5', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Navbar */}
      <Navbar position="sticky">
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => window.location.href = '/dashboard'}
          >
            <img
              src="NSL-logo.png"
              alt="NSL Logo"
              style={{
                width: isSmallScreen ? '40px' : '50px',
                height: isSmallScreen ? '40px' : '50px',
                borderRadius: '50%',
                marginRight: '10px',
              }}
            />
            <Typography
              variant="h6"
              style={{
                fontWeight: 'bold',
                fontSize: isSmallScreen ? '1.4rem' : '1.8rem',
                color: 'white',
              }}
            >
              NSL School
            </Typography>
          </Box>

          {/* Menu for small screens */}
          {isSmallScreen ? (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: '20px' }}>
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
                NSL Sign Translator
              </Button>
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
                onClick={() => setIsContactOpen(true)}
              >
                Contact Us
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#008000',
                  color: '#fff',
                  borderRadius: '20px',
                  padding: '10px 20px',
                  '&:hover': {
                    backgroundColor: '#006400',
                    boxShadow: '0 0 10px 5px rgba(0, 128, 0, 0.6)',
                    transform: 'scale(1.1)',
                  },
                }}
                onClick={() => {
                  Cookies.remove('user_id');
                  window.location.href = '/';
                }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </Navbar>

      {/* Sidebar (Drawer) */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem button onClick={() => (window.location.href = '/sign-translator')}>
              <ListItemText primary="NSL Sign Translator" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => setIsContactOpen(true)}>
              <ListItemText primary="Contact Us" />
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

      <ContactUs open={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Video Section */}
      <Box sx={{ padding: '30px', borderRadius: '8px', marginTop: '20px', textAlign: 'center' }}>
        <Typography variant={isSmallScreen ? 'h5' : 'h4'} sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
          Welcome to NSL School
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '10px', fontSize: isSmallScreen ? '0.9rem' : '1rem' }}>
          Explore and learn Nepali Sign Language in an interactive way.
        </Typography>
      </Box>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <Button
              key={index}
              variant="contained"
              sx={{
                backgroundColor: '#FFB800',
                color: '#fff',
                borderRadius: '20px',
                padding: '10px 20px',
                fontSize: isSmallScreen ? '0.8rem' : '1rem',
                '&:hover': {
                  backgroundColor: '#FFD700',
                },
              }}
              onClick={() => handleVideoClick(video)}
            >
              {video.replace('.mp4', '')}
            </Button>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </div>

      {/* Video Dialog */}
      <Dialog open={selectedVideo !== null} onClose={closeVideoPlayer} maxWidth="lg" fullWidth>
        <DialogContent
          style={{
            display: 'flex',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {selectedVideo && (
            <video
              ref={videoRef}
              controls
              onEnded={handleVideoEnd}
              style={{
                width: '100%',
                maxWidth: '800px',
                maxHeight: '450px',
                aspectRatio: '16/9',
                borderRadius: '10px',
              }}
              src={`http://localhost:3005/${selectedVideo}`}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeVideoPlayer} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LearnSignLanguage;
