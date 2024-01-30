const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { accentColor } = require('../../config.json');
const base32 = require('base32');

module.exports = {
	category: 'crypto',
	data: new SlashCommandBuilder()
		.setName('encode')
		.setDescription('Encode given string into other format.')
		.addStringOption(option =>
			option.setName('data')
				.setDescription('The string to encode')
                .setRequired(true)),
	async execute(interaction) {
		const data = interaction.options.getString('data');

        const encodedBase32 = base32.encode(data);
        const encodedBase64 = Buffer.from(data).toString('base64');
        const encodedHex = Buffer.from(data).toString('hex');
        const encodedURI = encodeURIComponent(data);

		const encodeEmbed = new EmbedBuilder()
			.setColor(accentColor)
			.setTitle('Encode')
            .setDescription(`\`${data}\``)
			.addFields(
				{ name: 'Base32', value: `\`${encodedBase32}\`` },
				{ name: 'Base64', value: `\`${encodedBase64}\`` },
				{ name: 'Hex', value: `\`${encodedHex}\`` },
				{ name: 'URI', value: `\`${encodedURI}\`` },
			)

		await interaction.reply({ embeds: [encodeEmbed] });
	},
};