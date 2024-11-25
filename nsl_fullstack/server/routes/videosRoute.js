const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();


const videoFolder = path.join(__dirname, '../NSL_School_Vdos');


router.get('/', (req, res) => {
  fs.readdir(videoFolder, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read video folder' });
    }

    
    const videoFiles = files.filter(file => file.endsWith('.mp4')).sort();
    
    
    res.json(videoFiles);
  });
});

module.exports = router;
