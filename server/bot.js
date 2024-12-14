/**
 * This file is part of zdiscord.
 * Copyright (C) 2021 Tony/zfbx
 * source: <https://github.com/zfbx/zdiscord>
 *
 * This work is licensed under the Creative Commons
 * Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
 * or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
 */

const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, WebhookClient } = require("discord.js");
const { readdirSync } = require("fs");

class Bot extends Client {

    constructor(z) {
        super({
            intents: 14335,
            fetchAllMembers: true,
            messageCacheMaxSize: 10,
        });
        this.enabled = z.config.EnableDiscordBot;
        this.z = z;
        this.config = z.config;
        this.QBCore = z.QBCore;
        this.log = z.utils.log;
        this.utils = z.utils;
        this.Embed = MessageEmbed;
        this.commands = new Collection();
        this.webhooks = new Collection();
        this.arrayOfCommands = [];

        if (this.enabled) this.start();
    }

    start() {
        this.utils.log.assert((process.version == "v12.13.0"), "You are running unsupported artifacts, download a newer artifact or revert to version 4.0.0 of zdiscord");
        this.utils.log.assert((this.config.DiscordBotToken == "CHANGE"), "This module requires a discord bot token to run. Check the config.js");
        this.utils.log.assert((this.config.DiscordGuildId == "000000000000000000"), "This resource requires a discord guildid to work properly. Check the config.js");
        this.utils.log.assert(!(this.utils.isValidID(this.config.DiscordGuildId)), "Your DiscordGuildId doesn't seem correct");
        this.utils.log.assert(!(this.utils.isValidID(this.config.DiscordModRoleId)), "Your DiscordModRoleId doesn't seem correct");
        this.utils.log.assert(!(this.utils.isValidID(this.config.DiscordAdminRoleId)), "Your DiscordAdminRoleId doesn't seem correct");
        this.utils.log.assert(!(this.utils.isValidID(this.config.DiscordGodRoleId)), "Your DiscordGodRoleId doesn't seem correct");
        this.utils.log.assert(this.config.EnableStaffChatForwarding && !(this.utils.isValidID(this.config.DiscordStaffChannelId)), "Your DiscordStaffChannelId doesn't seem correct");

        if (this.config.EnableDiscordSlashCommands) this.loadCommands();
        this.loadEvents();

        if (this.config.DebugLogs) this.on("debug", (debug) => this.log.handler("log", debug));
        this.on("warn", (warning) => this.log.handler("warn", warning));
        this.on("error", (error) => this.log.handler("error", error));

        this.login(this.config.DiscordBotToken).catch((e) => this.log.handler("error", e));
    }

    loadCommands() {
        const commandFiles = readdirSync(`${this.z.root}/server/commands`).filter(file => file.endsWith(".js"));
        for (const file of commandFiles) {
            const command = require(`${this.z.root}/server/commands/${file}`);
            if (!command?.name) continue;
            if (command.args || command.alias) {
                this.log.warn(`${file} is an v4 or later command and is not supported, upgrade it or remove it`);
                continue;
            }
            if (this.commands.has(command.name)) {
                this.log.warn(`${file} is using a name that's already been registered by another command [skipping]`);
                continue;
            }
            if (file.startsWith("qb-") && !this.QBCore) continue;
            this.commands.set(command.name, command);
            if (["MESSAGE", "USER"].includes(command.type)) delete command.description;
            this.arrayOfCommands.push(command);
        }
    }

    loadEvents() {
        const eventFiles = readdirSync(`${this.z.root}/server/events`).filter(file => file.endsWith(".js"));
        for (const file of eventFiles) {
            const event = require(`${this.z.root}/server/events/${file}`);
            if (event.once) this.once(event.name, (...args) => event.run(this, ...args));
            else this.on(event.name, (...args) => event.run(this, ...args));
        }
    }


    /**
     * Creates a pagination embed
     * credit to https://github.com/ryzyx/discordjs-button-pagination
     * @param {Interaction} interaction - the message interaction to react to
     * @param {MessageEmbed[]} pages - array of embeds
     * @param {MessageButton[]} buttonList - Must be 2 button objects
     * @param {number} timeout - Optional length of time to allow responses
     * @returns {Interaction} current page
     */
    async paginationEmbed(interaction, pages, buttonList, timeout = 120000) {
        let page = 0;
        const row = new MessageActionRow().addComponents(buttonList);
        if (interaction.deferred == false) await interaction.deferReply();
        const curPage = await interaction.editReply({
            embeds: [pages[page].setFooter({ text: `Page ${page + 1} / ${pages.length}` })],
            components: [row], fetchReply: true,
        });
        const filter = (i) => i.customId === buttonList[0].customId || i.customId === buttonList[1].customId;
        const collector = await curPage.createMessageComponentCollector({ filter, time: timeout });
        collector.on("collect", async (i) => {
            switch (i.customId) {
            case buttonList[0].customId:
                page = page > 0 ? --page : pages.length - 1;
                break;
            case buttonList[1].customId:
                page = page + 1 < pages.length ? ++page : 0;
                break;
            default:
                break;
            }
            await i.deferUpdate();
            await i.editReply({ embeds: [pages[page].setFooter({ text: `Page ${page + 1} / ${pages.length}` })], components: [row] });
            collector.resetTimer();
        });
        collector.on("end", () => {
            const disabledRow = new MessageActionRow().addComponents(buttonList[0].setDisabled(true), buttonList[1].setDisabled(true));
            curPage.edit({ embeds: [pages[page].setFooter({ text: `Page ${page + 1} / ${pages.length}` })], components: [disabledRow] }).catch(console.error);
        });
        return curPage;
    }

    /** Get discord member object by userid
     * @param {number} userid - discordid
     * @returns {object|boolean} - discord member or false */
    getMember(userid) {
        const guild = this.guilds.cache.get(this.config.DiscordGuildId);
        if (!guild) {
            this.utils.log.error("Failed to fetch Discord server.");
            return false;
        }
        return guild.members.cache.get(userid) || false;
    }

    /** Get discord member object by source
     * @param {number} id - Player ID / source
     * @returns {object|boolean} - discord member or false */
    getMemberFromSource(id) {
        const ids = this.utils.getPlayerIdentifiers(id);
        if (!ids.discord) return false;
        return this.getMember(ids.discord);
    }

    /** take any sort of identifier and try to parse a discord member from it
     * @param {number|string|object} member - source | discordid | member object
     * @returns {object|boolean} - discord member or false */
    parseMember(member) {
        if (!member || !this.enabled) return false;
        if (typeof member === "number") {
            return this.getMemberFromSource(member);
        } else if (typeof member === "string") {
            return this.getMember(member);
        } else { return member || false; }
    }

    /** Returns true if a role is found by id or array of ids
     * @param {number|object|string} member - source | member | discordid
     * @param {string|object} role - Role ID or Role IDs
     * @returns {boolean} - true if role was found, false otherwise */
    isRolePresent(member, role) {
        if (!role || !member || !this.enabled) return false;
        member = this.parseMember(member);
        if (!member) return false;
        if (typeof role === "object") {
            let found = false;
            role.forEach(function(item) {
                if (member.roles.cache.has(item)) found = true;
            });
            return found;
        } else {
            return member.roles.cache.has(role);
        }
    }

    /** get array of discord member roles by id
     * @param {number|object|string} member - source | member | discordid
     * @returns {Array} - array of role ids */
    getMemberRoles(member) {
        if (!member || !this.enabled) return [];
        member = this.parseMember(member);
        if (!member) return [];
        return member.roles.cache.map(r => r.id);
    }

    /** Get the highest role of a discord member
     * @param {number|object|string} member - source | member | discordid
     * @returns {String|null} - Highest role object or null if no roles
     */
    getMemberHighestRole(member) {
        if (!member || !this.enabled) return null;
        member = this.parseMember(member);
        if (!member) return null;
        const role = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .first();
        if (!role) return null;
        return role.name;
    }

    hasPermission(member, level) {
        switch (level) {
        case "mod":
            return (
                member.roles.cache.has(this.config.DiscordModRoleId) ||
                member.roles.cache.has(this.config.DiscordAdminRoleId) ||
                member.roles.cache.has(this.config.DiscordGodRoleId));
        case "admin":
            return (
                member.roles.cache.has(this.config.DiscordAdminRoleId) ||
                member.roles.cache.has(this.config.DiscordGodRoleId));
        case "god":
            return (member.roles.cache.has(this.config.DiscordGodRoleId));
        default:
            return true;
        }
    }

    /** Register a new webhook with a friendly name
     * @param {string} name - Friendly name to reference this webhook
     * @param {string} url - Discord webhook url
     * @returns {Promise<boolean>} - True if registration successful, false if failed
     */
    async registerWebhook(name, url) {
        try {
            const webhook = new WebhookClient({ url: url});
            this.webhooks.set(name, webhook);
            return true;
        } catch (error) {
            this.log.error(`Failed to register webhook ${name}: ${error}`);
            return false;
        }
    }

    /** Send a message through a registered webhook
     * @param {string} name - Friendly name of the registered webhook
     * @param {Object} options - Message options
     * @param {string} [options.title] - Embed title
     * @param {string} [options.description] - Embed description
     * @param {string} [options.color] - Hex color code
     * @param {string} [options.footer] - Footer text
     * @param {string} [options.username] - Override webhook username
     * @param {string} [options.avatarURL] - Override webhook avatar
     * @returns {Promise<boolean>} - True if message sent successfully, false if failed
     */
    async sendWebhookMessage(name, options) {
        const webhook = this.webhooks.get(name);
        if (!webhook) {
            this.log.error(`Webhook ${name} not found`);
            return false;
        }

        const embed = new MessageEmbed()
            .setTitle(options.title || '')
            .setDescription(options.description || '')
            .setColor(options.color || '#ffffff')
            .setTimestamp();

        if (options.footer) {
            embed.setFooter({ text: options.footer });
        }

        try {
            await webhook.send({
                username: options.username || webhook.name,
                avatarURL: options.avatarURL,
                embeds: [embed]
            });
            return true;
        } catch (error) {
            this.log.error(`Failed to send webhook message: ${error}`);
            return false;
        }
    }

}

module.exports = Bot;
