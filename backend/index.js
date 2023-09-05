import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 8080;
app.use(bodyParser.json()); //get input from the request body
app.use(cors()); //free flow communication between frontend and backend

const configuration = new Configuration({
  organization: "org-Ddnw43Lfm9ZNRS3nmTfWbpUX",
  apiKey: "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",
});

delete configuration.baseOptions.headers["User-Agent"];

const openai = new OpenAIApi(configuration);

//creating base end points
app.post("/", async (request, response) => {
  const { chats } = request.body; //

  const result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "you are Chatgpt",
      },
      ...chats,
    ],
  });

  response.json({
    output: result.data.choices[0].message,
  });
});

app.listen(port, () => {
  console.log(`getting the url ${port}`);
});
