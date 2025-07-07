const { cmd } = require("../lib/command");
const fs = require("fs");
const path = require("path");
const config = require("../settings");
const axios = require("axios");
const EventEmitter = require('events');

// Increase max listeners to prevent warnings
EventEmitter.defaultMaxListeners = 100;

// Add debug logging
const debugLog = (msg, error = null) => {
    console.log(`[DEBUG] ${msg}`);
    if (error) console.error('[ERROR]', error);
};

// Add retry utility with better error handling
const retryOperation = async (operation, maxRetries = 2) => {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await operation();
        } catch (error) {
            debugLog(`Retry ${i + 1}/${maxRetries} failed`, error);
            if (i === maxRetries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1))); // Exponential backoff
        }
    }
};

//auto_voice
cmd({
  on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {
    const filePath = path.join(__dirname, '../lib/data/autovoice.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const text in data) {
        if (body.toLowerCase() === text.toLowerCase()) {
            if (config.AUTO_VOICE === 'true') {
                //if (isOwner) return;        
                await conn.sendPresenceUpdate('recording', from);
                await conn.sendMessage(from, { audio: { url: data[text] }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek });
            }
        }
    }                
});

//auto sticker 
cmd({
  on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {
    const filePath = path.join(__dirname, '../lib/data/autosticker.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const text in data) {
        if (body.toLowerCase() === text.toLowerCase()) {
            if (config.AUTO_STICKER === 'true') {
                //if (isOwner) return;        
                await conn.sendMessage(from,{sticker: { url : data[text]},package: 'yourName'},{ quoted: mek })   
            
            }
        }
    }                
});

//auto reply 
cmd({
  on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {
    const filePath = path.join(__dirname, '../lib/data/autoreply.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const text in data) {
        if (body.toLowerCase() === text.toLowerCase()) {
            if (config.AUTO_REPLY === 'true') {
                //if (isOwner) return;        
                await m.reply(data[text])
            
            }
        }
    }                
});

const commandbody = {
  on: "body"
};

cmd(commandbody, async (
  bot, message, chat, {
    from,
    prefix,
    l,
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

  if (config.AUTO_REACT === "true") {
    const reactions = [
      '❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗',
      '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊',
      '🎊', '🎉', '🎁', '🎈', '👋'
    ];

    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];

    const reactionMessage = {
      react: {
        text: randomReaction,
        key: message.key
      }
    };

    bot.sendMessage(from, reactionMessage);
  }
});

// Composing (Auto Typing)
cmd({
    on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {
    if (config.AUTO_TYPING === 'true') {
        await conn.sendPresenceUpdate('composing', from); 
    }
});

cmd({
    on: "body"
  },    
  async (conn, mek, m, { from, body, isOwner }) => {
    if (body.toLowerCase() || text.toLowerCase()) {
              if (config.FAKE_RECORDING === 'true') {
                  //if (isOwner) return;        
                  await conn.sendPresenceUpdate('recording', from);
              }      
            }         
  });