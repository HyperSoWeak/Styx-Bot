const { Events } = require('discord.js');

const id = {
    hyper: '1072372014721011712',
    tpgtw: '611092027194605589'
};

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
        if(message.author.id == id.hyper) {
            if(Math.random() < 0.1) {
                await message.reply('你是甲');
            }
        }
        if(message.author.id == id.tpgtw) {
            await message.react('🈸');
        }
	},
};