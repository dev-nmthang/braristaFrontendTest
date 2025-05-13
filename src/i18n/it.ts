export default {
  app: {
    languageSelector: 'Seleziona lingua',
    chooseLanguage: 'Scegli la tua lingua preferita'
  },
  chat: {
    title: "Chat con l'Assistente per la Vestibilità del Reggiseno",
    inputPlaceholder: "Chiedimi qualsiasi cosa",
    send: "Invia",
    messageTime: "Ora del messaggio",
    reset: "Reimposta Chat",
    greetings:
      "Ciao! Sono qui per aiutarti a trovare il reggiseno perfetto. Vuoi fare il nostro quiz di vestibilità?",
    open: "Apri Chat",
    close: "Chiudi Chat",
    size: {
      recommendation: "In base a quello che mi hai detto, ti consiglierei una {{size}}. Vuoi sapere come misurarti correttamente?"
    },
    measure: {
      instructions: "Per misurarti: 1. Indossa un reggiseno non imbottito 2. Misura intorno al torace 3. Misura intorno alla parte più piena del seno. Hai bisogno di più dettagli?"
    },
    responses: {
      question: "Questa è un'ottima domanda! Lascia che ti aiuti.",
      understanding: "Capisco. Dimmi di più su cosa stai cercando.",
      help: "Sono qui per aiutarti! Chiedimi qualsiasi cosa sulla vestibilità del reggiseno."
    }
  },
  quiz: {
    start: {
      prompt:
        "Vuoi mettere alla prova le tue conoscenze? Scrivi 'start quiz' per iniziare!",
      welcome:
        "Ottimo! Mettiamo alla prova le tue conoscenze sulla vestibilità del reggiseno. Ecco la tua prima domanda:",
    },
    questions: {
      1: {
        question:
          "Qual è il fattore più importante in un reggiseno che calza bene?",
        options: [
          "La fascia aderisce comodamente",
          "Le spalline sono strette",
          "Il colore si abbina al tuo outfit",
          "Il prezzo è giusto",
        ],
      },
      2: {
        question: "Come dovrebbe stare la fascia del tuo reggiseno?",
        options: [
          "Sopra il seno",
          "Parallela al pavimento",
          "Larga e comoda",
          "Il più stretta possibile",
        ],
      },
      3: {
        question: "Quando dovresti sostituire il tuo reggiseno?",
        options: [
          "Ogni 6-8 mesi con uso regolare",
          "Una volta all'anno",
          "Quando inizia a sembrare vecchio",
          "Mai se è comodo",
        ],
      },
    },
    completion: {
      result: "Quiz completato! Il tuo punteggio: {{score}}/{{total}}",
    },
  },
  common: {
    back: "Indietro",
    next: "Avanti",
    submit: "Invia",
  },
};
