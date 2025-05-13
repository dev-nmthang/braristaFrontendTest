import React from 'react';
import { Box, Text, Button, Progress } from '@chakra-ui/react';

interface QuizStepProps {
  question: string;
  options: string[];
  onAnswer: (answer: number) => void;
  progress: number;
  textColor?: string;
  buttonBg?: string;
  quizBg?: string;
}

const QuizStep: React.FC<QuizStepProps> = ({ 
  question, 
  options, 
  onAnswer,
  progress,
  textColor = '#1f2836',
  buttonBg = '#324d1a',
  quizBg = '#e4f2d9'
}) => {

  return (
    <Box>
      <Progress
        value={progress}
        size="xs"
        borderRadius="full"
        bg="#f3f4f6"
        sx={{
          '& > div': {
            background: '#334c1a'
          }
        }}
        mb={4}
      />
      <Box bg={quizBg} p={4} borderRadius="md">
        <Text 
          mb={4} 
          color={textColor}
          fontWeight="medium"
        >
          {question}
        </Text>
        <Box display="flex" flexDirection="column" gap={2}>
          {options.map((option, index) => (
            <Button
              key={index}
              width="100%"
              bg={buttonBg}
              color="white"
              _hover={{
                bg: buttonBg,
                opacity: 0.9
              }}
              onClick={() => onAnswer(index)}
            >
              {option}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default QuizStep; 