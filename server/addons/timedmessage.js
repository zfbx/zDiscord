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
 *
 * This addon sends a message with status updates every x number of minutes in a specified channel
 * copy this into your `server/addons` folder and edit the channelId to the channel id you want messages sent.
 */

module.exports = class TimedMessage {
    constructor(z) {
        this.messageId = zconfig.TimedMessageMessageId || null;
        this.z = z;

        on("zdiscord:ready", async () => {
            this.start();
        });
    }

    async start() {
        if (!zconfig.TimedMessageEnabled) return;
        const channel = await zbot.channels.fetch(zconfig.TimedMessageChannelId).catch(console.error);
        if (!channel) {
            zlog.error("Timed Message channel Id is invalid. Disabling TimedMessage");
            return;
        }
        if (this.messageId) {
            const message = await channel.messages.fetch(this.messageId).catch(console.error);
            if (!message) {
                zlog.warn("Timed Message Message Id could not be found. Starting new message.");
            }
        }
        this.post();
        setInterval(() => {
            this.post();
        }, 1000 * 60 * zconfig.TimedMessageUpdateInterval);
    }

    async post() {
        const channel = await zbot.channels.fetch(zconfig.TimedMessageChannelId).catch(console.error);
        let msg = `**Uptime:** ${(GetGameTimer() / 1000 / 60).toFixed(2)} minutes\n`;
        if (zconfig.FivemUrl) msg += `**Direct Connect:** F8 > ${zconfig.FivemUrl}\n`;
        msg += `**Online Players:** ${GetNumPlayerIndices()}/${GetConvar("sv_maxClients", "48")}\n`;
        if (zconfig.Invite) msg += `**Discord:** [Discord](${zconfig.Invite})\n`;

        const embed = new djs.EmbedBuilder()
            .setTitle(`${zconfig.FivemName}`)
            .setDescription(msg)
            .setColor(zconfig.ThemeColor)
            .setTimestamp()
            .setFooter({ text: "Powered by zdiscord" });
        if (zconfig.TimedMessageReuseMessage && this.messageId !== null) {
            const message = await channel.messages.fetch(this.messageId).catch(console.error);
            if (message) message.edit({ embeds: [embed] }).catch(console.error);
        } else {
            const message = await channel.send({ embeds: [embed] }).catch(console.error);
            if (message) this.messageId = message.id;
            if (zconfig.TimedMessageReuseMessage) {
                zlog.info(`[timedmessage] To enable reuse of the same message after restart, update TimedMessageMessageId in the config to be ${message.id}`);
            }
        }
    }
};
