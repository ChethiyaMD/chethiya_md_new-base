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

    pattern: "ping",
    react:"📌",

    alias: ["speed","nurospeed"],

    desc: "To Check bot's ping",

    category: "main",

    use: '.ping',

    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{

const nima = require("@whiskeysockets/baileys")

var inital = new Date().getTime();

let ping = await conn.sendMessage(from , { text: '*_Pinging..._* 🔥'  } )

var final = new Date().getTime();

await conn.sendMessage(from, { text : '*●●◎◎◎◎◎◎◎◎ 10%*' , edit : ping.key })

await conn.sendMessage(from, { text : '*●●●●◎◎◎◎◎ 30%*' , edit : ping.key })

await conn.sendMessage(from, { text : '*●●●●●●◎◎◎◎ 50%*' , edit : ping.key })

await conn.sendMessage(from, { text : '*●●●●●●●●◎◎ 80%*' , edit : ping.key })

await conn.sendMessage(from, { text : '*●●●●●●●●●● 100%*' , edit : ping.key })

return await conn.sendMessage(from, { text : '*⚠️𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯 ◉ ꜱᴘᴇᴇᴅ ' + (final - inital) + ' Ms* ' , edit : ping.key })

} catch (e) {

reply('*𝔈ℜℜ𝔒ℜ🫩 !!*')

l(e)

}

})
