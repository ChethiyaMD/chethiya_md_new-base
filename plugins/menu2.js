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
  pattern: "menu",
  alias: ["menul", "md"],
  desc: "Chetiya md Stylish Interactive Menu",
  react: "🧨",
  category: "utility",
  filename: __filename,
}, async (conn, mek, m, { from, sender, reply }) => {
  try {
    const menuImage = await prepareWAMessageMedia({
      image: { url: "https://files.catbox.moe/b7hkxj.jpg" }
    }, { upload: conn.waUploadToServer });

    const defaultButtons = [
      {
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
          display_text: "🌐 Visit Website",
          url: "https://chathuraapiweb.netlify.app"
        })
      },
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "🏠 Main Menu",
          id: ".menu"
        })
      }
    ];

    const cards = [
      {
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `╔═══ ⬩ BOT CONTROL ⬩ ═══╗\n\n• settings\n• shutdown\n• broadcast\n• setpp\n• block\n• unblock\n• clearchats\n• gjid\n• jid`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: "Chethiya_MD | Bot Controls"
        }),
        header: proto.Message.InteractiveMessage.Header.create({
          title: "Chethiya_MD-\nBOT CONTROL",
          subtitle: "Bot Manager & Admin Tools",
          hasMediaAttachment: true,
          ...menuImage
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: defaultButtons
        })
      },
      {
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `╔═══ ⬩ AI & TOOLS ⬩ ═══╗\n\n• ai\n• deepseek\n• openai\n• autoai\n• imgscan\n• githubstalk\n• gitclone\n• repo\n• short`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: "🤖 Chethiya_MD | AI Features"
        }),
        header: proto.Message.InteractiveMessage.Header.create({
          title: "Chethiya_MD\nAI TOOLS",
          subtitle: "Smarter Features with AI",
          hasMediaAttachment: true,
          ...menuImage
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: defaultButtons
        })
      },
      {
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `╔═══ ⬩ DOWNLOAD / SEARCH ⬩ ═══╗\n\n• tiktokstalk\n• yts\n• song\n• video\n• twitter\n• mediafire\n• gdrive\n• listcmd`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: "📥 Chethiya_MD | Search/Download"
        }),
        header: proto.Message.InteractiveMessage.Header.create({
          title: "Chethiya_MD\nDL & SEARCH",
          subtitle: "Media + Web Tools",
          hasMediaAttachment: true,
          ...menuImage
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: defaultButtons
        })
      },
      {
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `╔═══ ⬩ MEDIA / GROUP ⬩ ═══╗\n\n• anime\n• chr\n• rw\n• tagadmins\n• alive\n• ping\n• ping2\n• ss`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: "🎭 Chethiya_MD | Media Zone"
        }),
        header: proto.Message.InteractiveMessage.Header.create({
          title: "Chethiya_MD\nFUN ZONE",
          subtitle: "Entertainment + Group Tools",
          hasMediaAttachment: true,
          ...menuImage
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: defaultButtons
        })
      },
      {
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `╔═══ ⬩ UTILITY ⬩ ═══╗\n\n• weather\n• country\n• topdf\n• torul\n• news\n• owner`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: "🧰 Chethiya_MD | Utilities"
        }),
        header: proto.Message.InteractiveMessage.Header.create({
          title: "Chethiya_MD\nUTILITY PANEL",
          subtitle: "Quick Info & Tools",
          hasMediaAttachment: true,
          ...menuImage
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: defaultButtons
        })
      }
    ];

    const msg = generateWAMessageFromContent(from, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: { text: "🧿 *Chethiya_MD Menu*" },
            footer: { text: "📲 Swipe through powerful panels!" },
            header: { hasMediaAttachment: false },
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards }),
            contextInfo: {
              mentionedJid: [sender],
              forwardingScore: 999,
              isForwarded: true
            }
          })
        }
      }
    }, { quoted: mek });

    await conn.relayMessage(from, msg.message, { messageId: msg.key.id });
  } catch (e) {
    console.error("❌ CRYPTO-XMD-V2 Menu Error:", e);
    reply("❌ Menu Error: " + e.message);
  }
});
