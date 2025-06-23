import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;
  text-align: center;
`;

const QuestionText = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const OptionButton = styled.button`
  background-color: #f0f2f5;
  border: 2px solid #ddd;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e0e2e5;
  }
`;

interface QuestionCardProps {
  question: {
    question: string;
    options: string[];
    correctAnswer: string;
  };
  onAnswer: (selectedAnswer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
  return (
    <Card>
      <QuestionText>{question.question}</QuestionText>
      <OptionsGrid>
        {question.options.map((option, index) => (
          <OptionButton key={index} onClick={() => onAnswer(option)}>
            {option}
          </OptionButton>
        ))}
      </OptionsGrid>
    </Card>
  );
};

export default QuestionCard;