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
    await BotCommands.ai(interaction, prompt)

@tree.command(name="apply", description="Applies the specified Role to the Command Author", guild=discord.Object(id=BotConfig.guild_id))
@app_commands.describe(role="The Role")
@app_commands.rename(role="role")
async def apply_command(interaction, role: discord.Role):
    await BotCommands.apply_role(interaction, role)

@tree.command(name="remove", description="Removes the specified Role from the Command Author", guild=discord.Object(id=BotConfig.guild_id))
@app_commands.describe(role="The Role")
@app_commands.rename(role="role")
async def remove_command(interaction, role: discord.Role):
    await BotCommands.remove_role(interaction, role)

@tree.command(name="trackposition", description="adds user to p&l tracking json file", guild=discord.Object(id=BotConfig.guild_id))
@app_commands.describe(asset="The Asset you wish to track")
@app_commands.rename(asset="asset")
@app_commands.describe(quantity="The Quantity of the Asset")
@app_commands.rename(quantity="quantity")
@app_commands.describe(price="The Price of the Asset when you openned your Position")
@app_commands.rename(price="price")
@app_commands.describe(currency="The Currency you used to purchase the Asset")
@app_commands.rename(currency="price")
async def track_position_command(interaction, asset: str, quantity: str, price: str, currency: str):
    await BotCommands.track_position(interaction, asset, quantity, price, currency)

@bot.event  
async def on_ready():
    await tree.sync(guild=discord.Object(id=BotConfig.guild_id))
    await bot.change_presence(activity=discord.Activity(type=discord.ActivityType.listening, name="/help"))

    bot_start_time = datetime.now()
    print("ONLINE")

bot.run(BotConfig.token)