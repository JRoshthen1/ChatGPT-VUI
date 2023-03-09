import express, { response } from 'express'
import ChatGPT from "chatgpt-official";
const app = express()
import cors from 'cors'
app.use(express.json())
app.use(cors())

import say from 'say'
import * as dotenv from 'dotenv'
dotenv.config()

// Add your OpenAI ChatGPT credentials into the .env file

let bot = new ChatGPT(process.env.API_KEY);



app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body
    console.log('\nQuestion: \n' + message)

    let data = await bot.ask(
      message
    )
    console.log('\nAnswer: \n' + data)
    say.speak(data)
    res.json(data)
   // say.speak('Is there anything else you would like to ask?')
  } catch (err) {
    console.error(err)
    res.status(500).send('Error sending / receiving message')
  }
})

app.listen(process.env.PORT, process.env.HOST, () =>
  console.log("Server running on port " + process.env.PORT)
);


// automatically pick platform with say
// or, override the platform
// const Say = require('say').Say
// const say = new Say('darwin' || 'win32' || 'linux')
 
// Use default system voice and speed
 
// Stop the text currently being spoken
