let { 
    youtubedl,
    youtubedlv2 
} = require('@bochilteam/scraper')

let handler = async (m, { conn, args, isPrems, isOwner }) => {

let qu = args[1] || '480'
  let q = qu + 'p'
  let v = args[0]

  let _thumb = {}
    try { _thumb = { jpegThumbnail: thumb2 } }
    catch (e) { }

// Kocak
if (!v) throw '「 ❗ 」\nUrl nya mana ?'
const yt = await youtubedl(v).catch(async () => await  youtubedlv2(v))
const dl_url = await yt.video[q].download()
  const ttl = await yt.title
const size = await yt.video[q].fileSizeH
  
 await m.reply(`» Title : ${ttl}
» Size : ${size}

「 ❗ 」\nSedang mengirimkan File`)
/* await conn.sendMessage(m.chat, { [/^(?:-|--)doc$/i.test(args[1]) || null ? 'document' : 'video']: { url: dl_url }, fileName: `${me}.mp4`, mimetype: 'video/mp4', ..._thumb }, { quoted: m })
  await conn.sendMessage(m.chat, { document: { url: dl_url }, mimetype: 'audio/mpeg', fileName: `${ttl}.mp3`}, {quoted: m})
  */
  conn.sendFile(m.chat, dl_url, 'mp4', null, m)

}


handler.help = ['ytv / ytmp4 <url>']
handler.tags = ['downloader']
handler.command = /^(ytv|ytmp4)$/i
handler.register = true
handler.limit = true

module.exports = handler