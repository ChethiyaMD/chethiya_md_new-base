const os = require("os");
const { cmd, commands } = require("../lib/command");
var { get_set, input_set } = require("../lib/set_db");
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, Func, fetchJson, } = require("../lib/functions");
var {
  updateCMDStore,
  isbtnID,
  getCMDStore,
  getCmdForCmdId,
  connectdb,
  input,
  get,
  updb,
  updfb
} = require("../lib/database");
const axios = require("axios");
const fs = require('fs');
const config = require("../settings");
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, getBinaryNodeChildren, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType, downloadContentFromMessage} = require('@whiskeysockets/baileys');

cmd({
    pattern: "system",
    react:"📟",

    alias: ["speed","nurospeed"],

    desc: "To Check bot's ping",

    category: "main",

    use: '.system',

    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{

const nima = require("@whiskeysockets/baileys")

var inital = new Date().getTime();

let ping = await conn.sendMessage(from , { text: '📟 loding..'  } )

var final = new Date().getTime();

await conn.sendMessage(from, { text : '*🔴🔴🔴*' , edit : system.key })

await conn.sendMessage(from, { text : '*🟢🟡🔴*' , edit : system.key })

await conn.sendMessage(from, { text : '*🟢🟢🟡*' , edit : system.key })

await conn.sendMessage(from, { text : '*🟢🟢🟢*' , edit : system.key })

await conn.sendMessage(from, { text : '*👋🏻 Welcome to Chetiya_MD Bot*\n\n\n*╭─「 BOT STATUS 」*\n*│* 🎃 *USER* = *Hi user*\n*│* 🤖 *BOT NAME* = Chetiya wedasinga\n*│* 🎭 *VERSION* = 1.0.0\n*│* 🕐 *UPTIME* =2 hours, 37 minutes, 57 seconds \n*│* 🌐 *RAM* = 67.24MB / 50.24MB*\n╰───────────────◆*\n\n\n\n*📁 SYSTEM SPECS (Fake)*\n• RAM : 100TB DDR5\n• CPU : AMD RYZEN 9999X\n• GPU : RTX 9090 Ti x4\n• STATUS : 100% OPERATIONAL\n\n\n\n> *🄿🄾🅆🄴🅁🄳 🅱🆈  😈 𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯*' , edit : system.key })

} catch (e) {

reply('*𝔈ℜℜ𝔒ℜ🫩 !!*')

l(e)

}

})
