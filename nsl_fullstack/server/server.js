const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const profroutes = require('./routes/profile')
require('dotenv').config();
const cors = require('cors'); 
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const videosRoute = require('./routes/videosRoute.js');




const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
};

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'NSL_School_Vdos')));


app.use('/api/videos', videosRoute);
app.use('/api/auth', authRoutes);
app.use('/api', profroutes);


const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;


