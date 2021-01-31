import discord
import requests
import json
from discord.ext import commands
from discord.utils import get


# Constants
TOKEN = 'ODA1MTg4Njk4MjUzNjg4ODQz.YBXQaQ.vSqL3djzDqWVTDyDnzeNPUeyOs4'
ADMIN_ROLE_NAME = 'Tester'
JOIN_CHANNEL_ID = '805189024200785964'

GET_USER = 'http://localhost:5000/api/bot/user/'
LEAVE_USER = 'http://localhost:5000/api/bot/leave/'


# Client
intents = discord.Intents.all()
client = commands.Bot(command_prefix="$ ", intents=intents)

@client.event
async def on_ready():
    print("We have logged in as {0.user}".format(client))


# On member join, send GET request to retrieve user object
# TO-DO: Get partner ID, create private category + channel for both
@client.event
async def on_member_join(member):
    guild = member.guild

    channel = discord.utils.get(guild.channels, name='general')
    channel_id = channel.id
    await channel.send(f"{member} has arrived!")
    id = member.id
    r = requests.get(GET_USER+str(id))

    data = r.text

    if r.status_code == 404:
        await member.kick()
        return
    
    user_info = json.loads(data)

    partner = None
    try:
        partner_id = user_info[0]['partnerID']
        print(partner_id)
        partner = await client.get_user(partner_id)
        print(partner)
        print(partner.roles)
        viber = partner.roles[0]
        await member.add_roles(viber)
        return
    except:
        if not partner_id:
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
    if partner:
        await partner.add_roles(viber)
    await channel.send('pong!')



# Create private category + channels and assign role
@client.event
async def on_message(message):  
    if message.channel.name == "general":
        if message.content  == 'ping':
            guild = message.guild

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

            await message.author.add_roles(viber)
            await message.channel.send('pong!')


    await client.process_commands(message)


# Send GET_USER request
@client.command(name='hello()')
async def _hello(ctx):
    await ctx.channel.send("\> Hello!")
    id = ctx.message.author.id
    r = requests.get(GET_USER+str(id))

    channel = discord.utils.get(ctx.guild.channels, name='general')
    channel_id = channel.id

    data = r.text
    user_info = json.loads(data)

    user_id = user_info[0]['discordID']
    partner_id = user_info[0]['partnerID']

    partner = client.get_user(partner_id)
    user = await client.fetch_user(user_id)


# Kick user and delete category + channels
@client.command(name='done()')
async def _done(ctx):
    guild = ctx.guild
    category = ctx.channel.category 
    user = ctx.message.author

    await user.kick()
    r = requests.post(LEAVE_USER+str(user.id))

    await ctx.send(f"**{user}** has been kicked for **no reason**.")

    for channel in category.channels:
        if channel:
            await channel.delete()
    await category.delete()





# Delete all Vibe cateogories + channels
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