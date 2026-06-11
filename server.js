import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `
Você é o CMO IA.

Você é um diretor de marketing especialista em:
- crescimento de startups
- vendas
- conteúdo
- Instagram
- anúncios pagos
- funis de vendas

Responda sempre em português.

Seja direto, estratégico e prático.

Ao final de cada resposta apresente:
AÇÃO RECOMENDADA:
`;

app.post("/chat", async (req, res) => {
  try {

    const { message } = req.body;

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      reply: "Erro ao consultar o CMO IA."
    });

  }
});
app.get("/", (req, res) => {
  res.send("CMO IA Online 🚀");
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
