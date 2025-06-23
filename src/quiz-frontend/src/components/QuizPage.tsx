import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import QuestionCard from './QuestionCard';
import ScorePage from './ScorePage';
import styled from 'styled-components';

const QuizContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const QuizPage: React.FC = () => {
  const { topic } = useParams<{ topic: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/questions');
        setQuestions(response.data[topic || '']);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, [topic]);

  const handleAnswer = (selectedAnswer: string) => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  if (quizFinished) {
    return <ScorePage score={score} totalQuestions={questions.length} />;
  }

  return (
    <QuizContainer>
      {questions.length > 0 && (
        <QuestionCard
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
        />
      )}
    </QuizContainer>
  );
};

export default QuizPage;