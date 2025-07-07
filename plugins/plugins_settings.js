const {cmd , commands} = require('../lib/command');
const config = require('../settings');
var { get_set, input_set } = require("../lib/set_db");
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, jsonformat } = require("../lib/functions");
const axios = require('axios');


const settingsCommand = {
  pattern: 'setting',
  react: "🛡️",
  alias: ["settings", "st"],
  category: "owner",
  use: "settings"
};

cmd(settingsCommand, async (client, message, chat, { from, isOwner, prefix, reply }) => {
  try {
    if (!isOwner) return await reply("Owner Only Command..");

    const options = [
      { title: "➀𝐌𝐎𝐃𝐄", values: ["PUBLIC 🗃️", "PRIVATE 🔐", "GROUPS 🎛️", "INBOX 🌈"], command: "mode" },
      { title: "➁𝐀𝐔𝐓𝐎 𝐕𝐎𝐈𝐂𝐄", values: ["True 🔑", "False 🔐"], command: "autovoice" },
      { title: "➂𝐀𝐔𝐓𝐎 𝐒𝐓𝐈𝐂𝐊𝐄𝐑", values: ["True 🔑", "False 🔐"], command: "autosticker" },
      { title: "➃𝐀𝐔𝐓𝐎 𝐑𝐄𝐏𝐋𝐘", values: ["True 🔑", "False 🔐"], command: "autoreply" },
      { title: "➄𝐀𝐔𝐓𝐎 𝐑𝐄𝐀𝐃 𝐒𝐓𝐀𝐓𝐔𝐒", values: ["True 🔑", "False 🔐"], command: "autoreadsratus" },
      { title: "➅AUTO 𝐀𝐔𝐓𝐎 𝐑𝐄𝐀𝐂𝐓 𝐒𝐓𝐀𝐓𝐔𝐒", values: ["True 🔑", "False 🔐"], command: "autoreactstatus" },     
      { title: "➆𝐀𝐋𝐋𝐖𝐀𝐘𝐒 𝐎𝐅𝐅𝐋𝐈𝐍𝐄", values: ["True 🔑", "False 🔐"], command: "alwaysoffline" },
      { title: "➇𝐀𝐔𝐓𝐎 𝐓𝐘𝐏𝐈𝐍𝐆", values: ["True 🔑", "False 🔐"], command: "autotyping" },
      { title: "➈𝐑𝐄𝐀𝐃 𝐌𝐄𝐒𝐒𝐀𝐆𝐄", values: ["True 🔑", "False 🔐"], command: "readmessage" },
      { title: "➉𝐑𝐄𝐂𝐎𝐑𝐃𝐈𝐍𝐆", values: ["True 🔑", "False 🔐"], command: "recording" },
      { title: "➀➀𝐑𝐄𝐀𝐃 𝐂𝐎𝐌𝐌𝐀𝐍𝐃", values: ["True 🔑", "False 🔐"], command: "readcommand" },
      { title: "➀➁𝐀𝐔𝐓𝐎 𝐑𝐄𝐀𝐂𝐓", values: ["True 🔑", "False 🔐"], command: "autoreact" },
      { title: "➀➂𝐀𝐍𝐓𝐈 𝐋𝐈𝐍𝐊", values: ["True 🔑", "False 🔐"], command: "antilink" },
      { title: "➀➃𝐀𝐍𝐓𝐈 𝐃𝐄𝐋𝐄𝐓𝐄", values: ["True 🔑", "False 🔐"], command: "antibelete" },
      { title: "➀➄𝐀𝐍𝐓𝐈 𝐂𝐀𝐋𝐋", values: ["True 🔑", "False 🔐"], command: "anticall" },
      { title: "➀➅𝐀𝐍𝐈𝐓𝐈 𝐁𝐀𝐃", values: ["True 🔑", "False 🔐"], command: "antibad" },
      { title: "➀➆𝐀𝐍𝐓𝐈 𝐁𝐎𝐓", values: ["True 🔑", "False 🔐"], command: "antibot" },
      { title: "➀➇𝐀𝐔𝐓𝐎 𝐁𝐋𝐎𝐂𝐊", values: ["True 🔑", "False 🔐"], command: "autoblock" },
      { title: "➀➈𝐁𝐀𝐃 𝐍𝐎 𝐁𝐋𝐎𝐂𝐊", values: ["True 🔑", "False 🔐"], command: "badno" },
      { title: "➁◯𝐀𝐈 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓", values: ["True 🔑", "False 🔐"], command: "aichat" },
      { title: "➁➀𝐀𝐔𝐓𝐎 𝐍𝐄𝐖𝐒 𝐒𝐄𝐍𝐃𝐄𝐑", values: ["True 🔑", "False 🔐"], command: "autonewssender" },
      { title: "➁➁𝐀𝐔𝐓𝐎 𝐓𝐈𝐊𝐓𝐎𝐊 𝐒𝐄𝐍𝐃𝐄𝐑", values: ["True 🔑", "False 🔐"], command: "autotlktoksender" },
      { title: "➁➂𝐀𝐈 𝐑𝐄𝐏𝐋𝐀𝐘", values: ["True 🔑", "False 🔐"], command: "aireplay" }
    ];

    const sections = options.map((opt, index) => ({
      title: ` [${String(index + 1).padStart(2, '0')}] ${opt.title} `,
      rows: opt.values.map((value, idx) => ({
        title: `${index + 1}.${idx + 1}`,
        description: `${value}`,
        rowId: `${prefix}${opt.command} ${value.toLowerCase().split(" ")[0]}`
      }))
    }));

    const listMessage = {
      image: { url: 'https://i.ibb.co/27Gbs6bR/1234.jpg' },
      caption: "> 𝗖𝗛𝗘𝗧𝗛𝗜𝗬𝗔-𝗠𝗗 𝗕𝗢𝗧 𝗦𝗘𝗧𝗧𝗜𝗡𝗚 𝗟𝗜𝗦𝗧⚙️",
      footer: "> *🄿🄾🅆🄴🅁🄳 🅱🆈  😈 𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯*",
      buttonText: "*🔢 Select an option below*",
      sections
    };

    return await client.replyList(from, listMessage, { quoted: message });
  } catch (error) {
    reply("*ERROR..!*");
    console.error(error);
  }
});

const options = {
  pattern: "mode",
  dontAddCommandList: true,
  filename: __filename
};

cmd(options, async (message, _2, _3, {
  from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
  botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
  participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    if (!isOwner) {
      return await reply("*Only Owner 🚫*");
    }
    if (config.MODE === q) {
      return reply("already on ");
    }
    await input_set("MODE", q);
    return reply("*MODE turned " + q + "*");
  } catch (error) {
    reply("*Error !!*");
    console.log(error);
  }
});

const settings = {
  pattern: "antidelet",
  dontAddCommandList: true,
  filename: __filename
};

cmd(settings, async (command, body, extra, {
  from, quoted, bodyText, isCmd, commandName, args, q, isGroup,
  sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner,
  groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    if (!isOwner) {
      return await reply("*Only Owner 🚫*");
    }
    if (config.ANTI_DELETE == q) {
      return reply("already on");
    }
    await input_set("ANTI_DELETE", q);
    return reply("*ANTI_DELETE turned " + q + "*");
  } catch (error) {
    reply("*Error !!*");
    l(error);
  }
});

const commandvoice = {
  pattern: "autovoice",
  dontAddCommandList: true,
  filename: __filename
};

cmd(commandvoice, async (
  client, message, extraData, { from,quoted,body,isCmd,command,args,q,isGroup,sender,senderNumber,botNumber2,botNumber,pushname,isMe,isOwner,groupMetadata,groupName,participants,groupAdmins,isBotAdmins,isAdmins,
    reply
  }
) => {
  try {
    if (!isOwner) {
      return await reply("*Only Owner 🚫*");
    }
    
    if (config.AUTO_VOICE == q) {
      return reply("already on ");
    }
    
    await input_set("AUTO_VOICE", q);
    return reply(`*AUTO_VOICE turned ${q}*`);
    
  } catch (error) {
    reply("*Error !!*");
    console.error(error);
  }
});

const commandsratus = {
  pattern: "autoreadsratus",
  dontAddCommandList: true,
  filename: __filename
};

cmd(commandsratus, async (
  client, message, extra, { from,quoted,body,isCmd,command,args,q,isGroup,sender,senderNumber,botNumber2,botNumber,pushname,isMe,isOwner,groupMetadata,groupName,participants,groupAdmins,isBotAdmins,isAdmins,
    reply
  }
) => {
  try {
    if (!isOwner) {
      return await reply("*Only Owner 🚫*");
    }

    if (config.AUTO_READ_STATUS == q) {
      return reply("already on ");
    }

    await input_set("AUTO_READ_STATUS", q);
    return reply(`*AUTO_READ_STATUS turned ${q}*`);
  } catch (error) {
    reply("*Error !!*");
    console.error(error);
  }
});

const commandsticker = {
  pattern: "autosticker",
  dontAddCommandList: true,
  filename: __filename
};

cmd(commandsticker, async (command, body, extra, {
  from, quoted, bodyText, isCmd, commandName, args, q, isGroup,
  sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner,
  groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    if (!isOwner) {
      return await reply("*Only Owner 🚫*");
    }
    if (config.AUTO_STICKER == q) {
      return reply("already on");
    }
    await input_set("AUTO_STICKER", q);
    return reply("*AUTO_STICKER turned " + q + "*");
  } catch (error) {
    reply("*Error !!*");
    l(error);
  }
});

const commandreply = {
  pattern: "autoreply",
  dontAddCommandList: true,
  filename: __filename
};

cmd(commandreply, async (command, body, extra, {
  from, quoted, bodyText, isCmd, commandName, args, q, isGroup,
  sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner,
  groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    if (!isOwner) {
      return await reply("*Only Owner 🚫*");
    }
    if (config.AUTO_REPLY == q) {
      return reply("already on");
    }
    await input_set("AUTO_REPLY", q);
    return reply("*AUTO_REPLY turned " + q + "*");
  } catch (error) {
    reply("*Error !!*");
    l(error);
  }
});

const commandreact = {
  pattern: "autoreact",
  dontAddCommandList: true,
  filename: __filename
};

cmd(commandreact, async (command, body, extra, {
  from, quoted, bodyText, isCmd, commandName, args, q, isGroup,
  sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner,
  groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    if (!isOwner) {
      return await reply("*Only Owner 🚫*");
    }
    if (config.AUTO_REACT == q) {
      return reply("already on");
    }
    await input_set("AUTO_REACT", q);
    return reply("*AUTO_REACT turned " + q + "*");
  } catch (error) {
    reply("*Error !!*");
    l(error);
  }
});

const commandtyping = {
  pattern: "autotyping",
  dontAddCommandList: true,
  filename: __filename
};

cmd(commandtyping, async (command, body, extra, {
  from, quoted, bodyText, isCmd, commandName, args, q, isGroup,
  sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner,
  groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    if (!isOwner) {
      return await reply("*Only Owner 🚫*");
    }
    if (config.AUTO_TYPING == q) {
      return reply("already on");
    }
    await input_set("AUTO_TYPING", q);
    return reply("*AUTO_TYPING turned " + q + "*");
  } catch (error) {
    reply("*Error !!*");
    l(error);
  }
});

const commandrecording = {
  pattern: "recording",
  dontAddCommandList: true,
  filename: __filename
};

cmd(commandrecording, async (command, body, extra, {
  from, quoted, bodyText, isCmd, commandName, args, q, isGroup,
  sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner,
  groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    if (!isOwner) {
      return await reply("*Only Owner 🚫*");
    }
    if (config.RECORDING == q) {
      return reply("already on");
    }
    await input_set("RECORDING", q);
    return reply("*RECORDING turned " + q + "*");
  } catch (error) {
    reply("*Error !!*");
    l(error);
  }
});

const commandibad = {
  pattern: "antibad",
  dontAddCommandList: true,
  filename: __filename
};

cmd(commandibad, async (command, body, extra, {
  from, quoted, bodyText, isCmd, commandName, args, q, isGroup,
  sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner,
  groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    if (!isOwner) {
      return await reply("*Only Owner 🚫*");
    }
    if (config.ANTI_BAD == q) {
      return reply("already on");
    }
    await input_set("ANTI_BAD", q);
    return reply("*ANTI_BAD turned " + q + "*");
  } catch (error) {
    reply("*Error !!*");
    l(error);
  }
});

const commandilink = {
  pattern: "antilink",
  dontAddCommandList: true,
  filename: __filename
};

cmd(commandilink, async (command, body, extra, {
  from, quoted, bodyText, isCmd, commandName, args, q, isGroup,
  sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner,
  groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    if (!isOwner) {
      return await reply("*Only Owner 🚫*");
    }
    if (config.ANTI_LINK == q) {
      return reply("already on");
    }
    await input_set("ANTI_LINK", q);
    return reply("*ANTI_LINK turned " + q + "*");
  } catch (error) {
    reply("*Error !!*");
    l(error);
  }
});

const commandbadno = {
  pattern: "badno",
  dontAddCommandList: true,
  filename: __filename
};

cmd(commandbadno, async (command, body, extra, {
  from, quoted, bodyText, isCmd, commandName, args, q, isGroup,
  sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner,
  groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    if (!isOwner) {
      return await reply("*Only Owner 🚫*");
    }
    if (config.BAD_NO_BLOCK == q) {
      return reply("already on");
    }
    await input_set("BAD_NO_BLOCK", q);
    return reply("*BAD_NO_BLOCK turned " + q + "*");
  } catch (error) {
    reply("*Error !!*");
    l(error);
  }
});

const commandreadcommand = {
  pattern: "readcommand",
  dontAddCommandList: true,
  filename: __filename
};

cmd(commandreadcommand, async (command, body, extra, {
  from, quoted, bodyText, isCmd, commandName, args, q, isGroup,
  sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner,
  groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    if (!isOwner) {
      return await reply("*Only Owner 🚫*");
    }
    if (config.READ_CMD == q) {
      return reply("already on");
    }
    await input_set("READ_CMD", q);
    return reply("*READ_CMD turned " + q + "*");
  } catch (error) {
    reply("*Error !!*");
    l(error);
  }
});

const commandcall = {
  pattern: "anticall",
  dontAddCommandList: true,
  filename: __filename
};

cmd(commandcall, async (command, body, extra, {
  from, quoted, bodyText, isCmd, commandName, args, q, isGroup,
  sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner,
  groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    if (!isOwner) {
      return await reply("*Only Owner 🚫*");
    }
    if (config.ANTI_CALL == q) {
      return reply("already on");
    }
    await input_set("ANTI_CALL", q);
    return reply("*ANTI_CALL turned " + q + "*");
  } catch (error) {
    reply("*Error !!*");
    l(error);
  }
});

const commandblock = {
  pattern: "autoblock",
  dontAddCommandList: true,
  filename: __filename
};

cmd(commandblock, async (command, body, extra, {
  from, quoted, bodyText, isCmd, commandName, args, q, isGroup,
  sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner,
  groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    if (!isOwner) {
      return await reply("*Only Owner 🚫*");
    }
    if (config.AUTO_BLOCK == q) {
      return reply("already on");
    }
    await input_set("AUTO_BLOCK", q);
    return reply("*AUTO_BLOCK turned " + q + "*");
  } catch (error) {
    reply("*Error !!*");
    l(error);
  }
});

const commandoffline = {
  pattern: "alwaysoffline",
  dontAddCommandList: true,
  filename: __filename
};

cmd(commandoffline, async (command, body, extra, {
  from, quoted, bodyText, isCmd, commandName, args, q, isGroup,
  sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner,
  groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    if (!isOwner) {
      return await reply("*Only Owner 🚫*");
    }
    if (config.ALLWAYS_OFFLINE == q) {
      return reply("already on");
    }
    await input_set("ALLWAYS_OFFLINE", q);
    return reply("*ALLWAYS_OFFLINE turned " + q + "*");
  } catch (error) {
    reply("*Error !!*");
    l(error);
  }
});

const commandreactstatus = {
  pattern: "autoreactstatus",
  dontAddCommandList: true,
  filename: __filename
};

cmd(commandreactstatus, async (command, body, extra, {
  from, quoted, bodyText, isCmd, commandName, args, q, isGroup,
  sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner,
  groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    if (!isOwner) {
      return await reply("*Only Owner 🚫*");
    }
    if (config.AUTO_REACT_STATUS == q) {
      return reply("already on");
    }
    await input_set("AUTO_REACT_STATUS", q);
    return reply("*AUTO_REACT_STATUS turned " + q + "*");
  } catch (error) {
    reply("*Error !!*");
    l(error);
  }
});

const commandbelete = {
  pattern: "antibelete",
  dontAddCommandList: true,
  filename: __filename
};

cmd(commandbelete, async (command, body, extra, {
  from, quoted, bodyText, isCmd, commandName, args, q, isGroup,
  sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner,
  groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    if (!isOwner) {
      return await reply("*Only Owner 🚫*");
    }
    if (config.ANTI_DELETE == q) {
      return reply("already on");
    }
    await input_set("ANTI_DELETE", q);
    return reply("*ANTI_DELETE turned " + q + "*");
  } catch (error) {
    reply("*Error !!*");
    l(error);
  }
});

const commandmessage = {
  pattern: "readmessage",
  dontAddCommandList: true,
  filename: __filename
};

cmd(commandmessage, async (command, body, extra, {
  from, quoted, bodyText, isCmd, commandName, args, q, isGroup,
  sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner,
  groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    if (!isOwner) {
      return await reply("*Only Owner 🚫*");
    }
    if (config.READ_MESSAGE == q) {
      return reply("already on");
    }
    await input_set("READ_MESSAGE", q);
    return reply("*READ_MESSAGE turned " + q + "*");
  } catch (error) {
    reply("*Error !!*");
    l(error);
  }
});

const commandantibot = {
  pattern: "antibot",
  dontAddCommandList: true,
  filename: __filename
};

cmd(commandantibot, async (command, body, extra, {
  from, quoted, bodyText, isCmd, commandName, args, q, isGroup,
  sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner,
  groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    if (!isOwner) {
      return await reply("*Only Owner 🚫*");
    }
    if (config.ANTI_BOT == q) {
      return reply("already on");
    }
    await input_set("ANTI_BOT", q);
    return reply("*ANTI_BOT turned " + q + "*");
  } catch (error) {
    reply("*Error !!*");
    l(error);
  }
});

const commandautonewssender = {
  pattern: "autonewssender",
  dontAddCommandList: true,
  filename: __filename
};

cmd(commandautonewssender, async (command, body, extra, {
  from, quoted, bodyText, isCmd, commandName, args, q, isGroup,
  sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner,
  groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    if (!isOwner) {
      return await reply("*Only Owner 🚫*");
    }
    if (config.AUTO_NEWS_SENDER == q) {
      return reply("already on");
    }
    await input_set("AUTO_NEWS_SENDER", q);
    return reply("*AUTO_NEWS_SENDER turned " + q + "*");
  } catch (error) {
    reply("*Error !!*");
    l(error);
  }
});
const commandautotlktoksender = {
  pattern: "autotlktoksender",
  dontAddCommandList: true,
  filename: __filename
};

cmd(commandautotlktoksender, async (command, body, extra, {
  from, quoted, bodyText, isCmd, commandName, args, q, isGroup,
  sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner,
  groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    if (!isOwner) {
      return await reply("*Only Owner 🚫*");
    }
    if (config.AUTO_TIKTOK_SENDER == q) {
      return reply("already on");
    }
    await input_set("AUTO_TIKTOK_SENDER", q);
    return reply("*AUTO_TIKTOK_SENDER turned " + q + "*");
  } catch (error) {
    reply("*Error !!*");
    l(error);
  }
});
