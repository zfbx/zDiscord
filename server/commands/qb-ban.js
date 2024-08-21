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

translations["ban"] = {
    "en": {
        cmdName: "ban",
        cmdDesc: "Ban a player in game",
        // optionMessageDescription: "announcement to send",
        // announcementTitle: "ANNOUNCEMENT",
    },
};

module.exports = class cmd extends Command {
    constructor(file) {
        super(Lang.t("cmdName", {}, translations["ban"]), file, {
            description: Lang.t("cmdDesc", {}, translations["ban"]),
            role: "admin",

            options: [
                {
                    name: "id",
                    description: "Player's current id",
                    required: true,
                    type: djs.ApplicationCommandOptionType.Integer,
                },
                {
                    name: "time",
                    description: "How long in seconds to ban player for",
                    required: true,
                    type: djs.ApplicationCommandOptionType.Integer,
                },
                {
                    name: "reason",
                    description: "reason for ban",
                    required: true,
                    type: djs.ApplicationCommandOptionType.String,
                },
            ],
        });
    }

    async run(interaction, args) {
        if (!GetPlayerName(args.id)) return interaction.sreply(Lang.t("invalid_id"));
        if (args.time < 0) return interaction.sreply("time must be a positive number");
        // const player = QBCore.Functions.GetPlayer(args.id);
        /* If this event is fixed the code following can be removed.
        emit("qb-admin:server:ban", player, time, reason);
        */
        const bantime = args.time < 2147483647 ? (args.time + Math.floor(Date.now() / 1000)) : 2147483647;
        global.exports.oxmysql.insert_async("INSERT INTO bans (name, license, discord, ip, reason, expire, bannedby) VALUES (?, ?, ?, ?, ?, ?, ?)", [
            GetPlayerName(args.id),
            QBCore.Functions.GetIdentifier(args.id, "license"),
            QBCore.Functions.GetIdentifier(args.id, "discord"),
            QBCore.Functions.GetIdentifier(args.id, "ip"),
            args.reason,
            bantime,
            interaction.member.id,
        ]);
        zutils.chatMessage(-1, "SERVER", `${GetPlayerName(args.id)} has been banned for breaking the rules.`, { color: [ 155, 0, 0 ] });
        emit("qb-log:server:CreateLog", "bans", "Player Banned", "red", `${GetPlayerName(args.id)} was banned by ${interaction.member.displayName} for ${args.reason}`, true);
        if (bantime >= 2147483647) {
            DropPlayer(args.id, `You have been banned:\n${args.reason}\n\nYour ban is permanent.\n🔸 Check our Discord for more information: ${QBCore.Config.Server.discord}`);
        } else {
            DropPlayer(args.id, `You have been banned:\n${args.reason}\n\nBan expires in ${args.time / 60} minutes\n🔸 Check our Discord for more information: ${QBCore.Config.Server.discord}`);
        }

        // End of filler code

        zlog.info(`[${interaction.member.displayName}] banned ${GetPlayerName(args.id)} (${args.id}) for ${args.time} seconds`);
        return interaction.reply(`${GetPlayerName(args.id)} (${args.id}) was banned for ${args.time / 60} minutes.`);
    }
};
