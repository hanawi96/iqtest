module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Type enum
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation changes
        'style',    // Code style changes (formatting, etc.)
        'refactor', // Code refactoring
        'perf',     // Performance improvements
        'test',     // Adding or updating tests
        'build',    // Build system or external dependencies
        'ci',       // CI/CD changes
        'chore',    // Other changes (maintenance, etc.)
        'revert',   // Revert previous commit
        'wip',      // Work in progress
        'config',   // Configuration changes
        'data',     // Database or data changes
        'ui',       // UI/UX improvements
        'i18n',     // Internationalization
        'security', // Security fixes
        'deploy',   // Deployment related
      ],
    ],
    
    // Scope enum for TestIQ project
    'scope-enum': [
      2,
      'always',
      [
        'frontend',
        'backend',
        'shared',
        'analytics',
        'database',
        'auth',
        'api',
        'ui',
        'ux',
        'game',
        'test',
        'user',
        'admin',
        'scoring',
        'achievements',
        'ranking',
        'questions',
        'results',
        'i18n',
        'performance',
        'security',
        'deploy',
        'docs',
        'config',
        'deps',
        'tools',
      ],
    ],
    
    // Subject case
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
    
    // Subject length
    'subject-max-length': [2, 'always', 100],
    'subject-min-length': [2, 'always', 3],
    
    // Subject empty
    'subject-empty': [2, 'never'],
    
    // Type case
    'type-case': [2, 'always', 'lower-case'],
    
    // Type empty
    'type-empty': [2, 'never'],
    
    // Scope case
    'scope-case': [2, 'always', 'lower-case'],
    
    // Header max length
    'header-max-length': [2, 'always', 120],
    
    // Body leading blank
    'body-leading-blank': [1, 'always'],
    
    // Footer leading blank
    'footer-leading-blank': [1, 'always'],
  },
  
  // Custom rules for TestIQ
  plugins: [
    {
      rules: {
        'testiq-ticket-reference': (parsed) => {
          const { subject } = parsed;
          if (subject && subject.includes('[TIQ-')) {
            return [true];
          }
          return [false, 'Commit should reference a TestIQ ticket [TIQ-XXX]'];
        },
      },
    },
  ],
  
  // Ignore certain commits
  ignores: [
    (commit) => commit.includes('WIP'),
    (commit) => commit.includes('wip'),
    (commit) => commit.includes('Initial commit'),
  ],
}; 