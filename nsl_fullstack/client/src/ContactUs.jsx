import React, { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  useMediaQuery,
  Snackbar,
  Alert,
} from '@mui/material';

const ContactUs = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)'); // Responsive modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    console.log('Dummy form submission:', formData);
    setSnackbarOpen(true); // Show feedback on successful submission
    setFormData({ name: '', email: '', message: '' }); // Reset form
    onClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      {/* Contact Modal */}
      <Modal open={open} onClose={onClose} aria-labelledby="contact-us-modal">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isSmallScreen ? '90%' : 400, // Responsive width
            bgcolor: 'background.paper',
            border: '2px solid #FF6F61',
            boxShadow: 24,
            p: 4,
            borderRadius: '10px',
          }}
        >
          <Typography
            id="contact-us-modal"
            variant="h6"
            component="h2"
            sx={{ mb: 2, textAlign: 'center', color: '#FF6F61' }}
          >
            Contact Us
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="dense"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="dense"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="dense"
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                marginTop: '20px',
                backgroundColor: '#FF6F61',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#FF4B47',
                },
              }}
            >
              Send
            </Button>
          </form>
        </Box>
      </Modal>

      {/* Snackbar Feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Message sent successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ContactUs;
