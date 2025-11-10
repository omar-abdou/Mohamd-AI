import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is not defined in environment variables");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// تم تحديث اسم النموذج إلى إصدار غير مهمل.
const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  // أصبحت الإعدادات والسجل الآن جزءًا من دالة الإنشاء.
  config: {
    systemInstruction: SYSTEM_INSTRUCTION,
    maxOutputTokens: 1000,
  },
  history: [],
});

export const chatSession = chat;
