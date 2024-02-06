const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { accentColor } = require('../../config.json');

module.exports = {
	category: 'minecraft',
	data: new SlashCommandBuilder()
		.setName('skin')
		.setDescription('Replies with Pong!')
		.addStringOption(option =>
			option.setName('username')
				.setDescription('Target minecraft username')
				.setRequired(true)),
	async execute(interaction) {
		const username = interaction.options.getString('username');
		const url = 'https://api.mojang.com/users/profiles/minecraft/' + username;

		const response = await fetch(url);
		if(!response.ok) {
			if(response.status == 404) {
				return interaction.reply(`User not found.`);
			}
			throw new Error(`Failed to fetch UUID from API. Status: ${response.status}`);
		}

		const data = await response.json();
		
		const skinEmbed = new EmbedBuilder()
			.setColor(accentColor)
			.setTitle(`${data.name}'s skin`)
			.setImage(`https://mc-heads.net/body/${data.id}`)
			.addFields(
				{ name: 'Download', value: `[Click Me](https://mc-heads.net/download/${data.id})` }
			)
			.setFooter({ text: 'Provided by MCHeads.', iconURL: `https://mc-heads.net/avatar/${data.id}` })

		interaction.reply({ embeds: [skinEmbed] })
	},
};