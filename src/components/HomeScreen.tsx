import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons'; 
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaPython, FaJava, FaAward } from 'react-icons/fa';
import { SiTypescript, SiCplusplus } from "react-icons/si";
import { GiBrain } from "react-icons/gi";

// ========================================================================
// FINAL FIX: Using a Type Assertion to override the compiler error.
// ========================================================================
const IconRenderer: React.FC<{ icon?: IconType }> = ({ icon }) => {
  // We are telling TypeScript to treat these as a valid 'ElementType'.
  // This is a direct command to bypass the faulty type checking.
  const Icon = icon as React.ElementType;
  const FallbackIcon = GiBrain as React.ElementType;

  if (Icon) {
    return <Icon size="3em" />;
  }
  return <FallbackIcon size="3em" />;
};
// ========================================================================


const PageContainer = styled(motion.div)`
  width: 100vw;
  max-width: 1200px;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  background-image: linear-gradient(90deg, var(--primary), var(--secondary));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 4rem;
`;

const TopicGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const TopicCard = styled(motion(Link))`
  background: var(--glass-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 2rem;
  text-decoration: none;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  &:hover {
    transform: translateY(-10px);
    border-color: var(--primary);
    box-shadow: 0 0 25px rgba(129, 140, 248, 0.5);
  }
`;

const TopicTitle = styled.h2`
  font-size: 1.5rem;
  text-transform: uppercase;
  font-weight: 600;
`;

const topicIcons: { [key: string]: IconType } = {
  html: FaHtml5,
  css: FaCss3Alt,
  javascript: FaJsSquare,
  react: FaReact,
  typescript: SiTypescript,
  nodejs: FaNodeJs,
  python: FaPython,
  java: FaJava,
  dsa: GiBrain,
  oops: SiCplusplus,
  all: FaAward,
};

const TopicCardInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  button {
    padding: 0.4rem 0.8rem;
    background: var(--primary);
    border: none;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.3s ease;

    &:hover {
      background: var(--secondary);
    }
  }
`;

const TopicCardHoverable = styled(TopicCard)`
  &:hover ${ActionButtons} {
    opacity: 1;
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const HomeScreen: React.FC = () => {
    const navigate = useNavigate();
    const [topics, setTopics] = useState<string[]>([]);
    
    const fallbackTopics = useMemo(() => ['html', 'css', 'javascript', 'react', 'typescript', 'nodejs', 'dsa', 'oops', 'java', 'python', 'all'], []);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await fetch('http://localhost:8000/quiz/topics');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setTopics(data);
            } catch (err) {
                console.error('Failed to fetch topics, using fallback.', err);
                setTopics(fallbackTopics);
            }
        };
        fetchTopics();
    }, [fallbackTopics]);

    const displayTopics = topics.length > 0 ? topics : [];

    return (
        <PageContainer initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
            <Title>Hemu's Interview Preparation Quiz</Title>
            <Subtitle>Revise! Personal Interview Preparation Platform With Quiz</Subtitle>
            <TopicGrid variants={containerVariants} initial="hidden" animate="visible">
              {displayTopics.map((topic) => (
                <TopicCardHoverable key={topic} to="#" variants={itemVariants} onClick={(e) => e.preventDefault()}>
                  <TopicCardInner>
                    <IconRenderer icon={topicIcons[topic]} />
                    <TopicTitle>{topic}</TopicTitle>
                    <ActionButtons>
                      <button onClick={() => navigate(`/learn/${topic}`)}>Learn</button>
                      <button onClick={() => navigate(`/quiz/${topic}`)}>Start Quiz</button>
                    </ActionButtons>
                    </TopicCardInner>
                </TopicCardHoverable>
              ))}
            </TopicGrid>
        </PageContainer>
    );
};

export default HomeScreen;