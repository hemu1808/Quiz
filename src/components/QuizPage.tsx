import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import QuestionCard from './QuestionCard';

const PageContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  padding: 2rem;
`;

const QuizTitle = styled.h1`
  font-size: 3rem;
  text-transform: capitalize;
  font-weight: 800;
  margin-bottom: 2rem;
  background-image: linear-gradient(90deg, var(--primary), var(--secondary));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;

const MessageText = styled.p`
  font-size: 1.5rem;
  color: var(--text-secondary);
  background: var(--glass-bg);
  padding: 2rem 3rem;
  border-radius: 16px;
  border: 1px solid var(--border-color);
`;

const SubmitButton = styled(motion.button)`
    background-image: linear-gradient(90deg, var(--primary), var(--secondary));
    border: none;
    border-radius: 12px;
    padding: 1rem 3rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-primary);
    cursor: pointer;
    margin-top: 2rem;
    width: 100%;
    max-width: 800px;
`;

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

const QuizPage: React.FC = () => {
  const { topic } = useParams<{ topic: string }>();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!topic) return;
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:8000/quiz/${topic}`);
        if (!response.ok) throw new Error(`Server returned an error: ${response.statusText}`);
        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) throw new Error(`No questions found for topic: ${topic}`);
        setQuestions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [topic]);

  const handleSelectAnswer = (questionId: number, selectedOption: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        score++;
      }
    });
    setIsSubmitted(true);

    // Wait 2 seconds to show the results before navigating
    setTimeout(() => {
        navigate('/score', { state: { score: score, totalQuestions: questions.length } });
    }, 2000);
  };

  if (loading) return <PageContainer><MessageText>Loading Challenge...</MessageText></PageContainer>;
  if (error) return <PageContainer><MessageText>Error: {error}</MessageText></PageContainer>;

  return (
    <PageContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <QuizTitle>{topic} Quiz</QuizTitle>
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          onSelectAnswer={handleSelectAnswer}
          selectedOption={answers[question.id]}
          isSubmitted={isSubmitted}
        />
      ))}
      {!isSubmitted && (
        <SubmitButton
            onClick={handleSubmitQuiz}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            Submit Quiz
        </SubmitButton>
      )}
    </PageContainer>
  );
};

export default QuizPage;