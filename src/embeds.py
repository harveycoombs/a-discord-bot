import discord
import re

from config import BotConfig
from tools import BotTools

def format_mentioned_users(message):
    formatted = message.content

    for match in re.finditer(r'^<@([0-9]{1,})>$', formatted):
        mentioned_user_id = int(match.group(1).strip())
        mentioned_user = next((user for user in message.mentions if user.id == mentioned_user_id), None)

        formatted = formatted.replace(f"<@{mentioned_user_id}>", f"@{mentioned_user.name}")

    return formatted

class BotEmbeds:
    def deleted_message(msg):
        message_content = format_mentioned_users(msg)

        embed = discord.Embed(
            description=f":wastebasket: `{message_content}`" if len(message_content) > 0 else "",
            color=BotConfig.embed_color
        )

        if len(msg.attachments) > 0:
            embed.set_image(url=msg.attachments[0].url)

        embed.set_author(name=f"{msg.author} | Message Deleted", icon_url=msg.author.avatar)
        embed.set_footer(text=f"in #{msg.channel}")

        return embed

    def edited_message(old, new):
        old_message_content = format_mentioned_users(old)
        new_message_content = format_mentioned_users(new)

        embed = discord.Embed(
            description=f"`{old_message_content}` :pencil2: `{new_message_content}`",
            color=BotConfig.embed_color
        )

        embed.set_author(name=f"{old.author} | Message Edited", icon_url=old.author.avatar)
        embed.set_footer(text=f"in #{old.channel}")

        return embed

    def added_member(member):
        embed = discord.Embed(
            description=f":inbox_tray: Joined Discord `{BotTools.format_age(member.guild.created_at)}` ago",
            color=BotConfig.embed_color
        )

        embed.set_author(name=f"{member} | User Joined", icon_url=member.avatar)
        embed.set_footer(text=f"{member.guild} now has {member.guild.member_count} members", icon_url=member.guild.icon_url)

    def removed_member(member):
        embed = discord.Embed(
            description=f":outbox_tray: Joined Discord `{BotTools.format_age(member.guild.created_at)}` ago",
            color=discord.Color.from_rgb(235, 92, 64)
        )

        embed.set_author(name=f"{member} | User Left", icon_url=member.avatar)
        embed.set_footer(text=f"{member.guild} now has {member.guild.member_count} members")

        return embed

    def bot_information(bot, bot_start_time):
        uptime = BotTools.format_age(bot_start_time)

        embed = discord.Embed(color=BotConfig.embed_color)

        embed.add_field(name=":man_technologist: Developer", value="<@938196905144496139>", inline=True)
        embed.add_field(name=":tools: Language", value="`Python 3.11.8`", inline=True)
        embed.add_field(name=":alarm_clock: Uptime", value=f"`{uptime}`", inline=True)

        embed.set_author(name=f"{bot.user} | About this Bot", icon_url=bot.user.avatar)

        return embed