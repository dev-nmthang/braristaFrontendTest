import React, { useState } from "react";
import { Input, Button, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { COMMON_STYLES } from "./ChatWindow";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled = false }) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex gap={2}>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("chat.inputPlaceholder")}
          disabled={disabled}
          autoFocus
          bg="gray.50"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="full"
          _focus={{
            borderColor: "green.400",
            boxShadow: "none",
          }}
        />
        <Button
          type="submit"
          disabled={disabled || !message.trim()}
          bg={COMMON_STYLES.commonBg}
          color="black"
          borderRadius="full"
          width="40px"
          height="40px"
          minW="40px"
          p={0}
          _hover={{
            bg: COMMON_STYLES.commonBg,
            opacity: 0.9,
          }}
          aria-label={t("chat.send")}
        >
          ↑
        </Button>
      </Flex>
    </form>
  );
};

export default ChatInput;
