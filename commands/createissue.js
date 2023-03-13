const { SlashCommandBuilder, ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle  } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createissue')
		.setDescription('Crea un issue su GitHub!'),
	async execute(interaction) {
		const modal = new ModalBuilder()
				.setCustomId("sendissue")
				.setTitle("Crea un Issue su GitHub");
		
		const titleInput = new TextInputBuilder()
				.setCustomId("title")
				.setLabel("Titolo")
				.setRequired(true)
				.setStyle(TextInputStyle.Short);

		const descriptionInput = new TextInputBuilder()
				.setCustomId("description")
				.setLabel("Descrizione")
				.setRequired(true)
				.setValue("Descrizione accurata con tutti i dettagli.")
				.setStyle(TextInputStyle.Paragraph);

		modal.addComponents(new ActionRowBuilder().addComponents(titleInput), new ActionRowBuilder().addComponents(descriptionInput));

		await interaction.showModal(modal);
	},
};
