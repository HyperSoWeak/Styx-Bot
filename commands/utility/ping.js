const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	ownerOnly: true,
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
		.setDefaultMemberPermissions('0'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};