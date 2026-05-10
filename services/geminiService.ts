import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { TechType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// モデルは基本のタスクに適したFlashを使用
const MODEL_NAME = 'gemini-3-flash-preview';

export const getLessonExplanation = async (tech: TechType, topic: string): Promise<string> => {
  try {
    const prompt = `
      あなたは親切でフレンドリーなプログラミングの先生です。
      プログラミング完全初心者に向けて、以下のトピックについて150文字以内で優しく解説してください。
      専門用語はなるべく避け、例え話などを使ってわかりやすく説明してください。
      
      技術: ${tech}
      トピック: ${topic}
      
      レスポンスはMarkdown形式で返してください。
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text || "ごめんなさい、今の説明がうまく読み込めませんでした。もう一度試してみてね！";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI先生がちょっと休憩中です。後でもう一度呼んでね。";
  }
};

export const checkCodeWithAI = async (
  task: string,
  code: string,
  tech: TechType
): Promise<{ passed: boolean; feedback: string }> => {
  try {
    const prompt = `
      あなたは初心者を励ますプログラミングの先生です。
      生徒が以下の課題に取り組み、コードを書きました。
      コードが課題の要件を満たしているか判定し、優しくフィードバックをしてください。

      【課題】
      ${task}

      【技術】
      ${tech}

      【生徒のコード】
      ${code}

      レスポンスは以下のJSON形式のみで返してください。余計な説明は不要です。
      {
        "passed": boolean, // 課題をクリアしているか
        "feedback": string // 褒める言葉、または修正のアドバイス（日本語で、フレンドリーに）
      }
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response text");

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      passed: false,
      feedback: "採点中にエラーが起きちゃったみたい。コードは合ってるかな？もう一度確認してみてね！"
    };
  }
};

export const askTutor = async (question: string, contextCode: string): Promise<string> => {
   try {
    const prompt = `
      あなたは「WebKiso」という学習サイトのフレンドリーなAIキャラクターです。
      生徒からの質問に答えてください。
      
      【生徒のコード状況】
      ${contextCode}

      【生徒の質問】
      ${question}

      短く、励ますような口調で、ヒントを与えてください。答えをそのまま教えるのではなく、気づきを与えてください。
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text || "うんうん、それは難しいところだよね。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "ごめんね、ちょっと声が届かなかったみたい。もう一回聞いてみて！";
  }
}
