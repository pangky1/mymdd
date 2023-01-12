const fs = require('fs')
let uploadImage = require('../lib/uploadImage.js')
let handler = async (m, {conn, text, command, usedPrefix}) => {
    let json = JSON.parse(fs.readFileSync('./db/storage.json'))
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `kirim foto/video yang ingin di simpan ke dalam server dengan mengetik ${usedPrefix}${command} atau reply medianya`
        const media = await q.download()
    const url = await uploadImage(media)
    if (text in json) throw `'${text}' telah terdaftar!`
    json.push({title: text, url: url})
    fs.writeFileSync('db/storage.json', JSON.stringify(json))
    m.reply(`Succes Menambahkan Foto Dengan Nama : ${text}`)
}
handler.help = ['addbackup']
handler.command = /^(backup|addbackup)$/i

module.exports = handler