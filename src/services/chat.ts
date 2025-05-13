import { TFunction } from 'i18next';

interface Message {
  id: number;
  text: string;
  timestamp: number;
  sender: 'user' | 'bot';
  type: 'message' | 'quiz' | 'quiz-result';
}

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

interface QuizState {
  currentQuestion: number;
  score: number;
  completed: boolean;
}

let messageCounter = 0;
let chatHistory: Message[] = [];
let currentQuiz: QuizState | null = null;
let translate: TFunction | null = null;
let quizQuestions: QuizQuestion[] = [];

function initializeQuizQuestions() {
  if (!translate) return;
  
  const t = translate;  // Store in local variable after null check
  
  quizQuestions = [
    {
      question: t('quiz.questions.1.question'),
      options: Array.from({ length: 4 }, (_, i) => t(`quiz.questions.1.options.${i}`)),
      correct: 0
    },
    {
      question: t('quiz.questions.2.question'),
      options: Array.from({ length: 4 }, (_, i) => t(`quiz.questions.2.options.${i}`)),
      correct: 1
    },
    {
      question: t('quiz.questions.3.question'),
      options: Array.from({ length: 4 }, (_, i) => t(`quiz.questions.3.options.${i}`)),
      correct: 0
    }
  ];
}

export function setTranslateFunction(t: TFunction) {
  translate = t;
  initializeQuizQuestions();
}

export const sendMessage = async (message: string): Promise<Message> => {
  if (!translate) {
    throw new Error('Translation function not set');
  }

  // Only add delay for non-quiz messages
  if (!currentQuiz && !message.toLowerCase().includes('start quiz')) {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000));
  }
  
  messageCounter++;
  
  // Handle quiz start
  if (message.toLowerCase() === 'start quiz') {
    currentQuiz = {
      currentQuestion: 0,
      score: 0,
      completed: false
    };

    // Return the first quiz question immediately
    return {
      id: messageCounter,
      text: formatQuizQuestion(0),
      timestamp: new Date().getTime(),
      sender: 'bot',
      type: 'quiz'
    };
  }

  // Handle quiz answers
  if (currentQuiz && !currentQuiz.completed && /^[0-9]$/.test(message)) {
    const answer = parseInt(message) - 1;
    const question = quizQuestions[currentQuiz.currentQuestion];
    
    if (answer === question.correct) {
      currentQuiz.score++;
    }
    
    currentQuiz.currentQuestion++;
    
    if (currentQuiz.currentQuestion >= quizQuestions.length) {
      currentQuiz.completed = true;
      const score = currentQuiz.score;
      const total = quizQuestions.length;
      
      const response: Message = {
        id: messageCounter,
        text: translate('quiz.completion.result', { score, total }),
        timestamp: new Date().getTime(),
        sender: 'bot',
        type: 'quiz-result'
      };
      currentQuiz = null;
      return response;
    }
    
    // Return next quiz question immediately
    return {
      id: messageCounter,
      text: formatQuizQuestion(currentQuiz.currentQuestion),
      timestamp: new Date().getTime(),
      sender: 'bot',
      type: 'quiz'
    };
  }
  
  // Handle regular messages
  if (!(currentQuiz && /^[0-9]$/.test(message))) {
    const userMessage: Message = {
      id: messageCounter++,
      text: message,
      timestamp: new Date().getTime(),
      sender: 'user',
      type: 'message'
    };
    chatHistory.push(userMessage);
  }
  
  const response: Message = {
    id: messageCounter,
    text: getBotResponse(message),
    timestamp: new Date().getTime(),
    sender: 'bot',
    type: 'message'
  };
  
  chatHistory.push(response);
  return response;
};

export const getHistory = (): Message[] => chatHistory;

function getBotResponse(message: string): string {
  if (!translate) {
    throw new Error('Translation function not set');
  }

  if (message.toLowerCase().includes('quiz')) {
    return translate('quiz.start.prompt');
  }

  if (message.toLowerCase().includes('hello')) {
    return translate('chat.greetings');
  }
  
  if (message.toLowerCase().includes('size')) {
    return translate('chat.size.recommendation', {
      size: ['32B', '34C', '36D'][Math.floor(Math.random() * 3)]
    });
  }
  
  if (message.toLowerCase().includes('measure')) {
    return translate('chat.measure.instructions');
  }
  
  return message.length > 20 
    ? message.includes('?') 
      ? translate('chat.responses.question')
      : translate('chat.responses.understanding')
    : translate('chat.responses.help');
}

function formatQuizQuestion(index: number): string {
  if (!translate) {
    throw new Error('Translation function not set');
  }

  const questionNumber = index + 1;
  const questionText = translate(`quiz.questions.${questionNumber}.question`);
  const optionKeys = Array.from({ length: 4 }, (_, i) => i);
  const options = optionKeys.map(i => 
    translate!(`quiz.questions.${questionNumber}.options.${i}`)
  );
  return `${questionText}\n\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}`;
}

export const isQuizActive = (): boolean => currentQuiz !== null;

export const getCurrentQuestion = (): QuizQuestion | null => {
  return currentQuiz ? quizQuestions[currentQuiz.currentQuestion] : null;
};

export const getCurrentQuestionIndex = (): number | null => {
  return currentQuiz ? currentQuiz.currentQuestion : null;
};

export const getTotalQuestions = (): number => {
  return quizQuestions.length;
};

export const resetChat = (): void => {
  chatHistory = [];
  currentQuiz = null;
  messageCounter = 0;
}; 