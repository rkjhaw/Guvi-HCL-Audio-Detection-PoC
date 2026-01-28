
import { GoogleGenAI, Type } from "@google/genai";
import { DetectionResult, Classification } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeVoice(base64Audio: string): Promise<DetectionResult> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType: 'audio/mp3',
              data: base64Audio,
            },
          },
          {
            text: `Act as a specialized forensic audio engineer for the Guvi HCL Hackathon. 
            Analyze this voice sample to determine if it is AI-GENERATED or spoken by a real HUMAN.
            Focus on linguistic nuances, breathing patterns, background noise consistency, and robotic frequency artifacts.
            Supported languages are: Tamil, English, Hindi, Malayalam, Telugu.
            
            Provide the output in JSON format with:
            1. classification (AI_GENERATED or HUMAN)
            2. confidence (0.0 to 1.0)
            3. explanation (Deep analysis of why this was chosen)
            4. language (Detected language)
            5. metadata (detectedArtifacts, sampleRate, bitDepth)`
          }
        ],
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          classification: { type: Type.STRING, description: "Must be AI_GENERATED or HUMAN" },
          confidence: { type: Type.NUMBER },
          explanation: { type: Type.STRING },
          language: { type: Type.STRING },
          metadata: {
            type: Type.OBJECT,
            properties: {
              detectedArtifacts: { type: Type.ARRAY, items: { type: Type.STRING } },
              sampleRate: { type: Type.STRING },
              bitDepth: { type: Type.STRING }
            }
          }
        },
        required: ["classification", "confidence", "explanation", "language"]
      }
    }
  });

  try {
    const result = JSON.parse(response.text);
    return result as DetectionResult;
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    throw new Error("Analysis engine failed to produce valid JSON output.");
  }
}
