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

translations["blackout"] = {
    "en": {
        cmdName: "blackout",
        cmdDesc: "Toggle a city wide-wide blackout",
        blackoutSuccess: "Blackout has been toggled.",
        blackoutLogMessage: "{discordName} ({discordId}) toggled blackout",
    },
};

module.exports = class cmd extends Command {
    constructor(file) {
        super(Lang.t("cmdName", {}, translations["blackout"]), file, {
            description: Lang.t("cmdDesc", {}, translations["blackout"]),
            role: "admin",
            scriptHook: "",
        });
    }

    shouldLoad() {
        if (GetResourceState(zconfig.ResourcesNames["qb-weathersync"]) === "started") {
            this.scriptHook = "qb-weathersync";
            return true;
        }
        // TODO: Make zweather and/or add other resources
        return false;
    }

    async run(interaction, args) {

        if (this.scriptHook === "qb-weathersync") {
            // doesn't give any option for true or false or feedback to which was done -.-
            emit("qb-weathersync:server:toggleBlackout");
            zlog.info(Lang.t("blackoutLogMessage", {
                discordName: interaction.member.displayName,
                discordId: interaction.member.id,
            }, translations["blackout"]));
            return interaction.sreply(Lang.t("blackoutSuccess", {}, translations["blackout"]));
        }

    }
};
