let handler = async (m, { conn }) => {
	
	// Link Script jgn di ganti ya pliss
    // Kalo mau masukin github kamu tinggal add aja link githubnya tapi jangan di hapus sumber script!
    // Jangan Ngeyell..
    // Kalo ngeyel gk bakal gw up sc lgi.
    
    let txt = `
Bot ini menggunakan base dari github

https://github.com/FokusDotId/Family-MD.git

*Note!:* Sc Bot ini di jual!, sudah saya fix semua fitur dan pastinya no eror!\nJika ingin membeli sc ini silahkan chat saja wa.me/6285640575421\n\nHarga Mulai 45K saja!

`
     conn.reply(m.chat, txt, m)
}
handler.help = ['sourcecode']
handler.tags = ['info']
handler.command = /^(sc(ript(bot)?)?|sourcecode)$/i

module.exports = handler


