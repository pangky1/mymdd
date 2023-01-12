let fs = require('fs')
let uploadImage = require('../lib/uploadImage.js')
let handler = async (m, {conn, text}) => {
    if (!text) throw `Masukkan Juuduul`
	const json = JSON.parse(fs.readFileSync('db/storage.json'))
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || ''
	if (!mime) throw `Reply Gambar Nya`
		let media = await q.download()
	let url = await uploadImage(media)
	let nama = conn.getName(m.sender)

	json.push({nama: text, gambar: url, dari: nama})
	fs.writeFileSync('db/storage.json', JSON.stringify(json))
	m.reply('sukses!')
}
handler.command = /^(addimg)$/i

module.exports = handler