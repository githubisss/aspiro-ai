import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyAp9YVwkmCD86S3fmzoIQtIAIJ39mtcWIg"
});
console.log("Gemini API Key:", import.meta.env.VITE_GEMINI_API_KEY);
export const geminiService = {
  async generateRoadmap(userData: any) {
    const prompt = `Generate a personalized career roadmap for a student with the following details:
      Degree: ${userData.degree}
      Branch: ${userData.branch}
      Year: ${userData.year}
      Goal: ${userData.goal}
      
      Return a JSON object with:
      - subjects: Array of { name: string, description: string, skills: string[], projects: string[] }
      - placementReadiness: number (0-100)
      - dailyRecommendation: string
      - weakAreas: string[]`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subjects: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                  projects: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
              }
            },
            placementReadiness: { type: Type.NUMBER },
            dailyRecommendation: { type: Type.STRING },
            weakAreas: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    return JSON.parse(response.text || "{}");
  },

  async getTutorResponse(subject: string, concept: string, mode: 'simple' | 'interview') {
    const prompt = `Explain the concept "${concept}" in the context of "${subject}". 
      Mode: ${mode === 'simple' ? 'Explain it to a 10 year old with analogies' : 'Explain it at a professional interview level with technical depth and common questions'}.
      Include a simple ASCII or text-based diagram if possible.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text;
  },

  async analyzeInterview(transcript: string, mode: string) {
    const prompt = `Analyze this interview transcript for a ${mode} interview:
      "${transcript}"
      
      Provide feedback in JSON:
      - score: number (0-100)
      - technicalAccuracy: number (0-100)
      - confidence: number (0-100)
      - fillerWords: string[]
      - suggestions: string[]
      - improvedAnswer: string`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            technicalAccuracy: { type: Type.NUMBER },
            confidence: { type: Type.NUMBER },
            fillerWords: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            improvedAnswer: { type: Type.STRING }
          }
        }
      }
    });

    return JSON.parse(response.text || "{}");
  }
};
