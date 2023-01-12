const { youtubeSearch } = require('yt-search')
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Contoh penggunaan:\n\n${usedPrefix}${command} Minecraft`
  let res = await youtubeSearch(text)
  if (!res.status) throw 'Video/Audio Tidak ditemukan'
  let vid = res.result.video[0]
  let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
  const url = 'https://www.youtube.com/watch?v=' + videoId
  await conn.sendButton(m.chat, `
*${title}* (${url})\n
${description}
Diupload ${publishedTime}
Durasi: ${durationH}
${viewH} x ditonton
`.trim(), author, thumbnail + '.png', [
    ['Audio', `${usedPrefix}yta ${url} yes`],
    ['Video', `${usedPrefix}ytv ${url} yes`]
    ], m)
}
handler.help = ['play', 'play2'].map(v => v + ' <pencarian>')
handler.tags = ['downloader']
handler.command = /^play2?$/i

handler.exp = 0
handler.limit = false

module.exports = handler