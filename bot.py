import discord
import requests
import json
from discord.ext import commands
from discord.utils import get

# Constants
TOKEN = 'ODA1MTg4Njk4MjUzNjg4ODQz.YBXQaQ.vSqL3djzDqWVTDyDnzeNPUeyOs4'
ADMIN_ROLE_NAME = 'admin'
JOIN_CHANNEL_ID = '805189024200785964'

GET_USER = 'http://localhost:5000/api/bot/user/'
LEAVE_USER = 'http://localhost:5000/api/bot/leave/'

# Client
intents = discord.Intents.default()
intents.members = True
client = commands.Bot(command_prefix="$ ", intents=intents)

@client.event
async def on_ready():
    print("We have logged in as {0.user}".format(client))

@client.event
async def on_member_join(member):
    await client.wait_until_ready()
    guild = member.guild
    discord_id = member.id
    r = requests.get(GET_USER+str(discord_id))
    data = r.text

    if r.status_code == 404:
        await member.kick()
        return
    
    user_info = json.loads(data)
    partner_id = user_info[0]['partnerID']
    if partner_id:
        print(partner_id)
        partner = guild.get_member(int(partner_id))
        print(partner)
        if partner is not None:
            roles = partner.roles
            for role in roles:
                if role.name == 'Viber':
                    await member.add_roles(role)
                    return
    else:
        await member.kick()
        return

    viber = await guild.create_role(name=f'Viber', mentionable=True)
    permissions = {
        guild.default_role: discord.PermissionOverwrite(view_channel=False),
        viber: discord.PermissionOverwrite(view_channel=True)
    }

    category = await guild.create_category(f"Vibe",overwrites=permissions)   
    text = await category.create_text_channel("text")
    voice = await category.create_voice_channel("Voice")

    await text.edit(permissions_synced = True)
    await voice.edit(permissions_synced = True)

    category.position = 100

    await member.add_roles(viber)
    await text.send("Welcome!")

# Send GET_USER request
@client.command(name='hello()')
async def _hello(ctx):
    await ctx.channel.send("\> Hello!")

# Kick user and delete category + channels
@client.command(name='done()')
async def _done(ctx):
    guild = ctx.guild
    category = ctx.channel.category 
    user = ctx.message.author
    r = requests.get(GET_USER+str(discord_id))
    data = r.text
    user_info = json.loads(data)
    partner_id = user_info[0]['partnerID']
    partner = guild.get_member(int(partner_id))

    await guild.kick(partner)
    await user.kick()
    r = requests.post(LEAVE_USER+str(user.id))

    await ctx.send(f"**{user}** has been kicked for **no reason**.")

    for channel in category.channels:
        if channel:
            await channel.delete()
    await category.delete()

@client.command(name='cleanup()')
async def _cleanup(ctx):
    guild = ctx.guild
    if isAdmin(ctx, ADMIN_ROLE_NAME):
        roles = guild.roles
        categories = guild.categories

        for role in roles:
            if "Viber" in role.name:
                await role.delete()

        for category in categories:
            if "Vibe" in category.name:
                for channel in category.channels:
                    if channel:
                        await channel.delete()
                await category.delete()
        
        await ctx.send("\> Done!")
    else:
        await ctx.channel.send("\> You are not authorized to use that command!")

def isAdmin(message, roleName):
    return roleName.lower() in [role.name.lower() for role in message.author.roles]

client.run(TOKEN)