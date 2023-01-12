let golek = require('node-fetch')
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `contoh:\n ${usedPrefix}${command} https://www.tiktok.com/@omagadsus/video/7025456384175017243`
let res = await fetch(`https://developers.tiklydown.me/api/download?url=${args[0]}`)
let hi = await res.json()
let json = hi.video
await conn.sendButtonVid(m.chat, json.noWatermark, sukses, wm, 'menu', '/menu', m)
}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(tik(tok)?(dl)?)$/i

handler.limit = 1

module.exports = handler