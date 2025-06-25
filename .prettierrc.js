module.exports = {
  // Formatting options
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  
  // Line handling
  endOfLine: 'lf',
  
  // Bracket handling
  bracketSpacing: true,
  bracketSameLine: false,
  
  // Arrow function parentheses
  arrowParens: 'avoid',
  
  // HTML formatting
  htmlWhitespaceSensitivity: 'css',
  
  // Override for specific file types
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 120,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 100,
        proseWrap: 'preserve',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser: 'typescript',
      },
    },
    {
      files: '*.css',
      options: {
        printWidth: 120,
      },
    },
  ],
}; 