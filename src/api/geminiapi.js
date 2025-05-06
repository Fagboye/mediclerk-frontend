import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Generative AI client
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const generateQuestions = async (specialty, section, clerking) => {
    const prompt = `
    Given the following clerking information from a ${specialty} case and the specified section "${section}", suggest relevant and specific clinical questions a medical student or doctor should ask. 

    IMPORTANT:
    1. Question should only be about and to improve the ${section}
    2. STRICTLY EXCLUDE questions about information already present in the clerking data. For example:
       - If duration is mentioned, do not ask about duration
       - If character (e.g., dry/wet) is mentioned, do not ask about character
       - If timing is mentioned, do not ask about timing
    3. Focus on gathering NEW information that is not already documented
    4. Try to return as few questions as possible. Only include clinically relevant questions that would add value
    5. Return ONLY a JSON array of strings with no additional formatting, explanation, or markdown. The response should start with [ and end with ]. Example: ["question 1?","question 2?"]

    Clerking Data:
    ${JSON.stringify(clerking, null, 2)}
    `;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean the response by removing markdown code block markers
        text = text.replace(/```json\n?/g, '').replace(/```/g, '').trim();

        try {
            // Try to parse as JSON
            const questions = JSON.parse(text);
            if (!Array.isArray(questions)) {
                throw new Error('Response is not an array');
            }
            return questions;
        } catch (jsonError) {
            // Log the error for debugging
            console.error('Failed to parse AI response:', jsonError);
            // Return null as fallback
            return null;
        }
    } catch (error) {
        console.error("Error generating questions:", error);
        return null;
    }
}