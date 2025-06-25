// 🛠️ TestIQ Shared Utils

/**
 * Calculate IQ score based on correct answers and difficulty
 */
export function calculateIQScore(
  correctAnswers: number,
  totalQuestions: number,
  averageDifficulty: number
): number {
  const accuracy = correctAnswers / totalQuestions;
  const baseScore = 100;
  const difficultyMultiplier = averageDifficulty * 10;
  
  return Math.round(baseScore + (accuracy - 0.5) * difficultyMultiplier);
}

/**
 * Format time in minutes and seconds
 */
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Get difficulty color
 */
export function getDifficultyColor(level: number): string {
  const colors = {
    1: '#10B981', // Easy - Green
    2: '#3B82F6', // Normal - Blue
    3: '#F59E0B', // Medium - Yellow
    4: '#EF4444', // Hard - Red
    5: '#8B5CF6', // Expert - Purple
    6: '#EC4899'  // Master - Pink
  };
  return colors[level as keyof typeof colors] || '#6B7280';
}

/**
 * Sleep utility for async operations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
} 