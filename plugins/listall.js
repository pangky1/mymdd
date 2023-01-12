let fs = require('fs')
let handler = async (m, {conn, text}) => {
    let json = JSON.parse(fs.readFileSync('../db/storage.json'))
    let row = []
for (let i of json) {
    row.push({
        title: `${i.nama}`,
        description: `Nama : ${i.nama}\nDi Upload Oleh : ${i.dari}`,
        rowid: '/get ' + i.gambar
    })
    let button = {
        buttonText: 'List Image/Video'
        description: 'Berikut daftar Image/Video yang di simpan oleh orang orang'
        footerText: wm
    }
    return conn.sendListM(m.chat, button, row, m)
}
handler.command = /^(tes)$/i

module.exports = handler