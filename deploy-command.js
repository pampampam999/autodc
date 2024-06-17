require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const commands = [
    {
        name: 'kick',
        description: 'Kick a user from the voice channel after a specified time',
        options: [
            {
                name: 'target',
                type: ApplicationCommandOptionType.User,
                description: 'The user to kick',
                required: true,
            },
            {
                name: 'hours',
                type: ApplicationCommandOptionType.Integer,
                description: 'Number of hours to wait before kicking',
                required: false,
            },
            {
                name: 'minutes',
                type: ApplicationCommandOptionType.Integer,
                description: 'Number of minutes to wait before kicking',
                required: false,
            },
            {
                name: 'seconds',
                type: ApplicationCommandOptionType.Integer,
                description: 'Number of seconds to wait before kicking',
                required: false,
            },
        ],
    },
];

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
