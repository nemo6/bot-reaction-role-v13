const token = ""

const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require("discord.js")

const bot = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMessageReactions
	],
	partials: [Partials.Message, Partials.Reaction],
})

var o1 = {

	hour: "numeric",
	minute: "numeric",
	second: "numeric"
}

const dayjs = require("dayjs")

require("dayjs/locale/fr")
dayjs.locale("fr")

LLLL = "dddd DD MMMM YYYY HH:mm:ss"

bot.on("ready", () => console.log("connect") )

bot.on("messageCreate", (message) => {

	const id = message.author.id
	const name = message.author.username

	if (message.author.bot) return;

	const user = message.mentions.users.first() || message.author

	/*message.channel.send({
		embeds:[
		new EmbedBuilder()
		.setTitle(`Bienvenue ${name} !`)
		.setDescription(`🎉 Bienvenue sur le serveur Ile de France WORLD 🎉!
		N'oublier pas de valider les règles dans #règles puis ensuite de prendre vos rôles dans #rôles
		\n${dayjs().format(LLLL)}`)
		.setColor("Red")
		// .setImage(user.displayAvatarURL())
		.setThumbnail(user.displayAvatarURL())
		// .setTimestamp()
	]})*/

	if ( (/http:|https:/).test(message.content) ){

		message.delete()

		message.channel.send("not allowed")
	}

	if ( message.content === "hi") {

		let mcRole = message.guild.roles.cache.find( role => role.name === "blue" )

		console.log("add!",mcRole.name)

		message.member.roles.add(mcRole)

		return;

	}

	else if ( message.content == "bye") {

		let mcRole = message.guild.roles.cache.find( role => role.name === "blue" )

		console.log("remove!",mcRole.name)

		message.member.roles.remove(mcRole)

		return;
	}

	return;

})

id_reaction_message = 1027159268056637510

bot.on("messageReactionAdd", (reaction,user) => {

	const { guild } = reaction.message

	if ( reaction.message.id == id_reaction_message ) {

		if (reaction._emoji.name == "\uD83D\uDE0E" ){ // emoji :sun-glasses:

			let mcRole = guild.roles.cache.find(role => role.name === "red" )

			let member = guild.members.cache.find(member => member.id === user.id)

			console.log("add!",mcRole.name)

			member.roles.add(mcRole)

		}
    
	}

	return;
	
})

bot.on("messageReactionRemove", (reaction,user) => {

	const { guild } = reaction.message

	if ( reaction.message.id == id_reaction_message ) {

		let mcRole = guild.roles.cache.find(role => role.name === "red" )

		let member = guild.members.cache.find(member => member.id === user.id)

		console.log("remove!",mcRole.name)

		member.roles.remove(mcRole)
	}

	return;
  
})

bot.login(token)

function toUTF16(codePoint) {

	let TEN_BITS = parseInt('1111111111', 2)

	function u(codeUnit) {
		return '\\u'+codeUnit.toString(16).toUpperCase()
	}

	if (codePoint <= 0xFFFF) {
		return u(codePoint)
	}
	codePoint -= 0x10000

	// Shift right to get to most significant 10 bits
	let leadSurrogate = 0xD800 + (codePoint >> 10)

	// Mask to get least significant 10 bits
	let tailSurrogate = 0xDC00 + (codePoint & TEN_BITS)

	return u(leadSurrogate) + u(tailSurrogate)
	
}
