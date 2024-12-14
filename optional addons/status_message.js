/**
 * This file is part of zdiscord.
 * Copyright (C) 2021 Tony/zfbx
 * source: <https://github.com/zfbx/zdiscord>
 *
 * This work is licensed under the Creative Commons
 * Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
 * or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
 *
 * This Addon was created by [ItzDabbzz](https://github.com/ItzDabbzz)
 *
 * This addon sends a message with status updates every x number of minutes in a specified channel
 * copy this into your `server/addons` folder and edit the channelId to the channel id you want messages sent.
 */

const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");


class StatusMessage {
    constructor(z) {
        // Minutes
        this.timerDelay = 5;
        // Channel id to send server status updates
        this.channelId = "000000000000000000";
        // City join ip
        this.cityJoinURL = 'https://cfx.re/join/';
        // store message id so we can edit it later
        this.messageId = null;
        // object to store players in the city
        this.inCity = {}


        this.z = z;
        on("zdiscord:ready", async () => {
            this.post();
            this.start();
        });
    }

    async start() {
        setInterval(() => {
            this.post();
        }, 1000 * 60 * this.timerDelay);

        on("playerJoining", async (oldId) => {
            const source = global.source;
            const member = this.z.bot.getMemberFromSource(source);
            if (!member) return;
            const playerName = GetPlayerName(source);
            this.inCity[member.id] = {
                name: playerName,
                id: source,
            }
            this.post();
        })

        on("playerDropped", async (reason) => {
            const source = global.source;
            const member = this.z.bot.getMemberFromSource(source);
            delete this.inCity[member.id];
            this.post();
        })
    }

    async post() {
        try {
            const channel = await this.z.bot.channels.fetch(this.channelId);
            let playerMessage = `**Current Connected Player(s):**\n\n`;

            for (const [key, value] of Object.entries(this.inCity)) {
                playerMessage += `[${value.id}] ${value.name} - <@${key}>\n`;
            }

            if (Object.keys(this.inCity).length === 0) playerMessage = "No Players Online";

            const embed = new MessageEmbed()
                .setTitle(`${this.z.config.FiveMServerName}`)
                .setDescription(`${playerMessage}\n`)
                .addFields(
                    {
                        name: "Online Players",
                        value: `\`\`\`${GetNumPlayerIndices()}/${GetConvar("sv_maxClients", "48")}\`\`\``,
                        inline: true
                    },
                    {
                        name: "Uptime",
                        value: `\`\`\`${z.utils.timeformat((GetGameTimer() / 1000))}\`\`\``,
                        inline: true
                    }
                )
                .setColor("#00ff00")
                .setTimestamp()
            const join = new MessageButton()
                .setLabel('Join City')
                .setURL(this.cityJoinURL)
                .setStyle('LINK')
            const row = new MessageActionRow()
                .addComponents(join);

            if (this.messageId) {
                const message = await channel.messages.fetch(this.messageId);
                message.edit({ embeds: [embed] });
            } else {
                const message = await channel.send({
                    embeds: [embed],
                    components: [row],
                });
                this.messageId = message.id;
            }
        }
        catch (e) {
            this.z.utils.log.error(e);
        }
    }

}

module.exports = StatusMessage;
