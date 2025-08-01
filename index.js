// === Webサーバー機能を追加するための部分 ===
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Koyebが指定するポート、またはローカル用の3000番ポート

// ヘルスチェック用のルート
app.get('/', (req, res) => {
  res.send('Discord bot is running!');
});

// サーバーを起動
app.listen(port, () => {
  console.log(`Web server listening on port ${port}`);
});
// ==========================================


const fs = require('fs');
const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const commands = {}
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands[command.data.name] = command;
}

client.once("ready", async () => {
    const data = [];
    for (const commandName in commands) {
        data.push(commands[commandName].data);
    }
    await client.application.commands.set(data);
    console.log("Discord bot is Ready!"); // こちらのログも出ます
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    const command = commands[interaction.commandName];
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true,
        });
    }
});

client.login(process.env.DISCORD_TOKEN);
