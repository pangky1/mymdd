let axios = require("axios")

let cheerio = require('cheerio')

let handler = async (m, {conn, text, args}) => {
    let urut = text.split`|`

  let text0 = urut[0]

  let text1 = urut[1]
  if (!text0) throw `Penggunaan Salah! contoh /jarak jawa tengah|jawa barat`
  if (!text1) throw `Penggunaan Salah! contoh /jarak jawa tengah|jawa barat`
return await jarak(text0, text1)

async function jarak(dari, ke) {

  let url = `https://www.google.com/search?q=${encodeURIComponent("jarak " + dari + " ke " + ke)}&hl=id`

  let { data } = await axios(url)

  let $ = cheerio.load(data)

  let img = data.split("var s=\'")[1].split("\'")[0]

  let res = {

   result: {

    img: /^data:.*?\/.*?;base64,/i.test(img) ? Buffer.from(img.split`,`[1], 'base64') : '',

    desc: $("div.BNeawe.deIvCb.AP7Wnd").text()

    }

  }

  return conn.sendMedia(m.chat, res.result.img, m, {caption: sukses})
}
}
handler.tags = ['premium']
handler.help = ['jarak <kota 1|kota 2>']
handler.command = /^(jarak)$/i
handler.premium = true

module.exports = handler
