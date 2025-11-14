# A11y Code Detective 🔍

An interactive, accessible game designed to help developers test and improve their understanding of digital accessibility and WCAG compliance.

## 🎯 Overview

**A11y Code Detective** is an educational quiz game where developers review HTML/CSS code snippets containing accessibility issues, identify the problems, and learn how to fix them. The game itself is built to WCAG 2.1 AA standards, practicing what it teaches.

## ✨ Features

- **Three Difficulty Levels**

  - **Beginner**: Common accessibility issues (alt text, labels, headings)
  - **Intermediate**: ARIA patterns, live regions, and semantic HTML
  - **Advanced**: Complex patterns, WCAG compliance, and edge cases

- **30 Real-World Challenges**: Each question presents authentic code snippets with explanations and WCAG references

- **Fully Accessible**:

  - WCAG 2.1 AA compliant
  - Keyboard navigable
  - Screen reader friendly
  - Skip links and ARIA landmarks
  - Proper focus management
  - Accessible color contrast

- **Interactive Learning**:
  - Immediate feedback with detailed explanations
  - WCAG Success Criteria references
  - Score tracking and performance badges
  - Links to accessibility resources

## 🚀 Getting Started

### Installation

1. Clone or download this repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server with live-reload:

   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:3000`

The app will automatically reload when you make changes to the code!

### Build for Production

```bash
npm run build
```

The optimized files will be in the `dist` folder.

## 🎮 How to Play

1. **Choose Your Difficulty**: Select Beginner, Intermediate, or Advanced
2. **Review the Code**: Examine the code snippet for accessibility issues
3. **Answer the Question**: Select the best answer from the multiple choices
4. **Learn from Feedback**: Read detailed explanations and WCAG references
5. **Track Your Progress**: See your score and earn performance badges

## 📚 What You'll Learn

- **HTML Accessibility**: Semantic HTML, alt text, labels, headings
- **ARIA**: Roles, states, properties, and live regions
- **Keyboard Navigation**: Focus management, skip links, and interactive patterns
- **WCAG Compliance**: Understanding Success Criteria from Level A to AAA
- **Common Patterns**: Modals, accordions, tabs, menus, and more
- **Best Practices**: Color contrast, text sizing, motion preferences

## 🏗️ Project Structure

```plaintext
a11y-game/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── SkipLink.jsx
│   │   ├── StartScreen.jsx
│   │   ├── GameScreen.jsx
│   │   └── ResultsScreen.jsx
│   ├── data/
│   │   └── questions.js      # Question database (30 questions)
│   ├── App.jsx               # Main app component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles
├── index-react.html          # HTML entry point for React
├── vite.config.js           # Vite configuration
├── package.json
└── README.md
```

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks and functional components
- **Vite**: Lightning-fast build tool with HMR (Hot Module Replacement)
- **CSS3**: Modern CSS with custom properties, grid, and flexbox
- **JavaScript ES6+**: Clean, modern JavaScript
- **WCAG 2.1**: Following Web Content Accessibility Guidelines

## ♿ Accessibility Features

This game demonstrates accessibility best practices:

- **Semantic HTML**: Proper landmarks (`<header>`, `<main>`, `<footer>`, `<nav>`)
- **Skip Links**: Keyboard users can skip to main content
- **ARIA**: Proper use of roles, states, and properties
- **Focus Management**: Logical focus order and visible focus indicators
- **Screen Reader Support**: Announcements for dynamic content with `aria-live`
- **Keyboard Navigation**: Full keyboard access without mouse
- **Color Contrast**: All text meets WCAG AA contrast ratios
- **Responsive Design**: Works on all screen sizes
- **Progress Indicators**: `role="progressbar"` with proper attributes

## 🎓 Educational Resources

The game links to these resources for continued learning:

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [The A11Y Project](https://www.a11yproject.com/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)

## 🤝 Contributing

Contributions are welcome! Here are ways to contribute:

- Add new questions to the question database
- Improve explanations or WCAG references
- Enhance styling or animations
- Report bugs or suggest features
- Fix accessibility issues (ironic, but let's practice!)

## 📝 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Built with accessibility in mind for the developer community
- Inspired by the need for better accessibility education
- WCAG guidelines from the W3C Web Accessibility Initiative

## 🐛 Known Issues

None currently! If you find any accessibility issues, please report them.

## 📧 Contact

Questions or feedback? Open an issue or submit a pull request!

---

**Remember**: Accessibility is not a feature—it's a fundamental requirement. Happy learning! 🎉
