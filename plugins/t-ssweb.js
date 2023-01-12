const handler = async (m, {conn, text, usedPrefix:p}) => {
   if (!text) throw `Penggunaan Salah!\nContoh : ${p}ss https://github.com/github`
   conn.sendButtonImg(m.chat, `https://saipulanuar.ga/api/download/ssweb?url=${text}`, sukses, wm, 'thanks', '/say Ya', m)
}
handler.command = /^(ss|ssweb)$/i

module.exports = handler