import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedStep } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize safely, though in a real app we'd handle the missing key UI better.
// For this demo, we assume the environment is set up correctly as per instructions.
const ai = new GoogleGenAI({ apiKey });

export const generateTestSteps = async (userIntent: string): Promise<GeneratedStep[]> => {
  if (!apiKey) {
    console.error("API Key is missing");
    return [
      { action: "Error", target: "System", reason: "API Key missing in environment." }
    ];
  }

  try {
    const model = "gemini-2.5-flash"; 
    const systemInstruction = `
      You are an advanced AI Agent for a UI Test Automation framework. 
      Your job is to translate a high-level user testing intent into a sequence of low-level UI actions.
      The underlying technology uses a custom WebDriverAgent wrapper.
      
      Output a list of steps. Each step has:
      - action: e.g., Click, Input, Assert, Scroll, Wait
      - target: the element name or locator description
      - reason: brief explanation of why this step is needed based on the intent.
      
      Keep it technical but concise.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: userIntent,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              action: { type: Type.STRING },
              target: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ["action", "target", "reason"]
          }
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) return [];
    
    return JSON.parse(jsonStr) as GeneratedStep[];
  } catch (error) {
    console.error("Gemini generation error:", error);
    return [
      { action: "Error", target: "Gemini API", reason: "Failed to generate steps." }
    ];
  }
};