const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { accentColor } = require('../../config.json');

module.exports = {
	cooldown: 10,
	category: 'bot',
	data: new SlashCommandBuilder()
		.setName('server-info')
		.setDescription('Provides information about the server.')
		.setDMPermission(false),
	async execute(interaction) {
		const { guild } = interaction;
		const serverInfoEmbed = new EmbedBuilder({
			author: { name: guild.name, iconURL: guild.iconURL({ size: 256 }) },
			fields: [
				{ name: 'Owner', value: (await guild.fetchOwner()).user.tag, inline: true },
				{ name: 'Text Channels', value: guild.channels.cache.filter((c) => c.type === 0).toJSON().length, inline: true },
				{ name: 'Voice Channels', value: guild.channels.cache.filter((c) => c.type === 2).toJSON().length, inline: true },
				{ name: 'Category Channels', value: guild.channels.cache.filter((c) => c.type === 4).toJSON().length, inline: true },
				{ name: 'Members', value: guild.memberCount, inline: true },
				{ name: 'Roles', value: guild.roles.cache.size, inline: true },
				{ name: 'Role List', value: guild.roles.cache.toJSON().join(', ') },
			],
			footer: { text: `ID: ${guild.id} | Server Created: ${guild.createdAt.toDateString()}` }
		}).setColor(accentColor)

		await interaction.reply({ embeds: [serverInfoEmbed] });
	},
};