import { describe, expect, test, jest } from "@jest/globals";
import * as chatService from "../chat";
import { TFunction } from "i18next";

// Mock translation function
const mockTranslate = (jest.fn((key: string, options?: Record<string, any>) => {
  const translations: { [key: string]: string } = {
    "quiz.questions.1.question": "Test Question 1",
    "quiz.questions.1.options.0": "Option 1A",
    "quiz.questions.1.options.1": "Option 1B",
    "quiz.questions.1.options.2": "Option 1C",
    "quiz.questions.1.options.3": "Option 1D",
    "quiz.questions.2.question": "Test Question 2",
    "quiz.questions.2.options.0": "Option 2A",
    "quiz.questions.2.options.1": "Option 2B",
    "quiz.questions.2.options.2": "Option 2C",
    "quiz.questions.2.options.3": "Option 2D",
    "quiz.questions.3.question": "Test Question 3",
    "quiz.questions.3.options.0": "Option 3A",
    "quiz.questions.3.options.1": "Option 3B",
    "quiz.questions.3.options.2": "Option 3C",
    "quiz.questions.3.options.3": "Option 3D",
    "quiz.completion.result": "Quiz completed! Your score: {{score}}/{{total}}",
    "chat.greetings": "Hello! How can I help?",
    "chat.responses.question": "Good question!",
    "chat.responses.help": "I can help with that!",
    "quiz.start.prompt": "Would you like to start the quiz?",
  };

  if (options) {
    let text = translations[key] || key;
    Object.entries(options).forEach(([k, v]) => {
      text = text.replace(`{{${k}}}`, String(v));
    });
    return text;
  }

  return translations[key] || key;
}) as unknown) as TFunction;

// Mock the react-i18next hook
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mockTranslate,
    i18n: {
      changeLanguage: jest.fn(),
      language: "en",
    },
  }),
}));

describe("Chat Service", () => {
  beforeEach(() => {
    chatService.resetChat();
    chatService.setTranslateFunction(mockTranslate);
  });

  describe("Message Handling", () => {
    it("should handle regular messages correctly", async () => {
      const response = await chatService.sendMessage("hello");
      expect(response).toMatchObject({
        text: "Hello! How can I help?",
        sender: "bot",
        type: "message",
      });
    });

    it("should handle empty messages", async () => {
      const response = await chatService.sendMessage("   ");
      expect(response.text).toBeTruthy();
      expect(response.sender).toBe("bot");
    });

    it("should maintain chat history", async () => {
      await chatService.sendMessage("hello");
      await chatService.sendMessage("how are you?");
      const history = chatService.getHistory();
      expect(history).toHaveLength(4); // 2 user messages + 2 bot responses
    });
  });

  describe("Quiz Functionality", () => {
    it("should start quiz correctly", async () => {
      const response = await chatService.sendMessage("start quiz");
      expect(response).toMatchObject({
        type: "quiz",
        sender: "bot",
      });
      expect(response.text).toContain("Test Question 1");
      expect(chatService.isQuizActive()).toBe(true);
    });

    it("should handle quiz answers correctly", async () => {
      await chatService.sendMessage("start quiz");
      const response = await chatService.sendMessage("1"); // Answer first question
      expect(response.type).toBe("quiz");
      expect(response.text).toContain("Test Question 2");
    });

    it("should calculate quiz score correctly", async () => {
      await chatService.sendMessage("start quiz");
      await chatService.sendMessage("1"); // Correct
      await chatService.sendMessage("2"); // Correct
      const finalResponse = await chatService.sendMessage("1"); // Correct
      expect(finalResponse.type).toBe("quiz-result");
      expect(finalResponse.text).toContain("3/3"); // Perfect score
    });

    it("should reset quiz state after completion", async () => {
      await chatService.sendMessage("start quiz");
      await chatService.sendMessage("1");
      await chatService.sendMessage("2");
      await chatService.sendMessage("1");
      expect(chatService.isQuizActive()).toBe(false);
    });
  });

  describe("Translation Integration", () => {
    it("should throw error if translation function not set", async () => {
      chatService.resetChat();
      // Explicitly reset the translation function
      chatService.setTranslateFunction(null as any);
      await expect(chatService.sendMessage("hello")).rejects.toThrow(
        "Translation function not set"
      );
    });

    it("should use translations for bot responses", async () => {
      const response = await chatService.sendMessage("help");
      expect(response.text).toBe("I can help with that!");
    });

    it("should translate quiz questions and options", async () => {
      const response = await chatService.sendMessage("start quiz");
      expect(response.text).toContain("Test Question 1");
      expect(response.text).toContain("Option 1A");
      expect(response.text).toContain("Option 1B");
    });
  });

  describe("Error Handling", () => {
    it("should handle invalid quiz answers gracefully", async () => {
      await chatService.sendMessage("start quiz");
      const response = await chatService.sendMessage("invalid");
      expect(response.type).toBe("message");
    });

    it("should handle quiz answers when no quiz is active", async () => {
      const response = await chatService.sendMessage("1");
      expect(response.type).toBe("message");
    });
  });

  test("should translate messages correctly", () => {
    expect(mockTranslate("quiz.questions.1.question")).toBe("Test Question 1");
    expect(mockTranslate("quiz.questions.1.options.0")).toBe("Option 1A");
  });
});
