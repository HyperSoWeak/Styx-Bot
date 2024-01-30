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
		const message = await interaction.reply({ content: 'Reaction test', fetchReply: true });
		try {
			await message.react('🇦');
		} catch (error) {
			console.error('One of the emojis failed to react:', error);
		}
	},
};