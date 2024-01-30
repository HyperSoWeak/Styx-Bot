const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token, mongodb_uri } = require('./config.json');
const mongoose = require('mongoose');
const uri = "mongodb+srv://hypersoweak:mCn1mf4pHrFfT25w@styx-bot.8b6tygo.mongodb.net/?retryWrites=true&w=majority";

const client = new Client({ intents: [3276799] });

client.commands = new Collection();
client.cooldowns = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

(async () => {
	const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
	try {
		await mongoose.connect(mongodb_uri, clientOptions);
		await mongoose.connection.db.admin().command({ ping: 1 });
		console.log("Successfully connected to MongoDB!");

		handleEvent();
		
		client.login(token);
	} catch(error) {
		console.error(error);
	}
})();


function handleEvent() {
	const eventsPath = path.join(__dirname, 'events');
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

	for (const file of eventFiles) {
		const filePath = path.join(eventsPath, file);
		const event = require(filePath);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
}