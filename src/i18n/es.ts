export default {
  app: {
    languageSelector: 'Seleccionar idioma',
    chooseLanguage: 'Elige tu idioma preferido'
  },
  chat: {
    title: "Chat con el Asistente de Ajuste de Sujetador",
    inputPlaceholder: "Pregúntame lo que quieras",
    send: "Enviar",
    messageTime: "Hora del mensaje",
    reset: "Reiniciar Chat",
    greetings:
      "¡Hola! Estoy aquí para ayudarte a encontrar el sujetador perfecto. ¿Te gustaría hacer nuestro cuestionario de ajuste?",
    open: "Abrir Chat",
    close: "Cerrar Chat",
    size: {
      recommendation: "Según lo que me has dicho, te recomendaría un {{size}}. ¿Te gustaría saber cómo medirte correctamente?"
    },
    measure: {
      instructions: "Para medirte: 1. Usa un sujetador sin relleno 2. Mide alrededor de tu caja torácica 3. Mide alrededor de la parte más llena de tu busto. ¿Necesitas más detalles?"
    },
    responses: {
      question: "¡Esa es una gran pregunta! Déjame ayudarte.",
      understanding: "Entiendo. Cuéntame más sobre lo que estás buscando.",
      help: "¡Estoy aquí para ayudarte! Pregúntame cualquier cosa sobre el ajuste de sujetadores."
    }
  },
  quiz: {
    start: {
      prompt:
        "¿Quieres poner a prueba tus conocimientos? ¡Escribe 'start quiz' para comenzar!",
      welcome:
        "¡Genial! Vamos a probar tus conocimientos sobre el ajuste de sujetadores. Aquí está tu primera pregunta:",
    },
    questions: {
      1: {
        question:
          "¿Cuál es el factor más importante en un sujetador bien ajustado?",
        options: [
          "La banda se ajusta cómodamente",
          "Los tirantes están apretados",
          "El color combina con tu ropa",
          "El precio es correcto",
        ],
      },
      2: {
        question: "¿Cómo debe quedar la banda de tu sujetador?",
        options: [
          "Por encima del pecho",
          "Paralela al suelo",
          "Suelta y cómoda",
          "Lo más apretada posible",
        ],
      },
      3: {
        question: "¿Cuándo debes reemplazar tu sujetador?",
        options: [
          "Cada 6-8 meses con uso regular",
          "Una vez al año",
          "Cuando empiece a verse viejo",
          "Nunca si está cómodo",
        ],
      },
    },
    completion: {
      result: "¡Quiz completado! Tu puntuación: {{score}}/{{total}}",
    },
  },
  common: {
    back: "Atrás",
    next: "Siguiente",
    submit: "Enviar",
  },
};
