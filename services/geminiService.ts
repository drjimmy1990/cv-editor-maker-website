import { GoogleGenAI, Type } from "@google/genai";
import { ComparisonResult } from "../types";

// Initialize Gemini
// Note: In a real app, strict error handling for missing API KEY should be present.
// We assume process.env.API_KEY is available as per instructions.
const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) || 'mock-key-for-demo'; 
const ai = new GoogleGenAI({ apiKey });

/**
 * Chat with CV Optimizer (Gemini 2.5 Flash for speed/cost)
 */
export const sendCvChatMessage = async (history: {role: string, parts: {text: string}[]}[], newMessage: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: "You are an expert ATS (Applicant Tracking System) optimizer and Career Coach. You are reviewing a user's CV. Provide constructive, brief, and actionable feedback. Do not write full cover letters unless asked.",
      },
      history: history
    });

    const response = await chat.sendMessage({ message: newMessage });
    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Error connecting to AI service. Please check your connection.";
  }
};

/**
 * Compare Businesses (Gemini 2.5 Flash with JSON Schema)
 */
export const compareBusinesses = async (linkA: string, linkB: string): Promise<ComparisonResult> => {
  try {
    const prompt = `Compare these two business entities based on their online presence (simulated for this demo based on URL structure): 
    Entity A: ${linkA}
    Entity B: ${linkB}
    
    Provide a simulated competitive analysis assuming standard industry metrics.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            winner: { type: Type.STRING },
            ratingGap: { type: Type.NUMBER, description: "Difference in star rating (0-5)" },
            sentimentSummary: { type: Type.STRING },
            recommendation: { type: Type.STRING }
          },
          required: ["winner", "ratingGap", "sentimentSummary", "recommendation"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("Empty response");
    
    return JSON.parse(jsonText) as ComparisonResult;
  } catch (error) {
    console.error("Gemini Comparison Error:", error);
    // Fallback mock for demo if API key fails
    return {
      winner: linkA.includes('google') ? 'Entity A' : 'Entity B',
      ratingGap: 0.8,
      sentimentSummary: "Entity A shows stronger customer loyalty signals in recent reviews.",
      recommendation: "Focus on improving response time to negative reviews to close the gap."
    };
  }
};