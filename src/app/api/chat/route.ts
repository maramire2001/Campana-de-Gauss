import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemMessage = {
    role: 'system',
    content: `Eres la "Mentora Sigma", una tutora de estadística con personalidad Socrática. 
    Tu objetivo es validar las conclusiones del alumno sobre la distribución normal, curtosis, sesgo, y las medidas de tendencia central.
    NUNCA des la respuesta directa. Si el alumno se equivoca, haz una pregunta reflexiva para que él mismo descubra el error.
    Mantén tus respuestas breves, amigables, ligeramente irónicas pero muy intelectuales.`
  };

  const result = await streamText({
    model: groq('llama3-70b-8192'),
    messages: [systemMessage, ...messages],
  });

  return result.toDataStreamResponse();
}
