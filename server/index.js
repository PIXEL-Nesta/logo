const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { generateLogoFromPrompt } = require('./services/imageGen');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// Serve static images
app.use('/static', express.static(__dirname + '/static'));

// Generate logo route
app.post('/api/generate-logo', async (req, res) => {
  try {
    const { jobId, prompt } = req.body;
    const url = await generateLogoFromPrompt(jobId, prompt);
    res.json({ success: true, url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
