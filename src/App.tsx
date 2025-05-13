import React, { useState, useEffect } from 'react';
import { Box, Button, Stack, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import ChatWindow from './components/Chat/ChatWindow';
import { chatConfig } from './config/chatConfig';

const labelSets = [
  { lang: "English", code: "en" },
  { lang: "Español", code: "es" },
  { lang: "Français", code: "fr" },
  { lang: "Deutsch", code: "de" },
  { lang: "Italiano", code: "it" }
];

const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [showLangModal, setShowLangModal] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(chatConfig.defaultIsOpen);
  const { i18n, t } = useTranslation();

  // Handle automatic chat opening based on page
  useEffect(() => {
    const shouldAutoOpen = chatConfig.autoOpenPages.includes(page);
    setIsChatOpen(shouldAutoOpen);
  }, [page]);

  const handleLangSelect = (code: string) => {
    i18n.changeLanguage(code);
    setShowLangModal(false);
  };

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  const currentLang = labelSets.find(lang => lang.code === i18n.language)?.lang || "English";

  return (
    <Box>
      <Box p={4} bg="gray.100" mb={4} display="flex" justifyContent="flex-end" alignItems="center">
        <Button
          onClick={() => setShowLangModal(true)}
          size="sm"
          variant="outline"
          leftIcon={<span>🌐</span>}
        >
          {currentLang}
        </Button>
      </Box>

      <Modal isOpen={showLangModal} onClose={() => setShowLangModal(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("app.languageSelector")}</ModalHeader>
          <ModalBody>
            {labelSets.map((lang) => (
              <Button
                key={lang.code}
                w="100%"
                mb={2}
                onClick={() => handleLangSelect(lang.code)}
                colorScheme={lang.code === i18n.language ? "teal" : "gray"}
              >
                {lang.lang}
              </Button>
            ))}
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Text fontSize="sm">{t("app.chooseLanguage")}</Text>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Stack direction="row" spacing={4} mb={4} mt={4} justify="center">
        <Button size="lg" colorScheme={page===1?"teal":"gray"} onClick={()=>setPage(1)}>Page 1</Button>
        <Button size="lg" colorScheme={page===2?"teal":"gray"} onClick={()=>setPage(2)}>Page 2</Button>
        <Button size="lg" colorScheme={page===3?"teal":"gray"} onClick={()=>setPage(3)}>Page 3</Button>
        <Button size="lg" colorScheme={page===4?"teal":"gray"} onClick={()=>setPage(4)}>Page 4</Button>
      </Stack>
      <Text fontWeight="bold" mb={2} textAlign="center">Current Page: {page}</Text>
      <ChatWindow 
        isOpen={isChatOpen} 
        onClose={toggleChat} 
        currentPage={page} 
      />
    </Box>
  );
};

export default App; 