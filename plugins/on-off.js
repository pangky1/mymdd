let handler = async (m, {conn, text, command, usedPrefix, args, isOwner, isAdmin,usROwner}) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(command)
  let chat = db.data.chats[m.chat]
  let user = db.data.users[m.sender]
  let setting = db.data.settings[conn.user.jid]
  let set = db.data.settings[conn.user.jid]
  let type = (args[0] || '').toLowerCase()
  let isAll = false
  let isUser = false
    switch(type) {
    case 'ai':
        if (m.isGroup) {
            if (!(m.isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
            }
        }
        chat.chatbot = isEnable
        break
    default:
        if (!/[0]/.test(command)) throw `daftar opsi\n${usedPrefix}aktif ai`.trim()
            throw false
    }
    m.reply(`
*${type}* berhasil di *${isEnable ? 'nyala' : 'mati'}kan* ${isAll ? 'untuk bot ini' : isUser ? '' : 'untuk chat ini'}
`.trim())
}
handler.help = ['aktif'].map(v => v + ' <opsi>')
handler.tags = ['group', 'owner']
handler.command = /^(aktif)$/i

module.exports = handler