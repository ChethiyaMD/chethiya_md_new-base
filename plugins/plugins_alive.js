const config = require("../settings");
const { cmd } = require('../lib/command');
const os = require('os');
const { getBuffer, runtime } = require('../lib/functions');

cmd({
    pattern: "alive2",
    desc: "Check bot online or no.",
    category: "main",
    react: "👋",
    filename: __filename
},
async (conn, mek, m, {
    from, pushname, reply
}) => {
    try {
        const caption = `*👋🏻 Welcome to DTZ MOVIE X Bot*

*╭─「 BOT STATUS 」*
*│* 🎃 *USER* = **
*│* 🤖 *BOT NAME* = ᴅᴛᴢ ᴍᴏᴠɪᴇ x ʙᴏᴛ
*│* 🎭 *VERSION* = 1.0.0
*│* 🕐 *UPTIME* = ${runtime(process.uptime())}
*│* 🌐 *RAM* = ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
*╰───────────────◆*

*📁 SYSTEM SPECS (Fake)*  
• RAM : 100TB DDR5  
• CPU : AMD RYZEN 9999X  
• GPU : RTX 9090 Ti x4  
• STATUS : 100% OPERATIONAL

> ⚡ Powered by DARK TECH ZONE ×`;

        await conn.sendMessage(from, {
            document: {
                url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            mimetype: 'application/pdf',
            fileName: 'DTZ-SYSTEM-REPORT-100TB.pdf',
            fileLength: 100000000000, // Fake size
            pageCount: 1,
            caption: caption,
            jpegThumbnail: await getBuffer("https://i.ibb.co/R4Z1NyX5/image-1744723361296.jpg"),
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
