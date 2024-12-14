# Exports

If you have other resources that you wish to be able to use information available in zdiscord, you might just be in luck. Here is a list of all the available exports for zdiscord and samples of how to use them in javascript or lua. If you don't see something you want here [submit a feature request](https://github.com/zfbx/zdiscord/issues/new/choose) or [pull request](https://github.com/zfbx/zdiscord/pulls)

#### Table of Contents
- [isRolePresent](#isrolepresent)
- [getDiscordId](#getDiscordId)
- [getRoles](#getroles)
- [getMemberHighestRole](#getMemberHighestRole)
- [getName](#getname)
- [log](#log)

### isRolePresent
Returns a true/false boolean if a role is present for a role id or array of role-ids

```js
// JAVASCRIPT EXAMPLE
// Source - Discord Role ID
const bool = global.exports.zdiscord.isRolePresent(global.source, "897991948097433681");

// Discord ID - Array of Roles
const bool = global.exports.zdiscord.isRolePresent("142831624868855808", [
    "897991948097433681",
    "897991948097433682"
]);
```
```lua
-- LUA EXAMPLE
-- Source - Discord Role ID
local bool = exports.zdiscord:isRolePresent(source, "897991948097433681");

-- Discord ID - Array of Roles
local bool = exports.zdiscord:isRolePresent("142831624868855808", {
    "897991948097433681",
    "897991948097433682"
});
```


### getDiscordId
Returns a player's discord id

```js
// JAVASCRIPT EXAMPLE
const id = global.exports.zdiscord.getDiscordId(global.source);
```
```lua
-- LUA EXAMPLE
local id = exports.zdiscord:getDiscordId(source);
```



### getRoles
Returns an array of roles for a discord id or source

```js
// JAVASCRIPT EXAMPLE
// Source
const roles = global.exports.zdiscord.getRoles(global.source);

// Discord ID
const roles = global.exports.zdiscord.getRoles("142831624868855808");
```
```lua
-- LUA EXAMPLE
-- Source
local roles = exports.zdiscord:getRoles(source);

-- Discord ID
local roles = exports.zdiscord:getRoles("142831624868855808");
```

### getMemberHighestRole
Returns a name of the member's highest role, using a discord id or source

```js
// JAVASCRIPT EXAMPLE
// Source
const roles = global.exports.zdiscord.getMemberHighestRole(global.source);

// Discord ID
const roles = global.exports.zdiscord.getMemberHighestRole("142831624868855808");
```
```lua
-- LUA EXAMPLE
-- Source
local role = exports.zdiscord:getMemberHighestRole(source);

-- Discord ID
local role = exports.zdiscord:getMemberHighestRole("142831624868855808");
```


### getName
Returns an string containing the discord name/nickname for a discord id or source

```js
// JAVASCRIPT EXAMPLE
// Source
const name = global.exports.zdiscord.getName(global.source);

// Discord ID
const name = global.exports.zdiscord.getName("142831624868855808");
```
```lua
-- LUA EXAMPLE
-- Source
local name = exports.zdiscord:getName(source);

-- Discord ID
local name = exports.zdiscord:getName("142831624868855808");
```


### log
send a message to a configured Log webhook

```js
// JAVASCRIPT EXAMPLE
// event, message, pingRole, color (optional)
global.exports.zdiscord.log("modlog", "UserA Banned UserB for Reason", true, "#FF0000");

```
```lua
-- LUA EXAMPLE
-- event, message, pingRole, color (optional)
exports.zdiscord:log("modlog", "UserA Banned UserB for Reason", true, "#FF0000");
```

### registerWebhook
register a webhook for usage

```js
// JAVASCRIPT EXAMPLE
// name, webhook url
global.exports.zdiscord.registerWebhook("name", "https://discord.com/api/webhooks/id/key");

```
```lua
-- LUA EXAMPLE
-- name, webhook url
exports.zdiscord:registerWebhook("name", "https://discord.com/api/webhooks/id/key");
```

### sendWebhook
send a webhook message, using a name of a webhook you registered

```js
// JAVASCRIPT EXAMPLE
// webhook name, { title, description, footer, username, avatarURL, color }
global.exports.zdiscord.sendWebhook("name", {
    title: "title",
    description: "desc",
    footer: "footer",
    username: "username",
    color: "#FFFFFF"
});

```
```lua
-- LUA EXAMPLE
-- webhook name, { title, description, footer, username, avatarURL, color }
exports.zdiscord:sendWebhook("name", {
    title = "Chat Message",
    description = "This is a chat message test!",
    footer = "Wow Footer",
    username = 'Chat',
    color = "#FFFFFF"
});
```
