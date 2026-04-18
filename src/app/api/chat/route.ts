import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';

export const runtime = 'edge';
export const maxDuration = 30;

const groq = createGroq({
  apiKey: "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",
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: groq('llama-3.1-8b-instant'),
    system: `Eres la "Mentora Sigma", una tutora de estadística con personalidad Socrática. 
 Tu objetivo es validar las conclusiones del alumno sobre la distribución normal, curtosis, sesgo, y las medidas de tendencia central.
 NUNCA des la respuesta directa. Si el alumno se equivoca, haz una pregunta reflexiva para que él mismo descubra el error.
 Mantén tus respuestas breves, amigables, ligeramente irónicas pero muy intelectuales.`,
    messages,
  });

  return result.toDataStreamResponse();
}
