let { 
    youtubedl,
    youtubedlv2 
} = require('@bochilteam/scraper')

let handler = async (m, { conn, args, isPrems, isOwner }) => {


  let q = '128kbps'
  let v = args[0]


// Kocak
if (!v) throw '「 ❗ 」\nUrl nya mana ?'
const yt = await youtubedl(v).catch(async () => await  youtubedlv2(v))
const dl_url = await yt.audio[q].download()
  const ttl = await yt.title
const size = await yt.audio[q].fileSizeH
  
 await m.reply(`» Title : ${ttl}
» Ukuran : ${size}

「 ❗ 」\nSedang mengirimkan File`)
await conn.sendMessage(m.chat, { document: { url: dl_url }, mimetype: 'audio/mpeg', fileName: ttl + '.mp3'}, {quoted: m})
  // await conn.sendFile(m.chat, dl_url, ttl + '.mp3', me, m, null, {
    // asDocument: false
  // }
  // )
}


handler.help = ['yta / ytmp3 <url>']
handler.tags = ['downloader']
handler.command = /^(yta|ytmp3)$/i

handler.exp = 0
handler.register = true
handler.limit = true

module.exports = handler