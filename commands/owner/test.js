const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	ownerOnly: true,
	cooldown: 0,
	category: 'owner',
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('For testing purposes.')
		.setDefaultMemberPermissions('0'),
	async execute(interaction) {
		const username = 'vausdilfp';
		const url = 'https://api.mojang.com/users/profiles/minecraft/' + username;

		const response = await fetch(url);
		if(!response.ok) {
			if(response.status == 404) {
				return interaction.reply(`User not found.`);
			}
			throw new Error(`Failed to fetch UUID from API. Status: ${response.status}`);
		}

		const data = await response.json();
		interaction.reply(`ID: ${data.id}`);
	},
};