const { Configuration, OpenAIApi } = require("openai");

let handler = async (m, {conn, text}) => {

const configuration = new Configuration({

  apiKey: aikey,

});

const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({

  model: "text-davinci-003",

  prompt: text,

  max_tokens: 2048,

});

m.reply(response.data.choices[0].text);

}
handler.help = ['ai <pertanyaan>']
handler.tags = ['premium']
handler.command = /^(ai)$/i

handler.limit = true

handler.premium = true

module.exports = handler

