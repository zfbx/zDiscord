/* en - English Translations by zfbx
 * Strings wrapped in { } will be auto-replaced with updated values
 * Globals: {servername}, {invite}, (all from config) and {playercount} (current connected players)
 *
 * NOTES:
 * translations starting with cmd_ need to be all lowercase a-z, no spaces and limited to 1-32 characters.
 * translations starting with desc_ has to be between 1-100 characters
 */

module.exports = {
    // Includes {name} + Globals
    checkingWhitelist: "Hi {name}, We're Checking your whitelist status..",
    discordNotOpen: "You must have discord open before starting FiveM (Restart both if problem persists)",
    fatalError: "Something went wrong fetching your whitelist status, please try again in a bit or contact support in the discord if problem persists.",
    notInDiscordServer: "You are not in the {servername} Discord, please join here: {invite}",
    notWhitelisted: "You do not have the {servername} discord role required to join this server, are you whitelisted?",
    directMessage: "STAFF",

    // Staffchat (in game)
    staffchat: "STAFFCHAT",
    cmd_staffchat: "/staff",
    desc_staffchat: "Send message to other staff (Staff only)",
    cmd_staffchat_toggle: "/stafftoggle",
    desc_staffchat_toggle: "Toggle staff chat messages",
    staffchat_message_var: "Message",
    staffchat_message_help: "Message to send to other staff",
    staffchat_enabled: "Staff chat enabled.",
    staffchat_disabled: "Staff chat disabled.",

    // Generic Phrases
    message_sent: "Message sent.",
    invalid_id: "The provided ID seems invalid.",
    reason: "Reason",
    nobody_online: "Nobody is online.",
    player_not_loaded: "Player not loaded in.",
    players_count: "Players ({count})",
    error: "⚠️ An error has occurred",
    no_permission: "⚠️ You don't have permission to do this.",
    invalid_item: "The following seems to be invalid: {item}",
    enabled: "Enabled",
    disabled: "Disabled",

    // pogination.js
    choose_page: "Choose Page",
    enter_page_number: "Enter Page Number",
    enter_valid_page_number: "{user}, Please enter a valid page number!\n`{number}` is not a valid page number!",

    // interactionCreate.js
    on_cooldown: "This command is on cooldown. try again later. (Default: {cooldown} seconds)",
    command_log: "{discordTag} ({discordId}) used {commandName} in {location} | {data}",

    // Command option labels for slash commands accepted characters: a-z-_ 1-32 characters long
    opt_message: "message",
    opt_message_desc: "message to use",
    opt_channel: "channel",
    opt_channel_desc: "Discord channel to use",
    opt_id: "id",
    opt_id_desc: "Player's in-game id",
    opt_preset: "preset",
    opt_preset_desc: "use a preset value",
    opt_to_player: "to_player",
    opt_to_player_desc: "teleport to another player",
    opt_dest_player: "dest_player",
    opt_dest_player_desc: "player to teleport them to",
    opt_x_desc: "x coordinate",
    opt_y_desc: "y coordinate",
    opt_z_desc: "z coordinate",
    opt_coords: "coords",
    opt_coords_desc: "location coordinates (x, y, z)",
    opt_location: "location",
    opt_location_desc: "location to go to",
    opt_role: "role",
    opt_role_desc: "which discord role?",

    // embed.js
    cmd_embed: "embed",
    desc_embed: "Send an embedded (fancy) message in a specified channel",
    opt_json: "json",
    opt_json_desc: "string of json data",
    opt_image: "image",
    opt_image_desc: "link to an image",
    opt_thumbnail: "thumbnail",
    opt_thumbnail_desc: "link to an image for thumbnail",
    opt_color: "color",
    opt_color_desc: "color code in hex format (example: #dd44ff)",
    opt_footer: "footer",
    opt_footer_desc: "footer message to use",
    opt_simple: "simple",
    opt_simple_desc: "simple to use embed creator",
    opt_complex: "complex",
    opt_complex_desc: "send an embed from a json string",
    opt_enabled: "enabled",
    opt_enabled_desc: "set enabled or disabled",

    // identifiers.js
    cmd_identifiers: "identifiers",
    desc_identifiers: "Get all of a player's identifiers",
    identifiers_privacy_warning: "Please respect privacy and avoid doxing players",
    identifiers_title: "{playerName}'s identifiers",
    identifiers_log: "{discordName} ({discordId}) pulled identifiers on {playerName} ({playerId})",

    // kick.js
    cmd_kick: "kick",
    desc_kick: "Kick a player from the city",
    kick_message_desc: "Kick message to show the user",
    kick_no_reason: "You've been kicked by staff.",
    kick_log: "{discordName} ({discordId}) kicked {playerName} ({playerId}). Reason: {reason}",
    kick_success: "{playerName} ({playerId}) has been kicked",

    // kickall.js
    cmd_kickall: "kickall",
    desc_kickall: "Kick every player in the city",
    kickall_log: "{discordName} ({discordId}) kicked {playerCount} players. Reason: {reason}",
    kickall_success: "All {playerCount} player(s) have been kicked.",

    // kill.js
    cmd_kill: "kill",
    desc_kill: "Kill a player in the city",
    kill_log: "{discordName} ({discordId}) killed {playerName} ({playerId})",
    kill_success: "{playerName} ({playerId}) has been killed.",

    // message.js
    cmd_message: "message",
    desc_message: "direct a message to a specific player",
    message_log: "{discordName} ({discordId}) sent a DM to {playerName} ({playerId}): {message}",
    message_success: "Message sent to {playerName} ({playerId})",

    // onlinecount.js
    cmd_onlinecount: "onlinecount",
    desc_onlinecount: "Number of players currently online",
    onlinecount_one_person: "There is 1 person online right now.",
    onlinecount_total: "There are {count} people online right now.",

    // players.js
    cmd_players: "players",
    desc_players: "Get list of current players in city",

    // clothingmenu.js
    cmd_clothingmenu: "clothing-menu",
    desc_clothingmenu: "Give a player the clothing menu",
    clothingmenu_log: "{discordName} ({discordId}) gave {playerName} ({playerId}) the clothing menu",
    clothingmenu_success: "Clothing menu given to {playerName} ({playerId})",

    // user-checkonline.js
    cmd_checkonline: "Check if In City",
    checkonline_offline: "{user} is offline right now.",
    checkonline_online: "{user} is online.",
    checkonline_connected: "{user} is connected but not yet loaded as a character.",
    checkonline_loaded: "{user} is online playing as {firstName} {lastName} ({citizenId})",

    // teleport.js
    cmd_teleport: "teleport",
    desc_teleport: "teleport a player somewhere",
    teleport_log: "{discordName} ({discordId}) teleported {playerName} ({playerId}) to {where}",
    teleport_success: "{playerName} ({playerId}) was teleported to {where}",
    opt_bring_vehicle: "bring_vehicle",
    opt_bring_vehicle_desc: "Bring the vehicle with?",

    // teleportall.js
    cmd_teleportall: "teleport-all",
    desc_teleportall: "teleport everyone to the same location",
    teleportall_success: "Teleported everyone to {where}",
    teleporall_log: "{discordName} ({discordId}) teleported everyone to {where}",

    // whitelist.js
    cmd_whitelist: "whitelist",
    desc_whitelist: "mange the active whitelist (non-persistent)",
    opt_add_role: "add_role",
    opt_add_role_desc: "Temp add role to whitelist (restart reverts to config)",
    opt_remove_role: "remove_role",
    opt_remove_role_desc: "Temp remove role from whitelist (restart reverts to config)",
    opt_toggle_whitelist: "toggle_whitelist",
    opt_toggle_whitelist_desc: "Enable / Disable whitelisting",
    whitelist_toggle: "Whitelist was {prevState} and is now {newState}",
    whitelist_already_whitelisted: "{role} is already whitelisted",
    whitelist_not_whitelisted: "{role} was not in the whitelist",
    whitelist_added: "{role} has been whitelisted till script restarts",
    whitelist_removed: "{role} has removed from whitelist till script restarts",

    // revive.js
    cmd_revive: "revive",
    desc_revive: "Set player health and stats to full",
    revive_success: "{playerName} ({playerId}) has been fully healed.",
    revive_log: "{discordName} ({discordId}) healed {playerName} ({playerId})",

    // reviveall.js
    cmd_reviveall: "revive-all",
    desc_reviveall: "Set all players health and stats to full",
    reviveall_success: "Everyone has been fully healed.",
    reviveall_log: "{discordName} ({discordId}) healed everyone",

};
