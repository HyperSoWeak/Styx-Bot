const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { accentColor } = require('../../config.json');

module.exports = {
	unfinished: true,
	cooldown: 10,
	category: 'poll',
	data: createSlashCommand(),
	async execute(interaction) {
		const user = interaction.user;
		const question = interaction.options.getString('question');
		
		let choices = [];
		for(let i = 0; i <= 8; i++) {
			const letter = String.fromCharCode('a'.charCodeAt(0) + i);
			const choice = interaction.options.getString(`choice-${letter}`) ?? '';
			if(choice != '') {
				choices.push(choice);
			}
		}

		console.log(choices)

		let choicesText = choices.length == 0 ? '✅ Agree\n❌ Disagree' : ''
		choices.forEach((element, index) => {
			const letter = String.fromCharCode('a'.charCodeAt(0) + index);
			const emoji = `:regional_indicator_${letter}:`
			choicesText += `${emoji} ${element}\n`
		});

		const pollEmbed = new EmbedBuilder()
			.setColor(accentColor)
			.setThumbnail('https://cdn-icons-png.freepik.com/512/9449/9449270.png')
			.setTitle(`${question}`)
			.setDescription(choicesText)
			.setTimestamp()
			.setFooter({ text: `Poll created by ${user.globalName}`, iconURL: user.displayAvatarURL() })

		const message = await interaction.reply({ embeds: [pollEmbed], fetchReply: true });

		const reactionTable = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭']
		try {
			for(let i = 0; i < choices.length; i++) {
				await message.react(reactionTable[i]);
			}
			if(choices.length == 0) {
				await message.react('✅');
				await message.react('❌');
			}
		} catch (error) {
			console.error('One of the emojis failed to react:', error);
		}
	},
};

function createSlashCommand() {
	const command = new SlashCommandBuilder()
		.setName('simple-poll')
		.setDescription('Create a poll with reactions.')
		.addStringOption(option =>
			option.setName('question')
				.setDescription('If there is no option, it will be agree / disagree')
				.setRequired(true))

	for(let i = 0; i <= 8; i++) {
		const letter = String.fromCharCode('a'.charCodeAt(0) + i);
		command.addStringOption(option =>
			option.setName(`choice-${letter}`)
				//.setDescription('Type emoji at the front will change reaction, eg: :cactus: Cactus'))
				.setDescription('Choices is ordered but not required'))
	}

	return command
}