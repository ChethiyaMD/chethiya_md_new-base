const { cmd } = require('../lib/command');
const config = require('../settings');
const os = require('os');
const { runtime } = require('../lib/functions');

// Main Menu Command
cmd({
  pattern: "menu",
  react: "📂",
  desc: "Check bot Commands.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { reply, prefix }) => {
  try {
    const uptime = runtime(process.uptime());
    const ramUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2);
    const hostName = os.hostname();

    let teksnya = `
╭━━━━∙⋆⋅⋆∙━ ─┉─ • ─┉─⊷ *Hi 👋*  *User* 
┃◈┃• *⏳ Uptime:* ${uptime} 
┃◈┃• *📟 RAM:* ${ramUsage}MB / ${totalMem}MB 
┃◈┃• *👨‍💻 Owner:* Chethiya 
┃◈┃• *🧬 Version:* 0.0.1 BETA 
┃◈┃• *⚙️ Platform:* ${hostName}
┃◈┃• *Chethiya_MD Command List* 
╰━━━━∙⋆⋅⋆∙━ ─┉─ • ─┉─⊷

*🄿🄾🅆🄴🅁🄳* *🅱🆈*😈 *𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯*`;

    const imageUrl = "https://files.catbox.moe/b7hkxj.jpg";

    const vpsOptions = [
      { title: "ᴏᴡɴᴇʀ menu", description: "Bot Owner Only Commands", id: `${prefix}ownermenu` },
      { title: "ᴅᴏᴡɴʟᴏᴀᴅ menu", description: "Get Bot Download Menu", id: `${prefix}dlmenu` },
      { title: "LOGO MENU", description: "Get Bot logo Menu", id: `${prefix}logomenu` },
      { title: "ᴄᴏɴᴠᴇʀᴛ menu", description: "Get Bot Convert Menu", id: `${prefix}convertmenu` },
      { title: "ɢʀᴏᴜᴘ ᴍᴇɴᴜ", description: "Get Group Only Commands", id: `${prefix}groupmenu` },
      { title: "ᴀɪ ᴍᴇɴᴜ", description: "Get Bot AI Commands List", id: `${prefix}aimenu` },
      { title: "𝙰𝙽𝙸𝙼𝙴 menu", description: "Get Bot Search Menu", id: `${prefix}animemenu` },
      { title: "ꜰᴜɴ menu", description: "Fun Joke Menu Bot", id: `${prefix}funmenu` },
      { title: "𝙼𝙰𝙸𝙽 menu", description: "Owner Only Bug Menu", id: `${prefix}mainmenu` },
      { title: "𝙾𝚃𝙷𝙴𝚁 ᴍᴇɴᴜ️", description: "Random Commands Menu", id: `${prefix}othermenu` }
    ];

    const buttonSections = [
      {
        title: "List of Chethiya_MD Bot Commands",
        rows: vpsOptions,
      }
    ];

    const buttons = [
      {
        buttonId: "action",
        buttonText: { displayText: "Select Menu" },
        type: 4,
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "Choose Menu Tab 📜",
            sections: buttonSections,
          }),
        },
      },
    ];

    await conn.sendMessage(m.chat, {
      buttons,
      headerType: 1,
      viewOnce: true,
      caption: teksnya,
      image: { url: imageUrl },
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: `𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯`,
          serverMessageId: 143,
        },
      },
    }, { quoted: mek });

  } catch (e) {
    console.error(e);
    reply(`Error: ${e.message}`);
  }
});

// Owner Menu Submenu
cmd({
  pattern: "ownermenu",
  desc: "Show owner only commands",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  try {
    const text = `
*Owner Menu Commands:*
- .ban <user>
- .unban <user>
- .broadcast <text>
- .setprefix <prefix>
- .eval <code>
- .shutdown
    `;
    await reply(text);
  } catch (e) {
    console.error(e);
    reply(`Error: ${e.message}`);
  }
});

// Download Menu Submenu
cmd({
  pattern: "dlmenu",
  desc: "Show download commands",
  category: "downloader",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  try {
    const text = `
*Download Menu Commands:*
- .ytmp3 <url>
- .ytmp4 <url>
- .tiktok <url>
- .spotify <url>
- .mediafire <url>
    `;
    await reply(text);
  } catch (e) {
    console.error(e);
    reply(`Error: ${e.message}`);
  }
});

// Logo Menu Submenu
cmd({
  pattern: "logomenu",
  desc: "Show logo commands",
  category: "logo",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  try {
    const text = `
*Logo Menu Commands:*
- .logo1 <text>
- .logo2 <text>
- .logoneon <text>
- .logogold <text>
    `;
    await reply(text);
  } catch (e) {
    console.error(e);
    reply(`Error: ${e.message}`);
  }
});

// Convert Menu Submenu
cmd({
  pattern: "convertmenu",
  desc: "Show convert commands",
  category: "converter",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  try {
    const text = `
*Convert Menu Commands:*
- .toimg <sticker>
- .tomp3 <video>
- .tomp4 <audio>
- .togif <sticker>
- .tourl <media>
    `;
    await reply(text);
  } catch (e) {
    console.error(e);
    reply(`Error: ${e.message}`);
  }
});

// Group Menu Submenu
cmd({
  pattern: "groupmenu",
  desc: "Show group commands",
  category: "group",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  try {
    const text = `
*Group Menu Commands:*
- .add <number>
- .kick <number>
- .promote <number>
- .demote <number>
- .setgroupname <text>
- .setgroupdesc <text>
    `;
    await reply(text);
  } catch (e) {
    console.error(e);
    reply(`Error: ${e.message}`);
  }
});

// AI Menu Submenu
cmd({
  pattern: "aimenu",
  desc: "Show AI commands",
  category: "ai",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  try {
    const text = `
*AI Menu Commands:*
- .chatgpt <text>
- .dalle <prompt>
- .askai <question>
- .voiceai <audio>
    `;
    await reply(text);
  } catch (e) {
    console.error(e);
    reply(`Error: ${e.message}`);
  }
});

// Anime Menu Submenu
cmd({
  pattern: "animemenu",
  desc: "Show anime commands",
  category: "anime",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  try {
    const text = `
*Anime Menu Commands:*
- .anime <query>
- .waifu
- .awall
- .aquote
    `;
    await reply(text);
  } catch (e) {
    console.error(e);
    reply(`Error: ${e.message}`);
  }
});

// Fun Menu Submenu
cmd({
  pattern: "funmenu",
  desc: "Show fun commands",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  try {
    const text = `
*Fun Menu Commands:*
- .joke
- .meme
- .truth
- .dare
- .quiz
    `;
    await reply(text);
  } catch (e) {
    console.error(e);
    reply(`Error: ${e.message}`);
  }
});

// Main Menu (Owner Bug Menu) Submenu
cmd({
  pattern: "mainmenu",
  desc: "Show main owner bug commands",
  category: "owner",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  try {
    const text = `
*Main Menu (Owner Bug Commands):*
- .bugreport
- .fixbug
- .debug
    `;
    await reply(text);
  } catch (e) {
    console.error(e);
    reply(`Error: ${e.message}`);
  }
});

// Other Menu Submenu
cmd({
  pattern: "othermenu",
  desc: "Show other random commands",
  category: "other",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  try {
    const text = `
*Other Menu Commands:*
- .weather <location>
- .translate <text>
- .calculator <expression>
- .reminder <time> <text>
    `;
    await reply(text);
  } catch (e) {
    console.error(e);
    reply(`Error: ${e.message}`);
  }
});
