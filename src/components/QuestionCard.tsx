import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background: var(--glass-bg);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 2.5rem 3rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  text-align: left;
  margin-bottom: 2rem;
`;

const QuestionText = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2rem;
  line-height: 1.4;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const OptionButton = styled(motion.button)<{ isSelected?: boolean; isCorrect?: boolean; isIncorrect?: boolean }>`
  width: 100%;
  background: ${({ isSelected }) => (isSelected ? 'rgba(129, 140, 248, 0.3)' : 'var(--glass-bg)')};
  border: 1px solid ${({ isSelected }) => (isSelected ? 'var(--primary)' : 'var(--border-color)')};
  padding: 1.25rem;
  font-size: 1.1rem;
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  color: var(--text-secondary);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-align: left;

  ${({ isCorrect }) => isCorrect && `
    background: var(--success);
    border-color: var(--success);
    color: var(--bg-color);
  `}

  ${({ isIncorrect }) => isIncorrect && `
    background: var(--error);
    border-color: var(--error);
    color: var(--bg-color);
  `}

  &:hover:not(:disabled) {
    border-color: var(--primary);
    color: var(--text-primary);
  }
`;

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuestionCardProps {
  question: Question;
  onSelectAnswer: (questionId: number, selectedOption: string) => void;
  selectedOption?: string;
  isSubmitted: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onSelectAnswer,
  selectedOption,
  isSubmitted,
}) => {
  const getButtonState = (option: string) => {
    if (!isSubmitted) {
      return { isSelected: selectedOption === option };
    }
    // After submission
    const isCorrect = option === question.correctAnswer;
    const isSelectedIncorrect = selectedOption === option && !isCorrect;
    return { isCorrect, isIncorrect: isSelectedIncorrect };
  };

  return (
    <Card>
      <QuestionText>{`${question.id}. ${question.question}`}</QuestionText>
      <OptionsGrid>
        {question.options.map((option) => (
          <OptionButton
            key={option}
            onClick={() => onSelectAnswer(question.id, option)}
            disabled={isSubmitted}
            {...getButtonState(option)}
            whileHover={{ scale: isSubmitted ? 1 : 1.02 }}
          >
            {option}
          </OptionButton>
        ))}
      </OptionsGrid>
    </Card>
  );
};

export default QuestionCard;