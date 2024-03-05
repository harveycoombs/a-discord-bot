# written & maintained by Harvey Coombs
import discord
from discord import app_commands, File
from datetime import datetime

from config import BotConfig
from tools import BotTools
from embeds import BotEmbeds
from commands import BotCommands

intents = discord.Intents.all()
bot = discord.Client(intents=intents)
tree = app_commands.CommandTree(bot)

bot_start_time = datetime.now()

@bot.event
async def on_message_delete(msg):
    if msg.author.id == BotConfig.bot_id: return

    embed = BotEmbeds.deleted_message(msg)

    log_channel = bot.get_channel(BotConfig.log_channel_id)
    await log_channel.send(embed=embed)

@bot.event
async def on_message_edit(old, new):
    if old.author.id == BotConfig.bot_id or old.content == new.content: return

    embed = BotEmbeds.edited_message(old, new)

    log_channel = bot.get_channel(BotConfig.log_channel_id)
    await log_channel.send(embed=embed)

@bot.event
async def on_member_join(member):
    embed = BotEmbeds.added_member(member)
    
    log_channel = bot.get_channel(BotConfig.log_channel_id)
    await log_channel.send(embed=embed)

@bot.event
async def on_member_remove(member):
    embed = BotEmbeds.removed_member(member)
    
    log_channel = bot.get_channel(BotConfig.log_channel_id)
    await log_channel.send(embed=embed)

@tree.command(name="about", description="Recieve information about this Bot", guild=discord.Object(id=BotConfig.guild_id))
async def about_command(interaction):
    command_result = BotCommands.about(interaction, bot_start_time)
    await interaction.response.send_message(embed=command_result)

@tree.command(name="ai", description="Interact with an LLM", guild=discord.Object(id=BotConfig.guild_id))
@app_commands.describe(prompt="The prompt for the LLM")
@app_commands.rename(prompt="prompt")
async def ai_command(interaction, prompt: str):
    await interaction.response.defer()

    response_sections = BotCommands.ai(interaction, prompt)

    for section in response_sections:
            if len(section) > 0:
                await interaction.followup.send(f"{section}")

@tree.command(name="apply", description="Apply a specified role to a specified user", guild=discord.Object(id=BotConfig.guild_id))
@app_commands.describe(user="The User")
@app_commands.rename(user="user")
@app_commands.describe(role="The Role")
@app_commands.rename(role="role")
async def apply_command(interaction, user: discord.Member, role: str):
    target_role = discord.utils.get(interaction.guild.roles, name=role)

    if target_role:
        await user.add_roles(target_role)
        await interaction.response.send_message(f":white_check_mark: Role: `{role}` successfully applied to `{user}`")
    else:
        await interaction.response.send_message(f":warning: Unable to apply role: `{role}` to `{user}`")

@bot.event  
async def on_ready():
    await tree.sync(guild=discord.Object(id=BotConfig.guild_id))
    bot_start_time = datetime.now()
    print("ONLINE")

bot.run(BotConfig.token)