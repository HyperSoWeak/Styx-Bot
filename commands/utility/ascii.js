const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { accentColor } = require('../../config.json');

module.exports = {
	category: 'utility',
	data: new SlashCommandBuilder()
		.setName('ascii')
		.setDescription('None')
		.addStringOption(option =>
			option.setName('dec-hex-char')
				.setDescription('Leave blank to display the entire table')),
	async execute(interaction) {
		const str = interaction.options.getString('dec-hex-char');

		if(!str) {
			let table = "ASCII Table\n\n";
			table += "Dec  Hex   Char Dec  Hex   Char\n";
	
			for (let i = 0; i <= 63; i++) {
				const hex1 = i.toString(16).toUpperCase().padStart(2, '0');
				const char1 = i > 32 ? String.fromCharCode(i) : getDescription(i);
				const hex2 = (i+64).toString(16).toUpperCase().padStart(2, '0');
				const char2 = (i+64) != 127 ? String.fromCharCode(i+64) : getDescription(i+64);
	
				table += `${i.toString().padStart(3)}  0x${hex1}  ${char1.padEnd(3)}  ${(i+64).toString().padStart(3)}  0x${hex2}  ${char2.padEnd(3)}\n`;
			}
	
			const asciiTableEmbed = new EmbedBuilder()
				.setColor(accentColor)
				.setDescription(`\`\`\`${table}\`\`\``)
				
			await interaction.reply({ embeds: [asciiTableEmbed] });
		} else {
			let value;
			if (isHex(str)) {
				value = parseInt(str.substring(2), 16);
			} else if (isDec(str)) {
				value = parseInt(str);
			} else if (isChar(str)) {
				value = str[1].charCodeAt(0);
			} else {
				return interaction.reply({ content: 'Input format error!', ephemeral: true });
			}

			let table = "ASCII Table\n\n";
			table += "Dec  Hex   Char\n";

			const hex = value.toString(16).toUpperCase().padStart(2, '0');
			const char = value > 32 ? String.fromCharCode(value) : getDescription(value);
			table += `${value.toString().padStart(3)}  0x${hex}  ${char.padEnd(3)}\n`;

			const asciiTableEmbed = new EmbedBuilder()
				.setColor(accentColor)
				.setDescription(`\`\`\`${table}\`\`\``)
				
			await interaction.reply({ embeds: [asciiTableEmbed] });
		}
	},
};
  
function getDescription(charCode) {
	switch (charCode) {
		case 9:
		return 'TAB';
		case 10:
		return 'LF';
		case 13:
		return 'CR';
		case 32:
		return 'SPC';
		case 127:
		return 'DEL';
		default:
		return ' ';
	}
}

function isHex(str) {
	if (!/^0x[0-9A-Fa-f]+$/.test(str)) {
        return false;
    }
    const decimalValue = parseInt(str.substring(2), 16);
    return decimalValue >= 0 && decimalValue <= 127;
}

function isDec(str) {
	const num = Number(str);
    return Number.isInteger(num) && num >= 0 && num <= 127;
}

function isChar(str) {
	return str[0] == '\'' && str[2] == '\'';
}