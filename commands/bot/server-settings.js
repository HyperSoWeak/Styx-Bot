const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { accentColor } = require('../../config.json');

module.exports = {
	unfinished: true,
	cooldown: 10,
	category: 'bot',
	data: new SlashCommandBuilder()
		.setName('server-settings')
		.setDescription('Display or change server settings.'),
	async execute(interaction) {
		await interaction.deferReply();
		const reply = await interaction.fetchReply();
		const ping = reply.createdTimestamp - interaction.createdTimestamp;

		const pingEmbed = new EmbedBuilder()
			.setColor(accentColor)
			.setTitle(':satellite: Ping')
			.setFields(
				{ name: 'Client', value: `\`${ping} ms\``, inline: true },
				{ name: 'Websocket', value: `\`${interaction.client.ws.ping} ms\``, inline: true }
			)
			.setTimestamp();

		await interaction.editReply({ content:'Pong!', embeds: [pingEmbed] });
	},
};