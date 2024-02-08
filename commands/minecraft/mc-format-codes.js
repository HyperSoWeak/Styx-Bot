const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { accentColor } = require('../../config.json');

module.exports = {
	cooldown: 10,
	category: 'minecraft',
	data: new SlashCommandBuilder()
		.setName('mc-format-codes')
		.setDescription('List all Minecraft format codes.'),
	async execute(interaction) {
        const imageURL = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/7/7e/Minecraft_Formatting.gif/revision/latest?cb=20200828001454";

		const userInfoEmbed = new EmbedBuilder()
			.setColor(accentColor)
			.setTitle('Minecraft format codes')
			.setImage(imageURL)
			.addFields(
				{ name: 'Chat Prefix', value: '\`§\`', inline: true },
				{ name: 'Motd Prefix', value: '\`\\u00A7\`', inline: true },
			)

		await interaction.reply({ embeds: [userInfoEmbed] });
	},
};