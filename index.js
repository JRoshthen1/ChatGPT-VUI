import { ChatGPTAPIBrowser } from 'chatgpt'
import * as dotenv from 'dotenv'
import express, { response } from 'express'
dotenv.config()
import say from 'say'

const api = new ChatGPTAPIBrowser({
  email: process.env.OPENAI_EMAIL,
  password: process.env.OPENAI_PASSWORD,
})
await api.initSession()

const app = express()
app.use(express.json())

let data

app.get('/api/say', async (req, res) => {
  try {
    say.speak("Hello World!")
    res.json({ status: 'ok' })
  } catch (err) {
    console.error(err)
    res.status(500).send('Error reinitializing')
  }
})

app.get('/api/reinit', async (req, res) => {
  try {
    await api.initSession()
    console.log('\n#### REINITIALIZING ####')
    console.log('Continuing conversation...')
    res.json({ status: 'ok' })
  } catch (err) {
    console.error(err)
    res.status(500).send('Error reinitializing')
  }
})

app.get('/api/reset', (req, res) => {
  data = undefined
  console.log('\n#### RESET the connection ####')
  res.json({ status: 'ok' })
})

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body
    console.log('\nQ: ' + message)

    data = await api.sendMessage(
      message,
      data
        ? {
            conversationId: data.conversationId,
            parentMessageId: data.messageId,
          }
        : {}
    )
    console.log('\nA: ' + data.response)
    say.speak(data.response)
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error sending / receiving message')
  }
})

app.listen(process.env.PORT, process.env.HOST, () =>
  console.log('Server listening on port 3000')
)




// automatically pick platform

 
// or, override the platform
// const Say = require('say').Say
// const say = new Say('darwin' || 'win32' || 'linux')
 
// Use default system voice and speed
 
// Stop the text currently being spoken
