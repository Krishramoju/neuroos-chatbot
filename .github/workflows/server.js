require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const PORT = 3000;

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

app.post('/api/message', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: userMessage }]
    });

    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Cortex failed to understand. Please retry." });
  }
});

app.listen(PORT, () => {
  console.log(`🧠 NeuroOS Chatbot running at http://localhost:${PORT}`);
});
