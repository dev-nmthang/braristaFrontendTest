export default {
  app: {
    languageSelector: 'Select Language',
    chooseLanguage: 'Choose your preferred language'
  },
  chat: {
    title: "Chat with Bra Fitting Assistant",
    inputPlaceholder: "Ask me anything",
    send: "Send",
    messageTime: "Message time",
    reset: "Reset Chat",
    greetings:
      "Hello! I'm here to help you find the perfect bra fit. Would you like to take our fitting quiz?",
    open: "Open Chat",
    close: "Close Chat",
    size: {
      recommendation: "Based on what you've told me, I would recommend a {{size}}. Would you like to know how to measure yourself properly?"
    },
    measure: {
      instructions: "To measure yourself: 1. Wear an unlined bra 2. Measure around your ribcage 3. Measure around the fullest part of your bust. Need more details?"
    },
    responses: {
      question: "That's a great question! Let me help you with that.",
      understanding: "I understand. Tell me more about what you're looking for.",
      help: "I'm here to help! Ask me anything about bra fitting."
    }
  },
  quiz: {
    start: {
      prompt:
        "Would you like to test your knowledge? Type 'start quiz' to begin!",
      welcome:
        "Great! Let's test your bra fitting knowledge. Here's your first question:",
    },
    questions: {
      1: {
        question: "What's the most important factor in a well-fitting bra?",
        options: [
          "The band fits snugly",
          "The straps are tight",
          "The color matches your outfit",
          "The price is right",
        ],
      },
      2: {
        question: "How should the band of your bra sit?",
        options: [
          "Above your breasts",
          "Parallel to the floor",
          "Loose and comfortable",
          "As tight as possible",
        ],
      },
      3: {
        question: "When should you replace your bra?",
        options: [
          "Every 6-8 months with regular wear",
          "Once a year",
          "When it starts looking old",
          "Never if it's comfortable",
        ],
      },
    },
    completion: {
      result: "Quiz completed! Your score: {{score}}/{{total}}",
    },
  },
  common: {
    back: "Back",
    next: "Next",
    submit: "Submit",
  },
};
