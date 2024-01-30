const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	cooldown: 10,
	category: 'utility',
	data: new SlashCommandBuilder()
		.setName('user-info')
		.setDescription('Provides information about the user.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user to display')),
	async execute(interaction) {
		let user = interaction.options.getUser('user') ?? interaction.user;
		user = await user.fetch(true);

		const userInfoEmbed = new EmbedBuilder()
			.setColor(user.accentColor)
			.setTitle(user.globalName)
			.setThumbnail(user.displayAvatarURL({ size: 256 }))
			.addFields(
				{ name: 'Username', value: user.username, inline: true },
				{ name: 'User ID', value: user.id, inline: true },
				{ name: 'Created', value: user.createdAt.toDateString(), inline: true },
			)

		await interaction.reply({ embeds: [userInfoEmbed] });
	},
};