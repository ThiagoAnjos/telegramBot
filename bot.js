const env = require('./.env')
const { Telegraf, Markup } = require('telegraf')


//iniciando o bot
const bot = new Telegraf(env.token)

let list = []

let buttons = () => Markup.inlineKeyboard(
    Markup.button.url(
        list.map(item => Markup.callbackButton(item, `delete ${item}`)),
        {columns: 3}
    )
)

bot.start(async content => {
    const name = content.update.message.from.first_name
    await content.reply(`Seja bem-vindo, ${name}!`)
    await content.reply(`Digite os produtos que deseja adicionar ao carrinho`)
})

bot.on('text', content => {
    list.push(content.update.message.text)
    content.reply(`${content.update.message.text} Produto adicionado`, buttons())
})

bot.action(/delete (.+)/, content=>{
    list = list.filter(item => item !== content.match[1])
    content.reply(`${content.match[1]} deletado`,buttons())
})

bot.startPolling()