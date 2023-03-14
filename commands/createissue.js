const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle  } = require('discord.js');

class Builder
{
	constructor(id = String, label = String, isRequired = Boolean, value = String, style = TextInputStyle)
	{
		const txt = new TextInputBuilder()
				.setCustomId(id)
				.setLabel(label)
				.setRequired(isRequired)
				.setValue(value)
				.setStyle(style);

		return txt;
	};
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createissue')
		.setDescription('Crea un issue su GitHub!'),
	async execute(interaction) {
		const modal = new ModalBuilder()
				.setCustomId("sendissue")
				.setTitle("Crea un Issue su GitHub");
		
		const titleInput = new Builder("title", "Titolo", true, "Inserisci il titolo", TextInputStyle.Short);
		const descriptionInput = new Builder("description", "Descrizione", true, "Descrizione accurata con tutti i dettagli.", TextInputStyle.Paragraph);

		modal.addComponents(new ActionRowBuilder().addComponents(titleInput), new ActionRowBuilder().addComponents(descriptionInput));

		await interaction.showModal(modal);
	},
};