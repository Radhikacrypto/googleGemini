

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = 'AIzaSyCrG1g6tQn-sceUqnMoSM7MOmLcyAOmp6g';
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
  const maxRetries = 5;
  let retryCount = 0;
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  while (retryCount < maxRetries) {
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(prompt);
      console.log(result.response.text);
      return result.response.text;

    } catch (error) {
      if (error.response && error.response.status === 429) {
        retryCount++;
        const backoffTime = Math.pow(2, retryCount) * 1000; // Exponential backoff
        console.warn(`Rate limit exceeded. Retrying in ${backoffTime / 1000} seconds...`);
        await delay(backoffTime);
      } else {
        console.error('Error:', error);
        throw error; // Throw error if it's not a 429
      }
    }
  }
  throw new Error('Max retries reached. Please try again later.');
}

export default run