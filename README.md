# ChatGPT Star Trek Computer Mod

Simple Express server to handle the voice interface and connection with ChatGPT. Uses [ChatGPT-Official](https://github.com/PawanOsman/ChatGPT-Official) and [say.js](https://github.com/Marak/say.js) in the background.

## Set Up

1. Install npm packages:

        `npm install && cd front-end && npm install`
2. Copy `.env.example` to `.env`
3. Enter OpenAI API key from [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) into `.env`

## Running

1. Run with `npm start` from the root directory.

2. In seperate terminal, run `npm start` from the front-end directory.

3. In chromium browser, open the front-end with `http://localhost:5173/`

4. Enable mictophone and talk to ChatGPT


## Issues

Say.js is missing the first second of a sentence and takes a long time to process it
