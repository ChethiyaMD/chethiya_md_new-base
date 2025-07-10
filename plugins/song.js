// plugins/songbutton.js

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
  pattern: "songmenu",
  desc: "Send button with song options",
  category: "music",
  react: "🎵",
  filename: __filename,
}, async (conn, m, { from, reply, sendButton }) => {
  const buttonMessage = {
    text: "🎶 Choose a song to download:",
    footer: "Powered by Gojobot",
    buttons: [
      { buttonId: ".playsong song1", buttonText: { displayText: "📀 Song 1" }, type: 1 },
      { buttonId: ".playsong song2", buttonText: { displayText: "🎧 Song 2" }, type: 1 },
      { buttonId: ".playsong song3", buttonText: { displayText: "🎼 Song 3" }, type: 1 },
    ],
    headerType: 1,
  };

  await conn.sendMessage(from, buttonMessage, { quoted: m });
});

cmd({
  pattern: "playsong",
  desc: "Send the selected song",
  fromMe: false,
  category: "music",
}, async (conn, m, { args, from, reply }) => {
  const songId = args[0];

  const songLinks = {
    song1: "https://example.com/song1.mp3",
    song2: "https://example.com/song2.mp3",
    song3: "https://example.com/song3.mp3",
  };

  const songUrl = songLinks[songId];

  if (!songUrl) return reply("❌ Song not found!");

  try {
    const buffer = await getBuffer(songUrl);
    await conn.sendMessage(from, { audio: buffer, mimetype: 'audio/mp4' }, { quoted: m });
  } catch (err) {
    console.error(err);
    reply("❌ Failed to send song.");
  }
});
