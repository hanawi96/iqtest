# 🤝 Contributing to TestIQ

Thank you for your interest in contributing to TestIQ! We welcome contributions from everyone.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- PostgreSQL 14 or higher
- Redis 6 or higher
- Git

### Development Setup

1. **Fork the repository**
```bash
# Fork on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/iqtest.git
cd iqtest
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment**
```bash
cp env.example .env
# Edit .env with your local configuration
```

4. **Start development servers**
```bash
npm run dev
```

## 📝 Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) for clear and consistent commit messages:

### Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks
- `perf:` Performance improvements
- `ci:` CI/CD changes

### Examples
```bash
feat: add user authentication system
fix: resolve timer countdown issue
docs: update API documentation
style: format code with prettier
refactor: extract utility functions
test: add unit tests for IQ calculation
chore: update dependencies
```

## 🔧 Development Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 2. Make Changes
- Write clean, readable code
- Follow existing code style
- Add tests for new features
- Update documentation as needed

### 3. Test Your Changes
```bash
# Run all tests
npm test

# Run specific tests
npm run test:frontend
npm run test:backend

# Run linting
npm run lint
```

### 4. Commit Changes
```bash
git add .
git commit -m "feat: add your feature description"
```

### 5. Push and Create PR
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 🎯 Areas for Contribution

### 🐛 Bug Fixes
- Check [Issues](https://github.com/hanawi96/iqtest/issues) for bugs
- Reproduce the issue
- Fix and add tests
- Submit PR with clear description

### ✨ New Features
- Discuss major features in Issues first
- Follow existing patterns
- Add comprehensive tests
- Update documentation

### 📚 Documentation
- Improve README
- Add code comments
- Write API documentation
- Create tutorials

### 🧪 Testing
- Add unit tests
- Improve test coverage
- Add integration tests
- Performance testing

### 🎨 UI/UX Improvements
- Enhance user interface
- Improve accessibility
- Mobile responsiveness
- Performance optimizations

## 📋 Pull Request Guidelines

### Before Submitting
- [ ] Code follows project style guidelines
- [ ] Tests pass (`npm test`)
- [ ] No linting errors (`npm run lint`)
- [ ] Documentation updated if needed
- [ ] Commit messages follow convention

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Other (please describe)

## Testing
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes

## Additional Notes
Any additional context or notes
```

## 🏗️ Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type when possible

### React/Next.js
- Use functional components with hooks
- Follow React best practices
- Use proper prop types

### Styling
- Use Tailwind CSS classes
- Follow mobile-first approach
- Maintain consistent spacing

### Backend
- Follow NestJS conventions
- Use proper error handling
- Write comprehensive API documentation

## 🔍 Code Review Process

1. **Automated Checks**
   - All tests must pass
   - Linting must pass
   - Build must succeed

2. **Manual Review**
   - Code quality and style
   - Architecture decisions
   - Performance considerations
   - Security implications

3. **Feedback**
   - Address review comments
   - Update code as needed
   - Re-request review

## 🎉 Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Invited to join our Discord community

## 📞 Getting Help

- 💬 Join our [Discord](https://discord.gg/testiq)
- 📧 Email: dev@testiq.com
- 🐛 Create an [Issue](https://github.com/hanawi96/iqtest/issues)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to TestIQ! 🚀 