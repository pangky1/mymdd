let fs = require('fs')
// process.env.TZ = 'Asia/Jakarta'
let moment = require('moment-timezone')
let path = require('path')
let levelling = require('../lib/levelling')
let tags = {
    'main': 'UTAMA',
    'game': 'GAME',
    'bca': 'BCA MENU',
    'gt': 'GROWTOPIA MENU',
    'nsfw': 'NSFW 18+',
    'rpg': 'RPG GAME',
    'xp': 'EXP & LIMIT',
    'sticker': 'STICKER',
    'asupan': 'ASUPAN',
    'kerang': 'KERANG AJAIB',
    'quotes': 'QUOTES',
    'group': 'GROUP',
    'premium': 'PREMIUM',
    'internet': 'INTERNET',
    'anonymous': 'ANONYMOUS CHAT',
    'nulis': 'MAGER NULIS & LOGO',
    'downloader': 'DOWNLOADER',
    'tools': 'TOOLS',
    'fun': 'FUN',
    'database': 'DATABASE',
    'vote': 'VOTING',
    'absen': 'ABSEN',
    'quran': 'AL QUR\'AN',
    'audio': 'PENGUBAH SUARA',
    'jadibot': 'JADI BOT',
    'info': 'INFO',
    '': 'TANPA KATEGORI',
}
const defaultMenu = {
  before: `
*✧───··[ NdaaBotz-MD ]··────✧*  

*👤 I N F O - U S E R*
» Limit : *%limit Limit*
» Role : *%role*
» Level : *%level [%exp / %maxexp]* 
» Kurang *%xp4levelup* lagi untuk levelup
» Exp : %totalexp Xp

*🗓 ️K A L E N D E R*
» Tanggal: %date
» Tgl Islam: *%dateIslamic*
» Waktu: *%time*

*🤖 B O T - I N F O*
» Bot Name : *NdaaBotz-MD*
» Mode: Public
» Platform: *Pterodactyl*
» Type: *Nodejs*
» Baileys: *Multi Device*
» Prefix: *[ Multi ]*
» Aktif Selama: *%uptime*
» Database: %rtotalreg of %totalreg

*📱 S O S I A L - M E D I A*
» Discord: coming soon!
» Email: NdaaBotz4u@gmail.com
» Github: 
  https://github.com/NdaaaXyz
» Instagram: @ndaabotz

%readmore`.trimStart(),
  header: '*〤 %category*',
  body: '» *%cmd* %islimit %isPremium',
  footer: '\n',
  after: `
*NdaaBotz-MD@^%version*
${'```%npmdesc```'}
`,
}
let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '🄻' : '')
                .replace(/%isPremium/g, menu.premium ? '🄿' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    //conn.send2Button(m.chat, text.trim(), wm, 'Sewa Bot', '.sewabot', 'Apikey', '.apikey', fkontak)
 //   conn.reply(m.chat, text.trim(), m)
//let wm = set.wm
let linkgc = 'https://chat.whatsapp.com/GdO4OEZ9L09KGXEGXzIKAI'
let buttonMessage= {
'document':{'url': linkgc},
'mimetype':global.doc,
'fileName': `Hai, ${name}! 👋`,
'fileLength':10,
'pageCount':10,
'contextInfo':{
'forwardingScore':555,
'isForwarded':false,
'externalAdReply':{
'mediaUrl': 'https://youtu.be/C75W0Qemdjg',
'mediaType':2,
'previewType':'pdf',
'title': wm,
'body': wm,
'thumbnail':await(await fetch(fto)).buffer(),
'sourceUrl': linkgc}},
'caption': text.trim() + '\n',
'footer': wm,
'buttons':[
{'buttonId':`!profile`,'buttonText':{'displayText':'Profile 👤'},'type':1},
{'buttonId':`!owner`,'buttonText':{'displayText':'Owner ⚜️'},'type':2}
],
'headerType':6}
    await conn.sendMessage(m.chat,buttonMessage, { quoted:m})
        
    //conn.reply(m.chat, 'Promosikan Bot Ini, Bisa Download Vt Yt,Tiktok dll loh', m)
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
// handler.help = ['menu', 'help', '?']
// handler.tags = ['main']
handler.command = /^(menu2)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.register = true
handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}