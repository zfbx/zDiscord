/*
    zdiscord - by Tony/zfbx - https://github.com/zfbx/zdiscord - License: CC BY-NC-SA 4.0
    Docs for this file available at https://zfbx.gitbook.io/zdiscord/start/config
*/

const zconfig = {};

/** ******************************
 * GENERAL SETTINGS
 ********************************/
// Must match a file's name from /locales Ex: "en" = /locales/en.js
zconfig.Language = "en";
// give console warnings when language locales are missing
zconfig.LanguageWarnings = true;

// PUBLIC VALUES
zconfig.FivemName = "My FiveM Server";
zconfig.Invite = "https://discord.gg/fivem";
zconfig.FivemUrl = "127.0.0.1";

// Gives you an idea what is loading, disable if you want less console spam
zconfig.VerboseLogging = true;
// This spams the console, only enable for testing if needed
zconfig.DebugLogging = false;


/** ********************
 * DISCORD BOT SETTINGS
 ***********************/

zconfig.Enabled = true;

// DISCORD BOT
zconfig.BotToken = "CHANGE";
zconfig.ServerId = "000000000000000000";
zconfig.ThemeColor = "#F2449E";

zconfig.SlashCommandsEnabled = true;
zconfig.ModRoleIds = [
    // "000000000000000000",
];
zconfig.AdminRoleIds = [
    // "000000000000000000",
];
zconfig.GodRoleIds = [
    // "000000000000000000",
];

// DISCORD BOT STATUS
zconfig.StatusMessages = [
    "{playercount} online",
    // "{servername}",
];


// STAFF CHAT
zconfig.StaffChatEnabled = false;
zconfig.StaffChatChannelId = "000000000000000000";
zconfig.AdditionalStaffChatRoleIds = [
    // "000000000000000",
];

// WHITELISTING / ALLOWLISTING
zconfig.WhitelistEnabled = false;
// leave empty to just force being in the discord
zconfig.WhitelistRoleIds = [
    // "000000000000000000",
];


// ACE PERMISSIONS
zconfig.AcePermsEnabled = true;
zconfig.AutoAcePermissions = {
    // "group.example": "000000000000000000",
    // "group.example2": [ "000000000000000000", "000000000000000000"],
};
// Automatically match discord roles to mod, admin and god aces for qbcore, esx, etc
zconfig.AutoAceDefaultStaffRoles = true;

/** ************************
 * Webhook logging settings
 * USE THIS SPARINGLY.. excessive logs can get your bot banned.
**************************/

zconfig.WebhooksEnabled = false;
zconfig.WebhooksName = "zlogs";
// put "&" in front of the id if you're to ping a role | set to "everyone" to ping everyone
zconfig.WebhooksPing = "&000000000000000000";
// example: "bank": "https://discord.com/webhook/...",
zconfig.LoggingWebhooks = {
    // "example": "https://discord.com/api/webhooks/000000000/sEcRRet-ToK3n_5tUfF_tH8t_YUo-S40u1d-n07-sHar3",
};


/** ************************
 * command net events
 **************************/

// event hook that gives a player the character creator/clothing shop menu to fix their clothes for /clothingmenu
zconfig.GiveClothingMenuEvent = "qb-clothing:client:openMenu";

// event hook that revives/heals a player for /revive and /reviveall
zconfig.RevivePlayerEvent = "hospital:client:Revive";


// Preffer QB-notify over sending messages to chat from the "Government"
zconfig.useNotifyInsteadOfChat = false;



// Other
zconfig.SaveScreenshotsToServer = false;

// qb-vehicle states from database for use with /vehicle command
zconfig.vehicleStates = {
    0: "On the Streets",
    1: "In Garage",
    2: "In Police Impound",
    3: "3",
};

// Timed message / Server status updater
zconfig.TimedMessageEnabled = false;
zconfig.TimedMessageChannelId = "000000000000000000";
zconfig.TimedMessageUpdateInterval = 1; // (Minutes)
zconfig.TimedMessageReuseMessage = true;
// Add id of message to be reused to reuse same message after restart
zconfig.TimedMessageMessageId = "";



// List of teleport locations for the /teleport preset commands.
zconfig.teleportLocations = {

    // Paleto / Blaine County
    "paletopd": { name: "Paleto Bay Sheriff Office", coords: [-431.4, 6019.7, 129.4] },
    "paletofdept": { name: "Blaine County Fire Station", coords: [-389.16, 6127.31, 243.59] },
    "paletoguns": { name: "Paleto Bay Ammunation", coords: [-321.43, 6073.08, 31.29] },
    "paletobank": { name: "Blaine County Bank", coords: [-117.47, 6456.41, 31.42] },
    "paletomechanic": { name: "Paleto Mechanic", coords: [117.94, 6611.46, 31.87] },
    "paletogas": { name: "Paleto Gas Station", coords: [177.25, 6618.36, 31.79] },
    "paletostore247": { name: "24/7 Supermarket & Gas", coords: [1725.83, 6402.56, 34.4] },

    // Gordo
    "gordolighthouse": { name: "El Gordo Lighthouse", coords: [3435.01, 5168.52, 7.38] },

    // Davis
    "davisquartz": { name: "Davis Quarry", coords: [2951.15, 2789.18, 41.37] },
    "desertgarbagedump": { name: "Grand Senora Desert Recycling Center", coords: [2323.76, 3137.34, 48.17] },
    "lumberyardlog": { name: "Chiliad Sawmill", coords: [-596.13, 5282.89, 70.24] },

    // PIERS
    "dock-northwest": { name: "Paleto Cove Pier", coords: [-1608.96, 5255.23, 3.97] },
    "dock-southeast": { name: "Del Perro Pier", coords: [-1712.06, -1136.48, 13.08] },
    "dock-north-blaine": { name: "Paleto Pier", coords: [-273.31, 6634.84, 7.4] },
    "dock-north": { name: "Pacific Ocean Pier", coords: [3854.4, 4463.62, 2.73] },
    "dock-west": { name: "Chumash Pier", coords: [-3426.31, 967.76, 8.35] },
    "dock-southwest": { name: "La Puerta Boat Pier", coords: [-780.47, -1505.59, 1.6] },
    "dock-south-ship": { name: "Elysian Island Boat Pier", coords: [23.96, -2791.21, 5.7] },
    "dock-south-helicopter": { name: "Elysian Island Helipad Pier", coords: [494.62, -3384.13, 6.07] },
    "dock-central-northeast": { name: "Alamo Sea - Galilee Pier", coords: [1299.78, 4219.71, 33.91] },
    "dock-central-northwest": { name: "Alamo Sea - Mount Chiliad Pier", coords: [713.28, 4098.99, 35.79] },
    "dock-central-south": { name: "Alamo Sea - Sandy Shores Pier", coords: [1734.96, 3979.94, 31.98] },

    // Airports
    "airport-tarmac": { name: "Los Santos Airport Runway", coords: [-1678.88, -2892.97, 13.94] },
    "sandy-airport-tarmac": { name: "Sandy Airport Runway", coords: [1704.86, 3252.15, 41.0] },
    "military-base-tarmac": { name: "Fort Zancudo Airbase Runway", coords: [-1975.31, 2839.8, 32.81] },

    // Rooftops
    "skyscraper-iaa": { name: "IAA Roof", coords: [143.01, -617.18, 266.84] },
    "skyscraper-fib": { name: "FIB Roof", coords: [142.4, -764.09, 262.87] },
    "skyscraper-maze-helicopter": { name: "Maze Bank Roof Helipad", coords: [-69.51, -811.8, 326.08] },

    // Other
    "hollywood-billboard": { name: "Vinewood Sign", coords: [714.26, 1197.21, 346.74] },
    "chiliad-peak": { name: "Mount Chiliad", coords: [453.73, 5572.2, 781.18] },
    "mount-gordo": { name: "Mount Gordo", coords: [2787.93, 5997.87, 355.58] },
    "mount-chianski": { name: "San Chianski Mountain Range", coords: [3291.24, 3141.66, 253.29] },
    "north-island": { name: "Island (far north)", coords: [227.23, 7450.38, 22.61] },
    "special-east-beach-cave": { name: "Pacific Coast Cove", coords: [3072.49, 2129.27, 2.5] },

    "observatory": { name: "Galileo Observatory", coords: [-425.33, 1123.71, 325.85] },
    "sandy-prison-jail": { name: "Boilingbroke Penitentiary", coords: [1855.5, 2586.12, 45.67] },
    "playboy": { name: "Playboy Mansion", coords: [-1495.13, 142.06, 55.65] },
    "casino": { name: "Diamond Casino Entrance", coords: [922.93, 47.38, 81.11] },
    "casino-helicopter": { name: "Diamond Casino Helipad", coords: [974.24, 48.33, 123.12] },
    "maze-arena": { name: "Maze Bank Arena", coords: [-278.56, -1914.16, 29.95] },
};

// Only change values here if you've renamed any of these resources
// leave the left value alone. only change the right or things wont work
zconfig.ResourcesNames = {
    "qb-core": "qb-core",
    "qb-weathersync": "qb-weathersync",
};
