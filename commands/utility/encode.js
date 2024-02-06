const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { accentColor } = require('../../config.json');
const base32 = require('base32');

module.exports = {
	category: 'utility',
	data: new SlashCommandBuilder()
		.setName('encode')
		.setDescription('Encode given string into other format.')
		.addStringOption(option =>
			option.setName('data')
				.setDescription('The data to encode')
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

		const encodeEmbed = new EmbedBuilder()
			.setColor(accentColor)
			.setTitle('Encode')
            .setDescription(`\`${data}\``)

        if(!format || format == 'Base32') {
            encodeEmbed.addFields({ name: 'Base32', value: `\`${base32.encode(data)}\`` });
        }
        if(!format || format == 'Base64') {
            encodeEmbed.addFields({ name: 'Base64', value: `\`${Buffer.from(data).toString('base64')}\`` });
        }
        if(!format || format == 'Hex') {
            encodeEmbed.addFields({ name: 'Hex', value: `\`${Buffer.from(data).toString('hex')}\`` });
        }
        if(!format || format == 'URI') {
            encodeEmbed.addFields({ name: 'URI', value: `\`${encodeURIComponent(data)}\`` });
        }

		await interaction.reply({ embeds: [encodeEmbed] });
	},
};