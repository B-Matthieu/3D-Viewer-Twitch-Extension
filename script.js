const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/check-follow', async (req, res) => {
  const { user, channel, token } = req.query;

  try {
    const response = await fetch(`https://api.twitch.tv/helix/users/follows?from_id=${user}&to_id=${channel}`, {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();

    res.json({ isFollower: data.total > 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ isFollower: false });
  }
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
