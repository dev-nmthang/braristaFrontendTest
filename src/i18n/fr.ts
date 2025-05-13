export default {
  app: {
    languageSelector: 'Sélectionner la langue',
    chooseLanguage: 'Choisissez votre langue préférée'
  },
  chat: {
    title: "Chat avec l'Assistant d'Ajustement de Soutien-gorge",
    inputPlaceholder: "Demandez-moi n'importe quoi",
    send: "Envoyer",
    messageTime: "Heure du message",
    reset: "Réinitialiser le Chat",
    greetings:
      "Bonjour! Je suis là pour vous aider à trouver le soutien-gorge parfait. Voulez-vous faire notre quiz d'ajustement?",
    open: "Ouvrir le Chat",
    close: "Fermer le Chat",
    size: {
      recommendation: "D'après ce que vous m'avez dit, je recommanderais un {{size}}. Voulez-vous savoir comment vous mesurer correctement?"
    },
    measure: {
      instructions: "Pour vous mesurer: 1. Portez un soutien-gorge non rembourré 2. Mesurez autour de votre cage thoracique 3. Mesurez autour de la partie la plus pleine de votre buste. Besoin de plus de détails?"
    },
    responses: {
      question: "C'est une excellente question! Laissez-moi vous aider.",
      understanding: "Je comprends. Dites-m'en plus sur ce que vous recherchez.",
      help: "Je suis là pour vous aider! Posez-moi n'importe quelle question sur l'ajustement des soutiens-gorge."
    }
  },
  quiz: {
    start: {
      prompt:
        "Voulez-vous tester vos connaissances? Tapez 'start quiz' pour commencer!",
      welcome:
        "Super! Testons vos connaissances sur l'ajustement des soutiens-gorge. Voici votre première question:",
    },
    questions: {
      1: {
        question:
          "Quel est le facteur le plus important dans un soutien-gorge bien ajusté?",
        options: [
          "La bande est bien ajustée",
          "Les bretelles sont serrées",
          "La couleur correspond à votre tenue",
          "Le prix est correct",
        ],
      },
      2: {
        question:
          "Comment la bande de votre soutien-gorge doit-elle être positionnée?",
        options: [
          "Au-dessus de la poitrine",
          "Parallèle au sol",
          "Lâche et confortable",
          "Le plus serré possible",
        ],
      },
      3: {
        question: "Quand devez-vous remplacer votre soutien-gorge?",
        options: [
          "Tous les 6-8 mois avec une utilisation régulière",
          "Une fois par an",
          "Quand il commence à paraître vieux",
          "Jamais s'il est confortable",
        ],
      },
    },
    completion: {
      result: "Quiz terminé! Votre score: {{score}}/{{total}}",
    },
  },
  common: {
    back: "Retour",
    next: "Suivant",
    submit: "Envoyer",
  },
};
