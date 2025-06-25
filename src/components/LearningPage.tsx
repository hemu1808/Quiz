// Updated LearningPage.tsx with advanced glass UI, modal fallback, and JSON data fetch
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled(motion.div)`
  padding: 4em;
  background: linear-gradient(to right top, #1a1a2e, #16213e);
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  font-family: 'Segoe UI', sans-serif;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  backdrop-filter: blur(20px);
  padding: 3rem;
  width: 100%;
  max-width: 2000px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  background: linear-gradient(90deg, #6e8efb, #a777e3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ListItem = styled.li`
  font-size: 1.1rem;
  line-height: 1.75;
  padding: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const Subtitle = styled.p`
  text-align: center;
  max-width: 700px;
  font-size: 1.2rem;
  color: #ccc;
`;

const LearningPage = () => {
  const { topic } = useParams();
  // It seems your backend is now expected to return the data directly for the topic
  // so we'll adjust the state to expect that structure.
  const [data, setData] = useState<{ title: string; content: string[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchLearningData = async () => {
    try {
      // Use the correct port (e.g., 3000) from Check #1
      const urlToFetch = `http://localhost:8000/quiz/learn/${topic}`;

      // THIS IS THE IMPORTANT DEBUGGING LINE:
      console.log('ATTEMPTING TO FETCH FROM URL:', urlToFetch);

      const response = await fetch(urlToFetch);
      if (!response.ok) throw new Error('Failed to fetch');
      const fullData = await response.json();
      setData(fullData);
    } catch (err) {
      console.error('Learning fetch error', err); // This is where your error comes from
    } finally {
      setLoading(false);
    }
  };
  fetchLearningData();
}, [topic]);

  if (loading) {
    return <PageContainer><Title>Loading {topic}...</Title></PageContainer>;
  }

  if (!data) {
    return <PageContainer><Title>No content available for "{topic}"</Title></PageContainer>;
  }

  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Title>{data.title}</Title>
      <Subtitle>Master the essentials and advanced concepts of {topic}.</Subtitle>
      <Card
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <ul>
          {data.content.map((point, index) => (
            <ListItem key={index}> {point}</ListItem>
          ))}
        </ul>
      </Card>
    </PageContainer>
  );
};

export default LearningPage;
