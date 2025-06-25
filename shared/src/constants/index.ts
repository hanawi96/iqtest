// 🎯 TestIQ Shared Constants

// Game Configuration
export const GAME_CONFIG = {
  TOTAL_QUESTIONS: 60,
  TIME_LIMIT: 25 * 60, // 25 minutes in seconds
  DIFFICULTY_LEVELS: 6,
  CATEGORIES: 8
} as const;

// Question Categories
export const QUESTION_CATEGORIES = {
  LOGIC_VISUAL: 'logic_visual',
  LOGIC_NUMBER: 'logic_number',
  LANGUAGE: 'language',
  SPATIAL: 'spatial',
  MEMORY: 'memory',
  JUDGMENT: 'judgment',
  PROBLEM_SOLVING: 'problem_solving',
  SPEED: 'speed'
} as const;

// Difficulty Distribution (Mountain Shape)
export const DIFFICULTY_DISTRIBUTION = {
  1: 8,  // Level 1: 8 questions (Easy start)
  2: 12, // Level 2: 12 questions (Building up)
  3: 15, // Level 3: 15 questions (Peak)
  4: 15, // Level 4: 15 questions (Peak)
  5: 8,  // Level 5: 8 questions (Challenging)
  6: 2   // Level 6: 2 questions (Master level)
} as const;

// Scoring Rules
export const SCORING_RULES = {
  BASE_POINTS: {
    1: 10,
    2: 15,
    3: 20,
    4: 25,
    5: 30,
    6: 40
  },
  TIME_BONUS_MULTIPLIER: 0.1,
  STREAK_BONUS: 5
} as const;

// Achievement Thresholds
export const ACHIEVEMENT_THRESHOLDS = {
  FIRST_TEST: 1,
  SPEED_DEMON: 300, // Complete in under 5 minutes
  PERFECTIONIST: 100, // 100% accuracy
  PERSISTENT: 10, // 10 tests completed
  GENIUS: 140, // IQ score over 140
  MASTER: 160 // IQ score over 160
} as const;

// UI Constants
export const UI_CONSTANTS = {
  ANIMATION_DURATION: 300,
  TOAST_DURATION: 3000,
  CONFETTI_DURATION: 2000,
  PROGRESS_UPDATE_INTERVAL: 100
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: '/auth',
  USERS: '/users',
  QUESTIONS: '/questions',
  TESTS: '/tests',
  RESULTS: '/results',
  ACHIEVEMENTS: '/achievements',
  RANKINGS: '/rankings'
} as const;

// Supported Languages
export const SUPPORTED_LANGUAGES = ['vi', 'en', 'es'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]; 