# Testing Documentation

## Test Coverage Summary

### Unit Tests (Vitest + React Testing Library)

- **Total Tests**: 81
- **Coverage**: 99.16% overall, 100% line coverage
- **Status**: ✅ All passing

Run unit tests:

```bash
npm test                 # Run once
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage report
```

### E2E Tests (Playwright)

- **Total Tests**: 66 tests across 6 test suites
- **Status**: 52 passing, 14 failing
- **Browser Coverage**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari

Run E2E tests:

```bash
npm run test:e2e              # Run all E2E tests
npm run test:e2e:ui           # Run with UI mode
npm run test:e2e:headed       # Run with visible browser
npm run test:e2e:debug        # Run in debug mode
npm run test:e2e:chromium     # Run on Chromium only
npm run test:e2e:report       # Show last HTML report
```

## Test Suite Breakdown

### ✅ Game Flow Tests (7/7 passing)

Located in `e2e/game-flow.spec.js`

- Complete WCAG 2.1 beginner game flow
- WCAG 2.2 question flow
- Multiple difficulty levels
- Combined WCAG 2.1 & 2.2
- Timer tracking during game
- Progress bar display
- WCAG references in feedback

### ✅ SID Validation Tests (13/13 passing)

Located in `e2e/sid-validation.spec.js`

- Valid SID format acceptance (letter + 6 digits)
- Various valid formats (A000000, Z999999, etc.)
- Rejection of invalid formats
- Input length limiting (maxLength=7)
- Empty SID rejection
- Special character rejection
- Auto-uppercase lowercase letters
- Keyboard support (Enter key)
- Focus management
- Accessible error messages
- Placeholder text

### ✅ Accessibility Tests (13/13 passing)

Located in `e2e/accessibility.spec.js`

**Keyboard Navigation** (6 tests):

- SID screen keyboard navigation
- Start screen keyboard navigation
- Answering questions with keyboard only
- Visible focus indicators
- Skip link support
- Focus maintenance after form submission

**Screen Reader Support** (5 tests):

- ARIA landmarks (main, header, footer)
- Proper heading hierarchy
- aria-labels on interactive elements
- Live region announcements
- Accessible form labels

**Color Contrast** (2 tests):

- Sufficient contrast on buttons
- Visible focus indicators with contrast

### ⚠️ Leaderboard Tests (2/9 passing)

Located in `e2e/leaderboard.spec.js`

**Passing**:

- Empty leaderboard display
- Navigation to leaderboard

**Failing** (needs investigation):

- Score saving after game completion
- Difficulty tabs display/switching
- Export to Excel functionality
- Score details display
- Back navigation from leaderboard
- localStorage persistence across reloads

**Note**: These failures may be due to timing issues or missing UI elements in the leaderboard component.

### ⚠️ Responsive Design Tests (2/4 passing)

Located in `e2e/responsive.spec.js`

**Passing**:

- Tablet layout (768x1024)
- Touch target sizes (minimum 44px)

**Failing**:

- Mobile layout tests (375x667)
- Desktop centering tests (1920x1080)

**Note**: May need viewport configuration adjustments.

### ⚠️ Axe Accessibility Tests (8/12 passing)

Located in `e2e/axe-accessibility.spec.js`

Uses [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright) for automated accessibility scanning.

**Passing**:

- SID screen accessibility scan
- Leaderboard screen scan
- WCAG 2.1 Level AA compliance
- Best practices compliance
- Third-party content exclusion
- Form labels and ARIA attributes
- Keyboard navigation accessibility
- Detailed violation reporting

**Failing (Color Contrast Issues Detected)**:

- **Start Screen**: 4 elements with insufficient contrast
  - WCAG version buttons: 4.26:1 (need 4.5:1)
  - Intermediate difficulty title: 2.96:1 (need 3:1)
  - View Leaderboard button: 4.26:1 (need 4.5:1)
- **Game Screen**: Timer badge has 1.95:1 contrast (need 4.5:1)
- **Results Screen**: Navigation test issue
- **Color test**: Tests WCAG AAA (7:1) instead of AA (4.5:1)

**Color Contrast Violations Found**:

1. **Bootstrap Primary buttons** (#0d6efd on #f8f9fa): 4.26:1 ratio

   - Affected: WCAG version buttons, View Leaderboard button
   - Required: 4.5:1 for WCAG AA
   - Fix: Darken button color or change background

2. **Intermediate difficulty title** (#cc8800 on #ffffff): 2.96:1 ratio

   - Required: 3:1 for large text (24px)
   - Fix: Use darker gold/orange color

3. **Timer badge** (bg-info class, #ffffff on #0dcaf0): 1.95:1 ratio
   - Required: 4.5:1 for WCAG AA
   - Fix: Change to bg-dark or use custom color with better contrast

## Known Issues & Next Steps

### Immediate Fixes Needed:

1. **Color Contrast Issues** (Identified by Axe):

   - Fix Bootstrap outline-primary button contrast (4.26 → 4.5+)
   - Fix Intermediate difficulty title color (2.96 → 3.0+)
   - Fix Timer badge bg-info class (1.95 → 4.5+)
   - Consider using darker Bootstrap variants or custom colors

2. **Leaderboard Tests**: Investigate why leaderboard elements are not being found

   - Check if leaderboard component is rendering correctly
   - Verify localStorage implementation
   - Check difficulty tab selectors

3. **Responsive Tests**: Review viewport-specific assertions

   - Mobile layout may need different selectors
   - Desktop centering tests may have incorrect bounding box expectations

4. **Cross-Browser Testing**: Currently only tested on Chromium
   - Run full suite on Firefox, WebKit
   - Test mobile viewports (Mobile Chrome, Mobile Safari)

### Test Improvements:

- Add visual regression testing with screenshots
- Implement custom matchers for common accessibility patterns
- Add performance testing (Core Web Vitals)
- Set up CI/CD pipeline for automated testing

## Test Architecture

### Unit Tests

- **Framework**: Vitest 4.0.9
- **Component Testing**: @testing-library/react 16.3.0
- **DOM Testing**: @testing-library/jest-dom 6.9.1
- **Environment**: jsdom 27.2.0
- **Coverage**: @vitest/coverage-v8 4.0.9

**Test Files**:

- `src/components/__tests__/Header.test.jsx` (5 tests)
- `src/components/__tests__/Footer.test.jsx` (4 tests)
- `src/components/__tests__/SIDScreen.test.jsx` (6 tests)
- `src/components/__tests__/StartScreen.test.jsx` (12 tests)
- `src/utils/__tests__/leaderboard.test.js` (16 tests)
- `src/data/__tests__/questionManager.test.js` (38 tests)

### E2E Tests

- **Framework**: @playwright/test (latest)
- **Accessibility Testing**: @axe-core/playwright (for automated a11y scans)
- **Browsers**: Chromium, Firefox, WebKit
- **Viewports**: Desktop, Mobile Chrome (Pixel 5), Mobile Safari (iPhone 12)
- **Configuration**: `playwright.config.js`

**Test Files**:

- `e2e/game-flow.spec.js` (7 tests)
- `e2e/sid-validation.spec.js` (13 tests)
- `e2e/accessibility.spec.js` (13 tests)
- `e2e/axe-accessibility.spec.js` (12 tests - **NEW**)
- `e2e/leaderboard.spec.js` (9 tests)
- `e2e/responsive.spec.js` (4 tests - mobile, tablet, desktop)

## CI/CD Integration (Planned)

Recommended test execution order:

1. Unit tests (fast feedback)
2. E2E tests on Chromium (primary browser)
3. E2E tests on Firefox/WebKit (on PRs/main branch)
4. Cross-browser mobile tests (on release)

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
