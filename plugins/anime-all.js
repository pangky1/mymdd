let handler = async (m, {conn, command, usedPrefix}) => {
 if (command == 'bird') {
    let res = await fetch('https://some-random-api.ml/animal/bird')
    const json = await res.json()
    await conn.sendButtonImg(m.chat, json.image, json.fact, wm, 'Next', `${usedPrefix}${command}`, m)
 }
if (command == 'cat') {
    let res = await fetch('https://some-random-api.ml/animal/cat')
    let json = await res.json()
    await conn.sendButtonImg(m.chat, json.image, json.fact, wm, 'Next', `${usedPrefix}${command}`, m)
}
if (command == 'dog') {
   let res = await fetch('https://some-random-api.ml/animal/dog')
   let json = await res.json()
   await conn.sendButtonImg(m.chat, json.image, json.fact, 'Next', `${usedPrefix}${command}`, m)
}
if (command == 'fox') {
   let res = await fetch('https://some-random-api.ml/animal/fox')
   let json = await res.json()
   await conn.sendButtonImg(m.chat, json.image, json.fact, 'NEXT', `${usedPrefix}${command}`, m)
}
}
handler.command = handler.help = ['cat', 'bird']
handler.tags = ['animal']

module.exports = handler