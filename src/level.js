import { MessageEmbed } from 'discord.js';
import axios from 'axios';

// Regular expression to capture an ID from a specific URL format
const urlPattern = /https?:\/\/elma\.online\/levels\/(\d+)/;

async function fetchLevel(levelId) {
  const apiUrl = `https://api.elma.online/api/level/${levelId}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    return null;
  }
}

// Event listener for messages
const levelMessage = async message => {
  // Ignore messages from the bot itself
  if (message.author.bot) return;

  // Check if the message contains a URL matching the pattern
  const match = message.content.match(urlPattern);

  if (match) {
    const levelId = match[1]; // Extracted level ID from the URL

    // Fetch data from the API based on the ID
    const level = await fetchLevel(levelId);

    if (level) {
      const imageUrl = `https://api.elma.online/api/level/${levelId}.png`;

      // Create an embed message
      const embed = new MessageEmbed()
        .setColor(0x0099ff)
        .setTitle(`${level.LevelName}.lev - ${level.LongName}`)
        .setImage(imageUrl)
        .setURL(`https://elma.online/levels/${levelId}`);

      // Send the embedded message to the channel
      await message.channel.send(embed);
    } else {
      await message.channel.send('Could not retrieve data for this URL.');
    }
  }
};

export default levelMessage;
