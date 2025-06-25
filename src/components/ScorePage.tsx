import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const PageContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const ScoreCard = styled(motion.div)`
  background: var(--glass-bg);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 3rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-primary);
`;

const Message = styled.p`
    font-size: 1.2rem;
    color: var(--text-secondary);
`;

const ProgressWrapper = styled.div`
    width: 180px;
    height: 180px;
`;

const PlayAgainButton = styled(motion.button)`
    background-image: linear-gradient(90deg, var(--primary), var(--secondary));
    border: none;
    border-radius: 12px;
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
    cursor: pointer;
    margin-top: 1rem;
`;

// This component now correctly receives NO props.
const ScorePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // It gets its data from location.state, with a fallback.
  const { score = 0, totalQuestions = 0 } = location.state || {};
  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

  const getMessage = () => {
    if (percentage === 100) return "Flawless Victory!";
    if (percentage >= 80) return "Excellent Work!";
    if (percentage >= 50) return "Not Bad at All!";
    return "Keep Practicing!";
  };

  return (
    <PageContainer initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, type: 'spring' }}>
      <ScoreCard>
        <Title>Quiz Complete!</Title>
        <ProgressWrapper>
          <CircularProgressbar
            value={percentage}
            text={`${Math.round(percentage)}%`}
            styles={buildStyles({
              textColor: 'var(--text-primary)',
              pathColor: `url(#gradient)`,
              trailColor: 'var(--glass-bg)',
            })}
          />
          <svg style={{ height: 0 }}>
            <defs>
              <linearGradient id="gradient" gradientTransform="rotate(90)">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--secondary)" />
              </linearGradient>
            </defs>
          </svg>
        </ProgressWrapper>
        <Message>{getMessage()} You scored {score} out of {totalQuestions}.</Message>
        <PlayAgainButton
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
          Play Again
        </PlayAgainButton>
      </ScoreCard>
    </PageContainer>
  );
};

export default ScorePage;