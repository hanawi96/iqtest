// 🔤 TestIQ Shared Types
export interface User {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  type: QuestionType;
  category: QuestionCategory;
  difficulty: DifficultyLevel;
  content: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  timeLimit: number; // seconds
  points: number;
}

export interface TestResult {
  id: string;
  userId: string;
  totalQuestions: number;
  correctAnswers: number;
  totalTime: number; // seconds
  iqScore: number;
  categoryScores: CategoryScore[];
  achievements: Achievement[];
  completedAt: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
}

export interface CategoryScore {
  category: QuestionCategory;
  score: number;
  maxScore: number;
  percentage: number;
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  FILL_BLANK = 'fill_blank',
  SEQUENCE = 'sequence',
  PATTERN = 'pattern'
}

export enum QuestionCategory {
  LOGIC_VISUAL = 'logic_visual',
  LOGIC_NUMBER = 'logic_number',
  LANGUAGE = 'language',
  SPATIAL = 'spatial',
  MEMORY = 'memory',
  JUDGMENT = 'judgment',
  PROBLEM_SOLVING = 'problem_solving',
  SPEED = 'speed'
}

export enum DifficultyLevel {
  LEVEL_1 = 1,
  LEVEL_2 = 2,
  LEVEL_3 = 3,
  LEVEL_4 = 4,
  LEVEL_5 = 5,
  LEVEL_6 = 6
} 