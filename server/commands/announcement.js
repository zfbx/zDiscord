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

translations["announcement"] = {
    "en": {
        cmdName: "announcement",
        cmdDesc: "Send in city announcement",
        optionMessageDescription: "announcement to send",
        announcementTitle: "ANNOUNCEMENT",
        modLog: "[{name} ({id})] {announcement}: {message}",
    },
    "ar": {
        announcementTitle: "اعلان",
    },
    "bg": {
        announcementTitle: "ОПОВЕСТЯВАНЕ",
    },
    "cs": {
        announcementTitle: "OZNÁMENÍ",
    },
    "de": {
        announcementTitle: "ANNOUNCEMENT",
    },
    "es": {
        cmdName: "anuncio",
        announcementTitle: "ANUNCIO",
    },
    "fr": {
        announcementTitle: "ANNONCE",
    },
    "id": {
        announcementTitle: "PENGUMUMAN",
    },
    "it": {
        announcementTitle: "ANNUNCIO",
    },
    "nl": {
        announcementTitle: "AANKONDIGING",
    },
    "no": {
        announcementTitle: "KUNNGJØRING",
    },
    "pl": {
        announcementTitle: "OGŁOSZENIE",
    },
    "pt": {
        announcementTitle: "ANÚNCIO",
    },
    "sl": {
        announcementTitle: "OBVESTILO",
    },
    "sv": {
        announcementTitle: "VIKTIGT MEDDELANDE",
    },
    "tr": {
        announcementTitle: "DUYURU",
    },
    "vn": {
        announcementTitle: "Thông Báo",
    },
};

module.exports = class cmd extends Command {
    constructor(file) {
        super(Lang.t("cmdName", {}, translations["announcement"]), file, {
            description: Lang.t("cmdDesc", {}, translations["announcement"]),
            role: "mod",

            options: [
                {
                    name: Lang.t("opt_message"),
                    description: Lang.t("optionMessageDescription", {}, translations["announcement"]),
                    required: true,
                    type: djs.ApplicationCommandOptionType.String,
                },
            ],
        });
    }

    async run(interaction, args) {
        const message = args[Lang.t("opt_message")];
        zutils.chatMessage(-1, Lang.t("announcementTitle", {}, translations["announcement"]), message, { color: [ 255, 0, 0 ] });
        // zlog.info(`[${interaction.member.displayName} (${interaction.member.id})] ${Lang.t("announcementTitle", {}, translations["announcement"])}: ${message}`);
        zlog.info(Lang.t("modLog", {
            name: interaction.member.displayName,
            id: interaction.member.id,
            announcement: Lang.t("announcementTitle", {}, translations["announcement"]),
            message: message,
        }, translations["announcement"]));
        interaction.sreply(Lang.t("message_sent"));
    }
};
