import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { COMMON_STYLES } from "../Chat/ChatWindow";

interface MessageProps {
  text: string;
  type: "user" | "bot";
  timestamp: Date;
  textColor?: string;
}

const Message: React.FC<MessageProps> = ({ text, type, timestamp }) => {
  const { t } = useTranslation();
  const isUser = type === "user";

  return (
    <Box
      maxW="80%"
      mb={3}
      ml={isUser ? "auto" : 0}
      bg={isUser ? COMMON_STYLES.commonBg : "white"}
      color="black"
      p={3}
      borderRadius="lg"
      boxShadow="sm"
    >
      <Text>{text}</Text>
      <Text fontSize="xs" opacity={0.7} mt={1} title={t("chat.messageTime")}>
        {timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </Box>
  );
};

export default Message;
