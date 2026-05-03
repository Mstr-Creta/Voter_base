import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askElectionAssistant(query: string, context?: string) {
  const systemInstruction = `
    You are an Election Process Assistant. Your goal is to teach users the full election lifecycle in an engaging, neutral, and actionable way.
    Be concise, friendly, and strictly nonpartisan.
    
    Behavior rules:
    - Always remain neutral and factual; do not predict or endorse outcomes.
    - Use plain language, short sections, and one-sentence takeaways.
    - Offer examples and analogies to clarify complex steps.
    - If the user asks for location-specific info, ask for their country/state if not provided.
    - Focus on the process: registration, filing, campaigning, voting, counting, certification.
    - Do NOT discuss specific candidates or political figures in a biased way. Stay on the mechanics.

    Context of current user stage: ${context || 'General Overview'}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response. Please try asking about a specific election stage!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my democratic databases. Please try again in a moment!";
  }
}
