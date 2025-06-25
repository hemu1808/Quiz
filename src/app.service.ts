// quiz-api/src/app.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

// SOLUTION: Add the 'export' keyword here.
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}


type QuizData = Record<string, QuizQuestion[]>;

@Injectable()
export class AppService {
  private learnData: Record<string, { title: string; content: string[] }>;
  private quizData: QuizData;

  constructor() {
    // Load learn-data.json
    const learnPath = path.join(process.cwd(), 'data', 'learn-data.json');
    this.learnData = JSON.parse(fs.readFileSync(learnPath, 'utf-8'));

    // Load quiz-data.json
    const dataPath = path.join(process.cwd(), 'data', 'quiz-data.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    this.quizData = JSON.parse(rawData);
  }

  getLearnContent(topic: string) {
    const content = this.learnData[topic.toLowerCase()];
    if (!content) throw new NotFoundException(`Learning content for '${topic}' not found.`);
    return content;
  }

  getQuizTopic(topic: string): QuizQuestion[] {
    const quizTopic = this.quizData[topic.toLowerCase()];
    if (!quizTopic) {
      throw new NotFoundException(`Quiz topic '${topic}' not found.`);
    }
    return quizTopic;
  }

  getAllInOneQuiz(): QuizQuestion[] {
    const allQuestions: QuizQuestion[] = Object.values(this.quizData).flat();
    const randomFive = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);
    return randomFive;
  }

  getAllTopics(): string[] {
    const apiTopics = Object.keys(this.quizData);
    const hardcodedTopics = ['react', 'typescript', 'nodejs', 'python', 'java', 'dsa', 'oops', 'all'];
    const allTopics = [...new Set([...apiTopics, ...hardcodedTopics])];
    return allTopics;
  }
}