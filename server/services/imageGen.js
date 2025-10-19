const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Ensure static folder exists
function ensureStaticDir() {
  const dir = path.join(__dirname, '..', 'static');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/**
 * Generate logo image from prompt using Clipdrop API
 * @param {string} jobId - unique job id
 * @param {string} prompt - text prompt for logo
 * @returns {string} - URL of generated image
 */
async function generateLogoFromPrompt(jobId, prompt) {
  const staticDir = ensureStaticDir();
  const outFile = path.join(staticDir, `${jobId}.png`);

  try {
    // Call Clipdrop API
    const form = new FormData()
form.append('prompt', 'shot of vaporwave fashion dog in miami')

fetch('https://clipdrop-api.co/text-to-image/v1', {
  method: 'POST',
  headers: {
    'x-api-key': cd3e7483fce590c07608375d4251d84f98b7be326116cab09c7163351b1afe4c20be365b1fd66d581c5e55a2d17e800e,
  },
  body: form,
})
  .then(response => response.arrayBuffer())
  .then(buffer => {
    // buffer here is a binary representation of the returned image
  })

    // Save image to static folder
    fs.writeFileSync(outFile, Buffer.from(response.data, 'binary'));

    // Return accessible URL
    const baseUrl = process.env.STORAGE_BASE_URL || 'http://localhost:4000/static';
    return `${baseUrl}/${jobId}.png`;
  } catch (err) {
    console.error('Error generating image:', err.response?.data || err.message);
    throw new Error('Failed to generate image');
  }
}

module.exports = { generateLogoFromPrompt };
