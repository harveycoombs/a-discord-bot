from ai import BotAI
from embeds import BotEmbeds

class BotCommands:
    def about(interaction, bot_start_time):
        return BotEmbeds.bot_information(interaction.client, bot_start_time)

    def ai(interaction, prompt):
        response = BotAI.gpt_response(prompt)

        if len(response) >= 2000:
            return response.split("\n")
        else: 
            return [f"{response}"]

    async def apply_role(interaction, member, role):
        target_role = discord.utils.get(interaction.guild.roles, name=role)

        if target_role:
            await member.add_roles(target_role)
            return f":white_check_mark: Role: `{role}` successfully applied to `{member}`"
        else:
           return f":warning: Unable to apply role: `{role}` to `{member}`"        

    #def remove_role(interaction):
        