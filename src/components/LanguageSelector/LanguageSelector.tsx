import React from 'react';
import { Select } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
  };

  return (
    <Select
      value={i18n.language}
      onChange={changeLanguage}
      size="sm"
      width="auto"
      bg="transparent"
      color="white"
      border="none"
      _hover={{ bg: 'green.500' }}
    >
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
      <option value="de">Deutsch</option>
      <option value="it">Italiano</option>
    </Select>
  );
};

export default LanguageSelector; 