const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');    
const { Octokit } = require('octokit')

const octokit = new Octokit({ auth: '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' })
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) 
{
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if ('data' in command && 'execute' in command) 
    {
		client.commands.set(command.data.name, command);
	} 
    else 
    {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.InteractionCreate, async interaction => 
{
	if (interaction.isChatInputCommand())
    {
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) 
        {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
    
        try 
        {
            await command.execute(interaction);
        } 
        catch (error) 
        {
            console.error(error);
            if (interaction.replied || interaction.deferred) 
            {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } 
            else 
            {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
    
    if (!interaction.isModalSubmit()) return;

	await octokit.rest.issues.create({
        owner: "Omega-SCP",
        repo: "OmegaCore",
        title: interaction.fields.getTextInputValue("title"),
        body: interaction.fields.getTextInputValue("description") + `\nIssue creato da: ${interaction.user.username + "#" + interaction.user.discriminator}`,
        labels: 
        [
            'bug'
        ]
    });

    interaction.reply({ content: "Issue creato con successo", ephemeral: true})
});

client.login(token);