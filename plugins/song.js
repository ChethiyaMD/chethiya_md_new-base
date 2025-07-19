const axios = require('axios');
const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "news",
    alias: ["hirunews", "newshiru", "hirulk"],
    react: "⭐",
    category: "search hiru news",
    desc: "Fetch the latest news from the SUHAS API in Hiru API.",
    use: ".news",
    filename: __filename,
},
    async (conn, mek, m, {
        from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber,
        botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName,
        participants, groupAdmins, isBotAdmins, isAdmins, reply
    }) => {
        try {
            const apiUrl = `https://suhas-bro-apii.vercel.app/hiru`;
            const response = await axios.get(apiUrl);
            const data = response.data;

            if (!data || !data.newsURL || !data.title || !data.image || !data.text) {
                return reply(`*No News Available At This Moment* ❗`);
            }

            const { newsURL, title, image, text } = data;

            let newsInfo = "𝗖𝗵𝗲𝘁𝗵𝗶𝘆𝗮_𝗠𝗗 𝐇𝐢𝐫𝐮 𝐍𝐞𝐰𝐬 𝐔𝐩𝐝𝐚𝐭𝐞 📰\n\n";
            newsInfo += `✨ *Title*: ${title}\n\n`;
            newsInfo += `📑 *Description*:\n${text}\n\n`;
            newsInfo += `⛓️‍💥 *Url*: www.hirunews.lk\n\n`;
            newsInfo += `> *𝗖𝗵𝗲𝘁𝗵𝗶𝘆𝗮_𝗠𝗗*\n\n`;

            const buttons = [
                {
                    buttonId: `.hirucheck`,
                    buttonText: { displayText: "📰 More News" },
                    type: 1,
                },
                {
                    buttonId: newsURL,
                    buttonText: { displayText: "🌐 Visit Website" },
                    type: 1,
                },
            ];

            const buttonMessage = {
                image: { url: image },
                caption: newsInfo,
                footer: "> *🄿🄾🅆🄴🅁🄳 🅱🆈  😈 𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯*",
                buttons: buttons,
                headerType: 4,
            };

            await conn.sendMessage(from, buttonMessage, { quoted: m });

        } catch (error) {
            console.error(error);
            reply(`*An Error Occurred While Fetching News At This Moment* ❗`);
        }
    }
);
