import express from "express";
import OpenAI from "openai";

const app = express();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", async (req, res) => {
  try {

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: "Responda apenas: CMO IA ONLINE"
    });

    res.send(response.output_text);

  } catch (err) {

    console.error(err);

    res.status(500).send("ERRO OPENAI");

  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
