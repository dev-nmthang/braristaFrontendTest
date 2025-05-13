import React, { useState, useRef, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import QuizStep from "../Quiz/QuizStep";
import Message from "./Message";
import ChatInput from "./ChatInput";
import * as chatService from "../../services/chat";

// Common styles
export const COMMON_STYLES = {
  textColor: "#1f2836",
  commonBg: "#83c24a",
  headerBg: "#83c24a",
  buttonBg: "#324d1a",
  quizBg: "#e4f2d9",
  buttonOpacity: 0.8,
  buttonHoverOpacity: 1,
  spacing: {
    sm: "8px",
    md: "12px",
    lg: "16px",
  },
  borderRadius: {
    window: "16px",
    button: "8px",
  },
  shadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
};

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: number;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set translation function
    chatService.setTranslateFunction(t);
  }, [t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message to display only if it's not a quiz answer
    if (!(chatService.isQuizActive() && /^[0-9]$/.test(message))) {
      const userMessage = {
        id: Date.now(),
        text: message,
        timestamp: Date.now(),
        sender: "user",
        type: "message",
      };
      setMessages((prev) => [...prev, userMessage]);
    }

    // Only show loading for non-quiz messages
    const isQuizStart = message.toLowerCase() === "start quiz";
    if (!isQuizStart && !chatService.isQuizActive()) {
      setIsLoading(true);
    }

    try {
      // Get bot response
      const response = await chatService.sendMessage(message);

      // Only add non-quiz messages or quiz results to the display
      if (response.type === "message" || response.type === "quiz-result") {
        setMessages((prev) => [...prev, response]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      if (!isQuizStart && !chatService.isQuizActive()) {
        setIsLoading(false);
      }
    }
  };

  const handleQuizAnswer = async (answer: number) => {
    const response = await chatService.sendMessage((answer + 1).toString());
    // If it's a quiz result or a new quiz question, update the UI
    if (response.type === "quiz-result") {
      setMessages((prev) => [...prev, response]);
    }
    // Force a re-render to show the next question
    setMessages((prev) => [...prev]);
  };

  const handleResetChat = () => {
    chatService.resetChat();
    setMessages([]);
  };

  const currentQuestion = chatService.getCurrentQuestion();
  const isQuizActive = chatService.isQuizActive();

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Box
          position="fixed"
          bottom={COMMON_STYLES.spacing.lg}
          right={COMMON_STYLES.spacing.lg}
          zIndex={1001}
          onClick={onClose}
          cursor="pointer"
          transition="all 0.2s"
          _hover={{ transform: "scale(1.05)" }}
          role="button"
          aria-label={t("chat.open")}
        >
          <Box
            width="60px"
            height="60px"
            borderRadius="full"
            bg={COMMON_STYLES.headerBg}
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow={COMMON_STYLES.shadow}
            color="white"
            fontSize="24px"
          >
            💬
          </Box>
        </Box>
      )}

      {/* Chat Window */}
      <Box
        position="fixed"
        bottom={["0", "0", COMMON_STYLES.spacing.lg]}
        right={["0", "0", COMMON_STYLES.spacing.lg]}
        width={["100%", "100%", "380px"]}
        height={isOpen ? ["100vh", "100vh", "550px"] : "0"}
        maxWidth="100vw"
        bg="white"
        borderRadius={["0", "0", COMMON_STYLES.borderRadius.window]}
        boxShadow={COMMON_STYLES.shadow}
        display="flex"
        flexDirection="column"
        overflow="hidden"
        transition="all 0.3s ease"
        opacity={isOpen ? 1 : 0}
        visibility={isOpen ? "visible" : "hidden"}
        transform={isOpen ? "translateY(0)" : "translateY(20px)"}
        zIndex={1000}
      >
        {/* Chat Header */}
        {isOpen && (
          <Box
            bg={COMMON_STYLES.headerBg}
            p={["16px", "16px", COMMON_STYLES.spacing.md]}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderTopRadius={["0", "0", COMMON_STYLES.borderRadius.window]}
          >
            <Text
              color="black"
              fontWeight="medium"
              fontSize={["md", "md", "lg"]}
            >
              {t("chat.title")}
            </Text>
            <Box
              display="flex"
              alignItems="center"
              gap={COMMON_STYLES.spacing.sm}
            >
              <Box
                as="button"
                cursor="pointer"
                onClick={handleResetChat}
                width={["40px", "40px", "32px"]}
                height={["40px", "40px", "32px"]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="black"
                fontSize={["24px", "24px", "20px"]}
                opacity={COMMON_STYLES.buttonOpacity}
                _hover={{ opacity: COMMON_STYLES.buttonHoverOpacity }}
                title={t("chat.reset")}
                aria-label={t("chat.reset")}
              >
                ↺
              </Box>
              <Box
                as="button"
                cursor="pointer"
                onClick={onClose}
                width={["40px", "40px", "32px"]}
                height={["40px", "40px", "32px"]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="black"
                fontSize={["28px", "28px", "24px"]}
                opacity={COMMON_STYLES.buttonOpacity}
                _hover={{ opacity: COMMON_STYLES.buttonHoverOpacity }}
                title={t("chat.close")}
                aria-label={t("chat.close")}
              >
                −
              </Box>
            </Box>
          </Box>
        )}

        {/* Chat Messages */}
        <Box
          flex="1"
          overflowY="auto"
          p={["16px", "16px", COMMON_STYLES.spacing.lg]}
          bg="gray.50"
          display="flex"
          flexDirection="column"
          css={{
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#CBD5E0",
              borderRadius: "4px",
            },
          }}
        >
          {messages.map((message) => (
            <Message
              key={message.id}
              text={message.text}
              type={message.sender === "bot" ? "bot" : "user"}
              timestamp={new Date(message.timestamp)}
              textColor={COMMON_STYLES.textColor}
            />
          ))}

          {isLoading && (
            <Box alignSelf="flex-start" mt={2}>
              <Text fontSize="sm" color="gray.500">
                Typing...
              </Text>
            </Box>
          )}

          {isQuizActive && currentQuestion && (
            <Box mt={COMMON_STYLES.spacing.lg}>
              <QuizStep
                question={currentQuestion.question}
                options={currentQuestion.options}
                onAnswer={handleQuizAnswer}
                progress={
                  (((chatService.getCurrentQuestionIndex() ?? 0) + 1) /
                    chatService.getTotalQuestions()) *
                  100
                }
                textColor={COMMON_STYLES.textColor}
                buttonBg={COMMON_STYLES.buttonBg}
                quizBg={COMMON_STYLES.quizBg}
              />
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Chat Input */}
        <Box
          p={["16px", "16px", COMMON_STYLES.spacing.md]}
          borderTop="1px solid"
          borderColor="gray.200"
          bg="white"
          position={["sticky", "sticky", "relative"]}
          bottom="0"
          width="100%"
        >
          <ChatInput
            onSend={handleMessage}
            placeholder={t("chat.inputPlaceholder")}
            disabled={isLoading}
          />
        </Box>
      </Box>
    </>
  );
};

export default ChatWindow;
