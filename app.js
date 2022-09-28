const token = ""

const { Client, GatewayIntentBits, Partials } = require("discord.js");

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

bot.on("ready", async () => {

	console.log("ready")

})

bot.on("messageCreate", (message) => {

	// console.log(message.content)

	const authorId = message.author.id
	const authorName = message.author.username

	// console.log(`author: ${authorName} id: ${authorId}`)
	
	// console.log("content: "+message.content)

	if ( message.content === "hi") {
		
		// message.reply(dayjs().format(LLLL))

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

bot.on("messageReactionAdd", (reaction,user) => {

	// console.log(reaction._emoji.name,user.tag)

	const { guild } = reaction.message

	if ( reaction.message.id == 1024803956318285834 ) {

		// console.log(reaction._emoji.name,user.tag)

		// console.log(toUTF16(reaction._emoji.name.codePointAt(0)))

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

	if ( reaction.message.id == 1024803956318285834 ) {

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
