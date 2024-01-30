const { SlashCommandBuilder } = require('discord.js');

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
		let user = interaction.options.getUser('user');

		if(!user) {
			user = interaction.author.getUser();
		}

		const userInfoEmbed = new EmbedBuilder({
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
		}).setColor(user.accentColor)

		await interaction.reply({ embeds: [userInfoEmbed] });

		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	},
};