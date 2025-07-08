module.exports = {
	data: {
        name: "sns特定",
        description: "綾田のSNSを特定します。",
    },
	async execute(interaction) {
		await interaction.reply('Twitter:https://twitter.com/ShoichiAYADA\nInstagram:https://www.instagram.com/shoichiayada/\nFacebook:https://ja-jp.facebook.com/ShoichiAYADA');
	}
}