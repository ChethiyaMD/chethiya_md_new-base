const os = require("os");
const { cmd, commands } = require("../lib/command");
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, Func, fetchJson, } = require("../lib/functions");
const axios = require("axios");
const config = require("../settings");


cmd({
  pattern: "about",
  desc: "Send image + all button types including single_select",
  category: "main",
  react: "🎭",
  filename: __filename,
}, async (conn, mek, m, { from }) => {
  try {
    await conn.sendMessage(from, { react: { text: "🎭", key: mek.key } });

    const interactiveButtons = [
      {
        name: "single_select",
        buttonParamsJson: JSON.stringify({
          title: "📟 Select a Category",
          sections: [
            {
              title: "🄿🄾🅆🄴🅁🄳 🅱🆈 𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯",
              highlight_label: "Chetiya_MD",
              rows: [
                {
                  header: "Chethiya_MD",
                  title: "Alive Command",
                  description: "Bot all system information",
                  id: ".alive"
                },
                {
                  header: "Chethiya_MD",
                  title: "Update Command",
                  description: "Bot system restart",
                  id: ".update"
                },
                {
                  header: "Chethiya_MD",
                  title: "MENU Command",
                  description: "Bot All Command List",
                  id: ".menu"
                }
              ]
            }
          ]
        })
      },
      {
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
          display_text: "Login Channel",
          url: "https://whatsapp.com/channel/0029VbBfj6AIiRomlA38a91R"
        })
      },
      {
        name: "cta_copy",
        buttonParamsJson: JSON.stringify({
          display_text: "Copy Repo",
          id: "copy_access",
          copy_code: "https://github.com/hjhhkkii/1098/0Chethiya_MD0.0.1.git"
        })
      },
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "Bot Speed",
          id: ".ping"
        })
      }
    ];

    const interactiveMessage = {
      image: { url: "https://files.catbox.moe/b7hkxj.jpg" },
      caption: "*01. Nᴀᴍᴇ =𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯.*\n*02.Fʀᴏᴍ= matele*\n*03.Aɢᴇ = 17🐼💨*\n*04.ɢᴇɴᴅᴇʀ =boy💁‍♂💣*\n\n♡ ㅤ      ❍ㅤ        ⎙ㅤ    ⌲ \nˡᶦᵏᵉ     ᶜᵒᵐᵐᵉⁿᵗ     ˢᵃᵛᵉ     ˢʰᵃʳᵉ.",
      title: "😈 𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯",
      footer: "*🄿🄾🅆🄴🅁🄳 🅱🆈  😈 𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯*",
      interactiveButtons
    };

    await conn.sendMessage(from, interactiveMessage, { quoted: mek });

  } catch (e) {
    console.error("selecttest error:", e);
    await conn.sendMessage(from, {
      text: "❌ Error: " + e.message
    }, { quoted: mek });
  }
});
