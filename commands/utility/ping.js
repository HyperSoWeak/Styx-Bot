const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { accentColor } = require('../../config.json');

module.exports = {
	cooldown: 5,
	category: 'utility',
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
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

		await interaction.editReply({ embeds: [pingEmbed] });
	},
};