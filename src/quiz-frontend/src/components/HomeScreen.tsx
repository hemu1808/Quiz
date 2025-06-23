import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 2rem;
`;

const TopicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  width: 80%;
  max-width: 1200px;
`;

const TopicButton = styled(Link)`
  background-color: #fff;
  color: #333;
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const topics = [
  'html',
  'css',
  'javascript',
  'react',
  'typescript',
  'nodejs',
  'python',
  'java',
  'dsa',
  'oops',
];

const HomeScreen: React.FC = () => {
  return (
    <HomeScreenContainer>
      <Title>Choose a Topic</Title>
      <TopicGrid>
        {topics.map((topic) => (
          <TopicButton key={topic} to={`/quiz/${topic}`}>
            {topic.toUpperCase()}
          </TopicButton>
        ))}
      </TopicGrid>
    </HomeScreenContainer>
  );
};

export default HomeScreen;