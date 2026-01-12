
import { GoogleGenAI } from "@google/genai";

export class GeminiStylistService {
  async tryOnOutfit(base64Image: string, outfitPrompt: string): Promise<string | null> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Image,
                mimeType: 'image/jpeg',
              },
            },
            {
              text: `URGENT AI VIRTUAL TRY-ON TASK: 
              Replace the person's current clothing in the provided photo with this specific outfit: ${outfitPrompt}.
              
              CRITICAL REQUIREMENTS:
              1. Keep the person's FACE, HAIR, and BODY POSE EXACTLY as they are in the original photo.
              2. Keep the BACKGROUND exactly as it is.
              3. COMPLETELY REMOVE any visible original clothing and replace it with the new outfit specified.
              4. Ensure the new clothes wrap naturally around the person's body parts (shoulders, arms, torso, legs).
              5. Maintain high photorealism, matching the lighting and shadows of the original scene.
              6. The output must be a single image showing the result.`,
            },
          ],
        },
      });

      if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
          }
        }
      }
      return null;
    } catch (error) {
      console.error("Gemini Try-On Error:", error);
      return null;
    }
  }
}

export const geminiService = new GeminiStylistService();
