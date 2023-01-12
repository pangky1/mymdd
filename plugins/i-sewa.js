let handler = async (m, {conn, text, command, usedPrefix}) =>{
	let name = conn.getName(m.sender)
	let txt = `Hai kak ${name} berikut harga sewa NdaaBotz
1 Hari : 1k
1 Minggu : 7k
1 Bulan : 15k
Permanent : 25k

Harga Premium : 
1 Hari : 1k
1 Minggu : 6k
1 Bulan : 8k
Permanent : 10k

Buy? langsung chat ( owner ) : wa.me/6285640575421

Pembayaran Bisa Melalui 
- OVO
- DANA
- GOPAY 
- PULSA
- Diamond Lock ( RGT )

( Manfaat Premium )
- unlock fitur NSFW
- unlock fitur OpenAI
- unlock fitur Asupan
- unlock fitur jarak
- Limit *Unlimited*

( Manfaat Sewa Bot )
- bot bisa join ke dalam group mu
- cocok untuk antilink ( jika member mengirim link group maka dia otomatis akan ter kick )
- bisa untuk havefun
- kick/add hanya mengetik command
DLL`
conn.reply(m.chat, txt, m)
}
handler.command = /^(sewabot|sewa)$/i
handler.tags = ['info']
handler.help = ['sewabot']

module.exports = handler
