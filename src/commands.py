import requests
import json
from datetime import datetime

from ai import BotAI
from embeds import BotEmbeds
from tools import BotTools
from crypto import BotCrypto

class BotCommands:
    def about(interaction, bot_start_time):
        return BotEmbeds.bot_information(interaction.client, bot_start_time)

    async def ai(interaction, prompt):
        await interaction.response.defer()

        response = BotAI.gpt_response(prompt)
        response_sections = ""

        if len(response) >= 2000:
            response_sections = response.split("\n")
        else: 
            response_sections = [f"{response}"]

        for section in response_sections:
                if len(section) > 0:
                    await interaction.followup.send(f"{section}")

    async def apply_role(interaction, role):
        try:
            await interaction.user.add_roles(role)
            await interaction.response.send_message(f":white_check_mark: Role: `{role}` successfully applied to `{interaction.user}`")
        except:
            await interaction.response.send_message(f":warning: Unable to apply Role: `{role}` to `{interaction.user}`")

    async def remove_role(interaction, role):
        try:
            await interaction.user.remove_roles(role)
            await interaction.response.send_message(f":white_check_mark: Role: `{role}` successfully removed from `{interaction.user}`")
        except:
            await interaction.response.send_message(f":warning: Unable to remove Role: `{role}` from `{interaction.user}`")

    async def track_position(interaction, asset, quantity, price, currency):
        await interaction.response.defer()
        response = BotCrypto.add_position(interaction.user.id, asset, quantity, price, currency)