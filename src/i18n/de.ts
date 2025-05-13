export default {
  app: {
    languageSelector: 'Sprache auswählen',
    chooseLanguage: 'Wählen Sie Ihre bevorzugte Sprache'
  },
  chat: {
    title: "Chat mit dem BH-Anpassungsassistenten",
    inputPlaceholder: "Frag mich alles",
    send: "Senden",
    messageTime: "Nachrichtenzeit",
    reset: "Chat zurücksetzen",
    greetings:
      "Hallo! Ich bin hier, um Ihnen bei der Suche nach dem perfekten BH zu helfen. Möchten Sie unseren Anpassungstest machen?",
    open: "Chat öffnen",
    close: "Chat schließen",
    size: {
      recommendation: "Basierend auf Ihren Angaben würde ich einen {{size}} empfehlen. Möchten Sie wissen, wie Sie sich richtig messen können?"
    },
    measure: {
      instructions: "Zum Messen: 1. Tragen Sie einen ungefütterten BH 2. Messen Sie um Ihren Brustkorb 3. Messen Sie um die vollste Stelle Ihrer Brust. Benötigen Sie weitere Details?"
    },
    responses: {
      question: "Das ist eine sehr gute Frage! Lassen Sie mich Ihnen helfen.",
      understanding: "Ich verstehe. Erzählen Sie mir mehr darüber, wonach Sie suchen.",
      help: "Ich bin hier, um zu helfen! Fragen Sie mich alles über BH-Anpassung."
    }
  },
  quiz: {
    start: {
      prompt:
        "Möchten Sie Ihr Wissen testen? Geben Sie 'start quiz' ein, um zu beginnen!",
      welcome:
        "Großartig! Lassen Sie uns Ihr Wissen über BH-Anpassung testen. Hier ist Ihre erste Frage:",
    },
    questions: {
      1: {
        question: "Was ist der wichtigste Faktor bei einem gut sitzenden BH?",
        options: [
          "Das Band sitzt eng an",
          "Die Träger sind fest",
          "Die Farbe passt zur Kleidung",
          "Der Preis stimmt",
        ],
      },
      2: {
        question: "Wie sollte das Band Ihres BHs sitzen?",
        options: [
          "Über der Brust",
          "Parallel zum Boden",
          "Locker und bequem",
          "So eng wie möglich",
        ],
      },
      3: {
        question: "Wann sollten Sie Ihren BH ersetzen?",
        options: [
          "Alle 6-8 Monate bei regelmäßigem Tragen",
          "Einmal im Jahr",
          "Wenn er alt aussieht",
          "Nie, wenn er bequem ist",
        ],
      },
    },
    completion: {
      result: "Quiz abgeschlossen! Ihre Punktzahl: {{score}}/{{total}}",
    },
  },
  common: {
    back: "Zurück",
    next: "Weiter",
    submit: "Absenden",
  },
};
