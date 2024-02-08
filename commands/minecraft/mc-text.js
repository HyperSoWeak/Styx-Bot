const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, registerFont } = require('canvas');
const { accentColor } = require('../../config.json');

registerFont('resources/fonts/MinecraftRegular-Bmg3.otf', { family: 'Minecraft' });

module.exports = {
	category: 'minecraft',
	data: new SlashCommandBuilder()
		.setName('mc-text')
		.setDescription('Write a message with Minecraft font.')
		.addStringOption(option =>
			option.setName('message')
				.setDescription('The message to write in Minecraft font')
				.setRequired(true)),
	async execute(interaction) {
		const message = interaction.options.getString('message');
        const imageBuffer = createImageWithText(message);
        const attachment = new AttachmentBuilder(imageBuffer, { name: 'image.png' });

		interaction.reply({ content: "hi", files: [attachment] })
	},
};

function createImageWithText(text) {
    const canvas = createCanvas(400, 200);
    const context = canvas.getContext('2d');

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = '30px Arial';
    context.fillStyle = 'blue';
    context.fillText(text, 10, 50);

    return canvas.toBuffer();
}