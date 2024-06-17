require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

const TOKEN = process.env.DISCORD_TOKEN;

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'kick') {
        const user = options.getMember('target');
        const hours = options.getInteger('hours') || 0;
        const minutes = options.getInteger('minutes') || 0;
        const seconds = options.getInteger('seconds') || 0;
        const totalMilliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000;

        if (user.voice.channel) {
            await interaction.reply(`${user.displayName} will be disconnected in ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`);

            setTimeout(async () => {
                if (user.voice.channel) {
                    await user.voice.disconnect();
                    console.log(`${user.displayName} has been disconnected from the voice channel.`);
                }
            }, totalMilliseconds);
        } else {
            await interaction.reply(`${user.displayName} is not in a voice channel.`);
        }
    }
});

client.on('error', console.error);

client.login(TOKEN);
