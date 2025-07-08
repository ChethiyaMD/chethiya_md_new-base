const { cmd, commands } = require('../lib/command');
const fg = require('api-dylux');
const yts = require('yt-search');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const axios = require('axios')
const config = require('../settings')
const {readEnv} = require('../lib/database')
const fs = require('fs');
const path = require('path');
const {
  ytmp33,
  ytmp3y,
  ytmp44,
  ytmp444,
  ytmp32,
  scrapeSite,
} = require("../lib/scrap");

const song2Command = {
  pattern: "song",
  desc: "To download songs.",
  react: "🎵",
  use: ".song < Text or Link >",
  category: "download",
  filename: __filename
};

cmd(song2Command, async (client, m, message, {
  prefix,
  l,
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    if (!q) {
      return reply("Please provide a search term!");
    }

    const query = convertYouTubeLink(q); 
    const searchResult = await yts(query);
    const video = searchResult.videos[0];
    const videoUrl = video.url;

    const descriptionText = `
*〘 \`❗ chetiyaMD ❗\` 〙*

*╭┈─「🎧 𝐒ᴏɴɢ 𝐃ᴏᴡɴʟᴏᴀᴅᴇ 🎧」──┈⊷*
*┃============ ◦│࿕│◦ ============*
*┃➣* 🎶 *\`Tɪᴛʟᴇ\` :* *${video.title}*
*┃*
*┃➣* 👀 *\`Vɪᴇᴡꜱ\` :* *${video.views}*
*┃*
*┃➣* ⏳ *\`Dᴜʀᴀᴛɪᴏɴ\` :* *${video.timestamp}*
*┃*
*┃➣* 📆 *\`Uᴘʟᴏᴀᴅᴇᴅ\` :* *${video.ago}*
*┃*
*┃➣* 🖇 *\`Uʀʟ\` :* *${video.url}*
*┃*
> *❮❮ අවශ්‍ය බොත්තම තෝරන්න...🔢 ❯❯*
*┃============ ◦│࿕│◦ ============*
*╰┈──────────────────────┈⊷*
`;

    if (config.BUTTON === "button") {
      // Interactive button menu
      const buttonMenu = {
        title: "🔑 Select menu type",
        rows: [
          { title: "𝐀ᴜᴅɪᴏ 𝐃ᴏᴡɴʟᴏᴀᴅᴇʀ", description: "Audio Downloader File", id: prefix + "ytmp3 " + videoUrl },
          { title: "𝐕ᴏɪᴄᴇ 𝐃ᴏᴡɴʟᴏᴀᴅᴇʀ", description: "Voice Downloader File", id: prefix + "ytaa " + videoUrl },
          { title: "𝐃ᴏᴄᴜᴍᴇɴᴛ 𝐃ᴏᴡɴʟᴏᴀᴅᴇʀ", description: "Document Downloader File", id: prefix + "ytdocs " + videoUrl },
          { title: "𝐕ɪᴅᴇᴏ 𝐃ᴏᴡɴʟᴏᴀᴅᴇʀ", description: "Video Downloader File", id: prefix + "ytmp3v " + videoUrl },
          { title: "𝐕ɪᴅᴇᴏ 𝐍ᴏᴛᴇ 𝐃ᴏᴡɴʟᴏᴀᴅᴇʀ", description: "Video Note Downloader File", id: prefix + "ytaav " + videoUrl },
          { title: "𝐃ᴏᴄᴜᴍᴇɴᴛ 𝐃ᴏᴡɴʟᴏᴀᴅᴇʀ", description: "Document Downloader File", id: prefix + "ytdocsv " + videoUrl }
        ]
      };

      const song2Sections = [buttonMenu];
      const interactiveSong2 = {
        title: "𝐒ᴇʟᴇᴛᴇ 𝐀ᴜᴅɪᴏ 𝐋ɪꜱᴛ⎙",
        sections: song2Sections
      };

      const videosdButton = { displayText: "𝐀ᴜᴅɪᴏ 𝐃ᴏᴡɴʟᴏᴀᴅ🎶" };
      const videohdButton = { displayText: "𝐃ᴏᴄᴜᴍᴇɴᴛ 𝐃ᴏᴡɴʟᴏᴀᴅ📂" };

      const buttons = [
        { buttonId: prefix + "ytmp3 " + videoUrl, buttonText: videosdButton },
        { buttonId: prefix + "ytdocs " + videoUrl, buttonText: videohdButton },
        {
          buttonId: "action",
          buttonText: { displayText: "Interactive Menu" },
          type: 4,
          nativeFlowInfo: {
            name: "single_select",
            paramsJson: JSON.stringify(interactiveSong2) // Fixed this to use interactiveSong9 instead of interactiveTiktok
          }
        }
      ];
      
      // Button-based response with the new interactive button
      const msgObj = {
        image: { url: video.image }, // Using video thumbnail
        caption: descriptionText,
        footer: 'https://files.catbox.moe/b7hkxj.jpg",
        buttons: buttons,
        buttonText: "*➣ ❮❮ Click You Need Button...🔢 ❯❯*",
        headerType: 4, // Suitable for image-based messages
        viewOnce: true
      };

      return await client.sendMessage(from, msgObj, { quoted: m });
    } else {
      // Non-button (list-based) response
      const listSections = [{
        title: "",
        rows: [
          {
            title: "1.1",
            rowId: prefix + "ytmp3 " + videoUrl,
            description: "❯❯◦ `Aᴜᴅɪᴏ Fɪʟᴇ 🎶`"
          },
          {
            title: "1.2",
            rowId: prefix + "ytaa " + videoUrl,
            description: "❯❯◦ `Vᴏɪᴄᴇ Nᴏᴛᴇ 🎤`"
          },
          {
            title: "1.3",
            rowId: prefix + "ytdocs " + videoUrl,
            description: "❯❯◦ `Dᴏᴄᴜᴍᴇɴᴛ Fɪʟᴇ 📂`"
          },
          {
            title: "2.1",
            rowId: prefix + "ytmp3v " + videoUrl,
            description: "❯❯◦ `𝐕ɪᴅᴇᴏ Fɪʟᴇ 🎶`"
          },
          {
            title: "2.2",
            rowId: prefix + "ytaav " + videoUrl,
            description: "❯❯◦ `𝐕ɪᴅᴇᴏ Nᴏᴛᴇ 🎤`"
          },
          {
            title: "2.3",
            rowId: prefix + "ytdocsv " + videoUrl,
            description: "❯❯◦ `Dᴏᴄᴜᴍᴇɴᴛ Fɪʟᴇ 📂`"
          }
        ]
      }];

      const listMessage = {
        caption: descriptionText,
        image: { url: video.image },
        footer: "ube footer eka",
        title: "",
        buttonText: "*➣ ❮❮ Click You Need Button...🔢 ❯❯*",
        sections: listSections
      };

      const quotedObj = { quoted: m };

      return await client.replyList(from, listMessage, quotedObj);
    }
  } catch (error) {
    reply("*ERROR !!*");
    l(error);
  }
});
