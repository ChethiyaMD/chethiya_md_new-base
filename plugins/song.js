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
  pattern: "song2",
  desc: "To download songs.",
  react: "🎵",
  use: ".song2 < Text or Link >",
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
*〘 \`❗ 𝐃ᴇᴠɪʟ 𝐓ᴇᴄʜ 𝐌ᴅ 𝐁ᴏᴛ ❗\` 〙*

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
        title: "𝐒ᴇʟᴇᴛᴇ 𝐀ᴜᴅɪᴏ 𝐋ɪꜱᴛ⎙⎙",
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
        footer: `> *🄿🄾🅆🄴🅁🄳" 🅱🆈  😈 *𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯*`,
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
const Commandytmp3 = {
  pattern: "ytmp3",
  react: "⬇",
  dontAddCommandList: false,
  filename: __filename
};

cmd(Commandytmp3, async (bot, message, user, {
  from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    const replyMsg = (await fetchJson("https://raw.githubusercontent.com/ChethiyaMD/bad_word.json/refs/heads/main/Mreply.json")).replyMsg;
    
    if (!q) {
      return reply(replyMsg.url);
    }

    if (!q.includes("https://youtube.com/watch?v=")) {
      return await reply(replyMsg.not_fo);
    }

    let downloadUrl = await getDownloadUrl(q, "mp3");
    const reactUp = {
      text: "⬆",
      key: message.key
    };
    const react = { react: reactUp };
    await bot.sendMessage(from, react);

    const audio = { url: downloadUrl };
    const audioMessage = {
      audio: audio,
      mimetype: "audio/mpeg"
    };
    const quotedMessage = { quoted: message };

    await bot.sendMessage(from, audioMessage, quotedMessage);

    const reactSuccess = {
      text: "✔",
      key: message.key
    };
    const successReact = { react: reactSuccess };
    await bot.sendMessage(from, successReact);
  } catch (error) {
    console.log(error);

    try {
      const replyMsg = (await fetchJson("https://raw.githubusercontent.com/ChethiyaMD/bad_word.json/refs/heads/main/Mreply.json")).replyMsg;

      if (!q) {
        return reply(replyMsg.url);
      }

      if (!q.includes("https://youtube.com/watch?v=")) {
        return await reply(replyMsg.not_fo);
      }

      let downloadInfo = await giftm(q);
      const reactUp = {
        text: "⬆",
        key: message.key
      };
      const react = { react: reactUp };
      await bot.sendMessage(from, react);

      const audio = { url: downloadInfo.dl_link };
      const audioMessage = {
        audio: audio,
        mimetype: "audio/mpeg"
      };
      const quotedMessage = { quoted: message };

      await bot.sendMessage(from, audioMessage, quotedMessage);

      const reactSuccess = {
        text: "✔",
        key: message.key
      };
      const successReact = { react: reactSuccess };
      await bot.sendMessage(from, successReact);
    } catch (error2) {
      try {
        if (!q) {
          return reply(msr.url);
        }

        if (!q.includes("https://youtube.com/watch?v=")) {
          return await reply(msr.not_fo);
        }

        let downloadInfo = await ytmp3(q);
        const reactUp = {
          text: "⬆",
          key: message.key
        };
        const react = { react: reactUp };
        await bot.sendMessage(from, react);

        const audio = { url: downloadInfo.dl_link };
        const audioMessage = {
          audio: audio,
          mimetype: "audio/mpeg"
        };
        const quotedMessage = { quoted: message };

        await bot.sendMessage(from, audioMessage, quotedMessage);

        const reactSuccess = {
          text: "✔",
          key: message.key
        };
        const successReact = { react: reactSuccess };
        await bot.sendMessage(from, successReact);
      } catch (error3) {
        console.log(error3);
      }
    }
  }
});
const Commandytmp3v = {
  pattern: "ytmp3v",
  react: "⬇",
  dontAddCommandList: false,
  filename: __filename
};

cmd(Commandytmp3v, async (bot, message, user, {
  from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    const replyMsg = (await fetchJson("https://raw.githubusercontent.com/ChethiyaMD/bad_word.json/refs/heads/main/Mreply.json")).replyMsg;
    
    if (!q) {
      return reply(replyMsg.url);
    }

    if (!q.includes("https://youtube.com/watch?v=")) {
      return await reply(replyMsg.not_fo);
    }

    let downloadUrl = await getDownloadUrl(q, "mp3");
    const reactUp = {
      text: "⬆",
      key: message.key
    };
    const react = { react: reactUp };
    await bot.sendMessage(from, react);

    const video = { url: downloadUrl };
    const videoMessage = {
      video: video,
      mimetype: "video/mp4"
    };
    const quotedMessage = { quoted: message };

    await bot.sendMessage(from, videoMessage, quotedMessage);

    const reactSuccess = {
      text: "✔",
      key: message.key
    };
    const successReact = { react: reactSuccess };
    await bot.sendMessage(from, successReact);
  } catch (error) {
    console.log(error);

    try {
      const replyMsg = (await fetchJson("https://raw.githubusercontent.com/ChethiyaMD/bad_word.json/refs/heads/main/Mreply.json")).replyMsg;

      if (!q) {
        return reply(replyMsg.url);
      }

      if (!q.includes("https://youtube.com/watch?v=")) {
        return await reply(replyMsg.not_fo);
      }

      let downloadInfo = await giftm(q);
      const reactUp = {
        text: "⬆",
        key: message.key
      };
      const react = { react: reactUp };
      await bot.sendMessage(from, react);

      const video = { url: downloadInfo.dl_link };
      const videoMessage = {
        video: video,
        mimetype: "video/mp4"
      };
      const quotedMessage = { quoted: message };

      await bot.sendMessage(from, videoMessage, quotedMessage);

      const reactSuccess = {
        text: "✔",
        key: message.key
      };
      const successReact = { react: reactSuccess };
      await bot.sendMessage(from, successReact);
    } catch (error2) {
      try {
        if (!q) {
          return reply(msr.url);
        }

        if (!q.includes("https://youtube.com/watch?v=")) {
          return await reply(msr.not_fo);
        }

        let downloadInfo = await ytmp3(q);
        const reactUp = {
          text: "⬆",
          key: message.key
        };
        const react = { react: reactUp };
        await bot.sendMessage(from, react);

        const video = { url: downloadInfo.dl_link };
        const videoMessage = {
          video: video,
          mimetype: "video/mp4"
        };
        const quotedMessage = { quoted: message };

        await bot.sendMessage(from, videoMessage, quotedMessage);

        const reactSuccess = {
          text: "✔",
          key: message.key
        };
        const successReact = { react: reactSuccess };
        await bot.sendMessage(from, successReact);
      } catch (error3) {
        console.log(error3);
      }
    }
  }
});
const Commandytdocs = {
  pattern: "ytdocs",
  react: "⬇",
  dontAddCommandList: false,
  filename: __filename
};

cmd(Commandytdocs, async (bot, message, user, {
  from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    const replyMsg = (await fetchJson("https://raw.githubusercontent.com/ChethiyaMD/bad_word.json/refs/heads/main/Mreply.json")).replyMsg;
    
    if (!q) {
      return reply(replyMsg.url);
    }

    if (!q.includes("https://youtube.com/watch?v=")) {
      return await reply(replyMsg.not_fo);
    }

    let downloadUrl = await getDownloadUrl(q, "mp3");
    const reactUp = {
      text: "⬆",
      key: message.key
    };
    const react = { react: reactUp };
    await bot.sendMessage(from, react);

    const document = { url: downloadUrl };
    const documentMessage = {
      document: document,
      mimetype: "audio/mpeg"
    };
    const quotedMessage = { quoted: message };

    await bot.sendMessage(from, documentMessage, quotedMessage);

    const reactSuccess = {
      text: "✔",
      key: message.key
    };
    const successReact = { react: reactSuccess };
    await bot.sendMessage(from, successReact);
  } catch (error) {
    console.log(error);

    try {
      const replyMsg = (await fetchJson("https://raw.githubusercontent.com/ChethiyaMD/bad_word.json/refs/heads/main/Mreply.json")).replyMsg;

      if (!q) {
        return reply(replyMsg.url);
      }

      if (!q.includes("https://youtube.com/watch?v=")) {
        return await reply(replyMsg.not_fo);
      }

      let downloadInfo = await giftm(q);
      const reactUp = {
        text: "⬆",
        key: message.key
      };
      const react = { react: reactUp };
      await bot.sendMessage(from, react);

      const document = { url: downloadInfo.dl_link };
      const documentMessage = {
        document: document,
        mimetype: "audio/mpeg"
      };
      const quotedMessage = { quoted: message };

      await bot.sendMessage(from, documentMessage, quotedMessage);

      const reactSuccess = {
        text: "✔",
        key: message.key
      };
      const successReact = { react: reactSuccess };
      await bot.sendMessage(from, successReact);
    } catch (error2) {
      try {
        if (!q) {
          return reply(msr.url);
        }

        if (!q.includes("https://youtube.com/watch?v=")) {
          return await reply(msr.not_fo);
        }

        let downloadInfo = await ytmp3(q);
        const reactUp = {
          text: "⬆",
          key: message.key
        };
        const react = { react: reactUp };
        await bot.sendMessage(from, react);

        const document = { url: downloadInfo.dl_link };
        const documentMessage = {
          document: document,
          mimetype: "audio/mpeg"
        };
        const quotedMessage = { quoted: message };

        await bot.sendMessage(from, documentMessage, quotedMessage);

        const reactSuccess = {
          text: "✔",
          key: message.key
        };
        const successReact = { react: reactSuccess };
        await bot.sendMessage(from, successReact);
      } catch (error3) {
        console.log(error3);
      }
    }
  }
});

const Commandytdocsv = {
  pattern: "ytdocsv",
  react: "⬇",
  dontAddCommandList: false,
  filename: __filename
};

cmd(Commandytdocsv, async (bot, message, user, {
  from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    const replyMsg = (await fetchJson("https://raw.githubusercontent.com/ChethiyaMD/bad_word.json/refs/heads/main/Mreply.json")).replyMsg;
    
    if (!q) {
      return reply(replyMsg.url);
    }

    if (!q.includes("https://youtube.com/watch?v=")) {
      return await reply(replyMsg.not_fo);
    }

    let downloadUrl = await getDownloadUrl(q, "mp3");
    const reactUp = {
      text: "⬆",
      key: message.key
    };
    const react = { react: reactUp };
    await bot.sendMessage(from, react);

    const document = { url: downloadUrl };
    const documentMessage = {
      document: document,
      mimetype: "video/mp4"
    };
    const quotedMessage = { quoted: message };

    await bot.sendMessage(from, documentMessage, quotedMessage);

    const reactSuccess = {
      text: "✔",
      key: message.key
    };
    const successReact = { react: reactSuccess };
    await bot.sendMessage(from, successReact);
  } catch (error) {
    console.log(error);

    try {
      const replyMsg = (await fetchJson("https://raw.githubusercontent.com/ChethiyaMD/bad_word.json/refs/heads/main/Mreply.json")).replyMsg;

      if (!q) {
        return reply(replyMsg.url);
      }

      if (!q.includes("https://youtube.com/watch?v=")) {
        return await reply(replyMsg.not_fo);
      }

      let downloadInfo = await giftm(q);
      const reactUp = {
        text: "⬆",
        key: message.key
      };
      const react = { react: reactUp };
      await bot.sendMessage(from, react);

      const document = { url: downloadInfo.dl_link };
      const documentMessage = {
        document: document,
        mimetype: "video/mp4"
      };
      const quotedMessage = { quoted: message };

      await bot.sendMessage(from, documentMessage, quotedMessage);

      const reactSuccess = {
        text: "✔",
        key: message.key
      };
      const successReact = { react: reactSuccess };
      await bot.sendMessage(from, successReact);
    } catch (error2) {
      try {
        if (!q) {
          return reply(msr.url);
        }

        if (!q.includes("https://youtube.com/watch?v=")) {
          return await reply(msr.not_fo);
        }

        let downloadInfo = await ytmp3(q);
        const reactUp = {
          text: "⬆",
          key: message.key
        };
        const react = { react: reactUp };
        await bot.sendMessage(from, react);

        const document = { url: downloadInfo.dl_link };
        const documentMessage = {
          document: document,
          mimetype: "video/mp4"
        };
        const quotedMessage = { quoted: message };

        await bot.sendMessage(from, documentMessage, quotedMessage);

        const reactSuccess = {
          text: "✔",
          key: message.key
        };
        const successReact = { react: reactSuccess };
        await bot.sendMessage(from, successReact);
      } catch (error3) {
        console.log(error3);
      }
    }
  }
});

const Commandytaa = {
  pattern: "ytaa",
  react: "⬇️",
  dontAddCommandList: false,
  filename: __filename
};

cmd(Commandytaa, async (bot, message, user, {
  from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    const replyMsg = (await fetchJson("https://raw.githubusercontent.com/ChethiyaMD/bad_word.json/refs/heads/main/Mreply.json")).replyMsg;
    
    if (!q) {
      return reply(replyMsg.url);
    }

    if (!q.includes("https://youtube.com/watch?v=")) {
      return await reply(replyMsg.not_fo);
    }

    let downloadUrl = await getDownloadUrl(q, "mp3");
    const reactUp = {
      text: "⬆️",
      key: message.key
    };
    const react = { react: reactUp };
    await bot.sendMessage(from, react);

    const audio = { url: downloadUrl };
    const audioMessage = {
      audio: audio,
      mimetype: "audio/mpeg",
      ptt: true // PTT enabled
    };
    const quotedMessage = { quoted: message };

    await bot.sendMessage(from, audioMessage, quotedMessage);

    const reactSuccess = {
      text: "✅",
      key: message.key
    };
    const successReact = { react: reactSuccess };
    await bot.sendMessage(from, successReact);
  } catch (error) {
    console.log(error);

    try {
      const replyMsg = (await fetchJson("https://raw.githubusercontent.com/ChethiyaMD/bad_word.json/refs/heads/main/Mreply.json")).replyMsg;

      if (!q) {
        return reply(replyMsg.url);
      }

      if (!q.includes("https://youtube.com/watch?v=")) {
        return await reply(replyMsg.not_fo);
      }

      let downloadInfo = await giftm(q);
      const reactUp = {
        text: "⬆️",
        key: message.key
      };
      const react = { react: reactUp };
      await bot.sendMessage(from, react);

      const audio = { url: downloadInfo.dl_link };
      const audioMessage = {
        audio: audio,
        mimetype: "audio/mpeg",
        ptt: true // PTT enabled
      };
      const quotedMessage = { quoted: message };

      await bot.sendMessage(from, audioMessage, quotedMessage);

      const reactSuccess = {
        text: "✅",
        key: message.key
      };
      const successReact = { react: reactSuccess };
      await bot.sendMessage(from, successReact);
    } catch (error2) {
      try {
        if (!q) {
          return reply(msr.url);
        }

        if (!q.includes("https://youtube.com/watch?v=")) {
          return await reply(msr.not_fo);
        }

        let downloadInfo = await ytmp3(q);
        const reactUp = {
          text: "⬆️",
          key: message.key
        };
        const react = { react: reactUp };
        await bot.sendMessage(from, react);

        const audio = { url: downloadInfo.dl_link };
        const audioMessage = {
          audio: audio,
          mimetype: "audio/mpeg",
          ptt: true // PTT enabled
        };
        const quotedMessage = { quoted: message };

        await bot.sendMessage(from, audioMessage, quotedMessage);

        const reactSuccess = {
          text: "✅",
          key: message.key
        };
        const successReact = { react: reactSuccess };
        await bot.sendMessage(from, successReact);
      } catch (error3) {
        console.log(error3);
        reply("❌ Failed to download audio. Please try again later.");
      }
    }
  }
});
        
const Commandytaav = {
  pattern: "ytaav",
  react: "⬇️",
  dontAddCommandList: false,
  filename: __filename
};

cmd(Commandytaav, async (bot, message, user, {
  from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    const replyMsg = (await fetchJson("https://raw.githubusercontent.com/ChethiyaMD/bad_word.json/refs/heads/main/Mreply.json")).replyMsg;
    
    if (!q) {
      return reply(replyMsg.url);
    }

    if (!q.includes("https://youtube.com/watch?v=")) {
      return await reply(replyMsg.not_fo);
    }

    let downloadUrl = await getDownloadUrl(q, "mp3");
    const reactUp = {
      text: "⬆️",
      key: message.key
    };
    const react = { react: reactUp };
    await bot.sendMessage(from, react);

    const video = { url: downloadUrl };
    const videoMessage = {
      video: video,
      mimetype: "video/mp4",
      ptv: true // PTT enabled
    };
    const quotedMessage = { quoted: message };

    await bot.sendMessage(from, videoMessage, quotedMessage);

    const reactSuccess = {
      text: "✅",
      key: message.key
    };
    const successReact = { react: reactSuccess };
    await bot.sendMessage(from, successReact);
  } catch (error) {
    console.log(error);

    try {
      const replyMsg = (await fetchJson("https://raw.githubusercontent.com/ChethiyaMD/bad_word.json/refs/heads/main/Mreply.json")).replyMsg;

      if (!q) {
        return reply(replyMsg.url);
      }

      if (!q.includes("https://youtube.com/watch?v=")) {
        return await reply(replyMsg.not_fo);
      }

      let downloadInfo = await giftm(q);
      const reactUp = {
        text: "⬆️",
        key: message.key
      };
      const react = { react: reactUp };
      await bot.sendMessage(from, react);

      const video = { url: downloadInfo.dl_link };
      const videoMessage = {
        video: video,
        mimetype: "video/mp4",
        ptv: true // PTT enabled
      };
      const quotedMessage = { quoted: message };

      await bot.sendMessage(from, videoMessage, quotedMessage);

      const reactSuccess = {
        text: "✅",
        key: message.key
      };
      const successReact = { react: reactSuccess };
      await bot.sendMessage(from, successReact);
    } catch (error2) {
      try {
        if (!q) {
          return reply(msr.url);
        }

        if (!q.includes("https://youtube.com/watch?v=")) {
          return await reply(msr.not_fo);
        }

        let downloadInfo = await ytmp3(q);
        const reactUp = {
          text: "⬆️",
          key: message.key
        };
        const react = { react: reactUp };
        await bot.sendMessage(from, react);

        const video = { url: downloadInfo.dl_link };
        const videoMessage = {
          video: video,
          mimetype: "video/mp4",
          ptv: true // PTT enabled
        };
        const quotedMessage = { quoted: message };

        await bot.sendMessage(from, videoMessage, quotedMessage);

        const reactSuccess = {
          text: "✅",
          key: message.key
        };
        const successReact = { react: reactSuccess };
        await bot.sendMessage(from, successReact);
      } catch (error3) {
        console.log(error3);
        reply("❌ Failed to download audio. Please try again later.");
      }
    }
  }
});
