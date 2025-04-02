import { API_KEY } from "./config.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
export const state = {
  AIPrompt: "",
  userPrompt: "",
  joke: {},
};
export const geminiAI = async function (sysPrompt, userPrompt = "") {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent({
      contents: [{ parts: [{ text: sysPrompt + userPrompt }] }],
      generationConfig: { temperature: 1.2, topP: 0.95 },
    });
    return result.response.text();
  } catch (err) {
    throw err;
  }
};
export const createJokeObject = function (response) {
  return {
    chatbot: response.replica1,
    user: response.replica2,
    funny: response.amuzament,
    twist: response.intorsatura,
    easyToCatch: response.usor_de_inteles,
    relatable: response.relatabil,
    clever: response.inteligent,
    offensive: response.potential_ofensator,
    feedback: response.feedback,
    improvements: response.imbunatatiri,
    date: new Date(),
  };
};
