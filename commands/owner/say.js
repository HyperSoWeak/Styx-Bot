const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	ownerOnly: true,
	cooldown: 0,
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Say anything as the bot!')
		.setDefaultMemberPermissions('0')
		.addStringOption(option =>
			option.setName('message')
				.setDescription('The message to say')
				.setRequired(true)),
	async execute(interaction) {
		const message = interaction.options.getString('message');
		await interaction.channel.send(message);
		return interaction.reply({ content: 'Success!', ephemeral: true });
	},
};