import { ChatGPTAPIBrowser } from 'chatgpt'
import express, { response } from 'express'
const app = express()
app.use(express.json())

import say from 'say'
import * as dotenv from 'dotenv'
dotenv.config()

// Add your OpenAI ChatGPT credentials into the .env file
const api = new ChatGPTAPIBrowser({
  email: process.env.OPENAI_EMAIL,
  password: process.env.OPENAI_PASSWORD,
})
await api.initSession()

let data

app.get('/api/reinit', async (req, res) => {
  try {
    await api.initSession()
    console.log('\n Restarting.....')
    console.log('Continuing conversation...')
    res.json({status:'ok'})
  } catch (err) {
    console.error(err)
    res.status(500).send('Error Reinitializing')
  }
})

app.get('/api/reset', (req, res) => {
  data = undefined
  console.log('\n Resetting.....')
  res.json({status:'ok'})
})

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body
    console.log('\nQuestion: \n' + message)

    data = await api.sendMessage(
      message,
      data
        ? { conversationId: data.conversationId,
            parentMessageId: data.messageId } : {}
    )
    console.log('\nAnswer: \n' + data.response)
    say.speak(data.response)
    res.json(data)
   // say.speak('Is there anything else you would like to ask?')
  } catch (err) {
    console.error(err)
    res.status(500).send('Error sending / receiving message')
  }
})

app.listen(process.env.PORT, process.env.HOST, () =>
  console.log('Server running on port ' + process.env.PORT)
)




// automatically pick platform

 
// or, override the platform
// const Say = require('say').Say
// const say = new Say('darwin' || 'win32' || 'linux')
 
// Use default system voice and speed
 
// Stop the text currently being spoken
