import express from 'express';
import discord from './src/discord.js';
const port = 3007;
const app = express();

// start discord bot
discord();

app.get('/', (req, res) => {
  res.send('Successful response.');
});

app.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(`Example app is listening on port ${port}.`),
);
