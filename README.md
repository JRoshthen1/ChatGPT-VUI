# ChatGPT Star Trek Computer Mod

Simple Express server to handle the voice interface and connection with ChatGPT. Uses [chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api) and [say.js](https://github.com/Marak/say.js) in the background.

## Set Up

1. Install npm packages: `npm install`
2. Copy `.env.example` to `.env`
3. Enter OpenAI credentials into `.env`

## Running

In the background, [chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api) is being used to interact with ChatGPT, which uses `puppeteer` to spawn a browser window. Meaning, a non-headless server that can display a browser window is required to run this. Alternative I found to solve this problem would be [chatgpt-io](https://github.com/PawanOsman/chatgpt-io), but requires a different license from OpenAI.

1. Run with `npm start`
2. Browser window opens, solve the reCAPTCHA
3. Done. Server is serving on `localhost:3000`. Endpoints:
    * `POST /api/chat`, accepts JSON data containing message to send to ChatGPT: `{"message": "Hello world"}`. Subsequent requests are followed-up by default.
    `curl -X POST https://localhost:3000/api/chat -H 'Content-Type: application/json' -d '{"message":"Explain relativity"}'`

    * `GET /api/reinit` to reauthenticate with OpenAI.
    * `GET /api/reset` to start a new conversation.

## Issues

If `puppeteer` throws an error stating it can't find `chrome-stable` or whichever equivalent binary for your system, you might need to edit `node_modules/chatgpt/build/index.js`, around line 1060. Search for the path and point it accordingly to where your Chrome is located at.

