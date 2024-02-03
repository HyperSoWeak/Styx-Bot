const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { accentColor } = require('../../config.json');

module.exports = {
	category: 'utility',
	data: new SlashCommandBuilder()
		.setName('qrcode')
		.setDescription('None')
		.addStringOption(option =>
			option.setName('text')
				.setDescription('The text in qrcode')
				.setRequired(true)),
	async execute(interaction) {
		const text = interaction.options.getString('text');

		const qrcodeEmbed = new EmbedBuilder()
			.setColor(accentColor)
			.setTitle('Qrcode')
			.setImage(`https://api.qrserver.com/v1/create-qr-code/?size=1024x1024&data=${text.replace(new RegExp(" ", "g"), "%20")}`)

		await interaction.reply({ embeds: [qrcodeEmbed] });
	},
};