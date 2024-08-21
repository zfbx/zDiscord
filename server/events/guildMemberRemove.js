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

module.exports = {
    name: "guildMemberRemove",
    run: async (member) => {
        // https://discord.js.org/#/docs/discord.js/stable/class/Client?scrollTo=e-guildMemberRemove
        // TODO: needs work, hard to test
        if (!Object.keys(inCity).includes(member.id)) return;
        if (zconfig.WhitelistEnabled) {
            DropPlayer(inCity[member.id], Lang.t("notInDiscordServer"));
        }
    },
};
