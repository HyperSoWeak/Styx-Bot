const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { accentColor } = require('../../config.json');
const base32 = require('base32');

module.exports = {
	category: 'crypto',
	data: new SlashCommandBuilder()
		.setName('decode')
		.setDescription('Decode given string into other format.')
		.addStringOption(option =>
			option.setName('data')
				.setDescription('The data to decode')
                .setRequired(true))
		.addStringOption(option =>
			option.setName('format')
				.setDescription('Leave blank to display all formats')
				.addChoices(
					{ name: 'Base32', value: 'Base32' },
					{ name: 'Base64', value: 'Base64' },
					{ name: 'Hex', value: 'Hex' },
					{ name: 'URI', value: 'URI' },
				)),
	async execute(interaction) {
		const data = interaction.options.getString('data');
		const format = interaction.options.getString('format');

		const decodeEmbed = new EmbedBuilder()
			.setColor(accentColor)
			.setTitle('Decode')
            .setDescription(`\`${data}\``);
		
		if(!format || format == 'Base32') {
			decodeEmbed.addFields({ name: 'Base32', value: `\`${base32.decode(data)}\`` });
		}
		if(!format || format == 'Base64') {
			decodeEmbed.addFields({ name: 'Base64', value: `\`${Buffer.from(data, 'base64').toString()}\`` });
		}
		if(!format || format == 'Hex') {
			decodeEmbed.addFields({ name: 'Hex', value: `\`${Buffer.from(data, 'hex').toString()}\`` });
		}
		if(!format || format == 'URI') {
			decodeEmbed.addFields({ name: 'URI', value: `\`${decodeURIComponent(data)}\`` });
		}

		await interaction.reply({ embeds: [decodeEmbed] });
	},
};