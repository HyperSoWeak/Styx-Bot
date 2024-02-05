const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	ownerOnly: true,
	cooldown: 0,
	category: 'owner',
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Say anything as the bot!')
		.setDefaultMemberPermissions('0')
		.setDMPermission(false)
		.addStringOption(option =>
			option.setName('message')
				.setDescription('The message to say')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reply-msg-id')
				.setDescription('If given, the bot will reply to the message with this id')),
	async execute(interaction) {
		const message = interaction.options.getString('message');
		const replyMsgId = interaction.options.getString('reply-msg-id');

		if(!replyMsgId) {
			await interaction.channel.send(message);
			return interaction.reply({ content: 'Success!', ephemeral: true });
		}

		const msgToReply = await interaction.channel.messages.fetch(replyMsgId);
		await msgToReply.reply(message);
		return interaction.reply({ content: 'Success!', ephemeral: true });
	},
};