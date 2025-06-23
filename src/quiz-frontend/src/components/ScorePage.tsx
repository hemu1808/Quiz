import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const ScoreText = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const HomeButton = styled(Link)`
  background-color: #007bff;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 10px;
  text-decoration: none;
  font-size: 1.2rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

interface ScorePageProps {
  score: number;
  totalQuestions: number;
}

const ScorePage: React.FC<ScorePageProps> = ({ score, totalQuestions }) => {
  return (
    <ScoreContainer>
      <ScoreText>
        Your Score: {score} / {totalQuestions}
      </ScoreText>
      <HomeButton to="/">Go to Home</HomeButton>
    </ScoreContainer>
  );
};

export default ScorePage;