const os = require("os");
const { cmd, commands } = require("../lib/command");
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, Func, fetchJson, } = require("../lib/functions");
const axios = require("axios");
const config = require("../settings");


const menuCommand = {
cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    category: "main",
    react: "👋",
    filename: __filename
},
async (conn, mek, m, {
    from, pushname, reply
}) => {
    try {

        const caption =
        `*𝐇𝐈* *${pushname}* 𝓤𝓼𝓮𝓻 
        𝓲'𝓶 𝙰𝙻𝙸𝚅𝙴 🅽🅾🆆
*╭─「𝘼𝙡𝙞𝙫𝙚 𝙎𝙮𝙨𝙩𝙪𝙢」*
*│* 🎃 *USER* = *${pushname}*
*│* 🤖 *BOT NAME* =*𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯*
*│* 🎭 *VERSION* = 1.0.0
*│* 🕐 *UPTIME* = ${runtime(process.uptime())}
*│* 🌐 *RAM* = ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
*╰───────────────◆*

*📁 SYSTEM SPECS (Fake)*  
• RAM : 📟100TB DDR5  
• CPU : 🎚️AMD RYZEN 9999X  
• GPU : 🎛️RTX 9090 Ti x4  
• STATUS 🧑‍💻 : 100% OPERATIONAL

> 🄿🄾🅆🄴🅁🄳 🅱🆈  😈 𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯`;

        await conn.sendMessage(from, {
            document: {
                url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            
i           image: { url: "https://files.catbox.moe/b7hkxj.jpg" },
            mimetype: 'application/pdf',
            fileName: 'CHETIYA-SYSTEM-REPORT-100TB.pdf',
            fileLength: 100000000000, // Fake 100TB size
            pageCount: 1,
            caption: caption,
            jpegThumbnail: await getBuffer("https://i.ibb.co/R4Z1NyX5/image-1744723361296.jpg"),
image {
            
                url: "https://i.ibb.co/R4Z1NyX5/image-1744723361296.jpg"
                
                },
            buttons: [
                {
                    buttonId: '.menu',
                    buttonText: { displayText: 'MENU 🔥' },
                    type: 1
                },
                {
                    buttonId: '.ping',
                    buttonText: { displayText: 'PING 🔥' },
                    type: 1
                },
                {
                    buttonId: 'action',
                    buttonText: { displayText: ' තාම හදනවා' },
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify({
                            title: 'More Options',
                            sections: [
                                {
                                    title: `2025 SYSTEM TOOLS`,
                                    rows: [
                                        {
                                            title: 'Main Menu',
                                            description: 'Access All Features',
                                            id: '.menu'
                                        },
                                        {
                                            title: 'Owner Contact',
                                            description: 'Talk to Creator',
                                            id: '.owner'
                                        }
                                    ]
                                }
                            ]
                        })
                    }
                }
            ],
            headerType: 1,
            viewOnce: true
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        reply('An error occurred while processing your request.');
    }
});
