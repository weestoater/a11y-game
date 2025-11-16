# Accessibility Issues Identified by Axe Testing

This document summarizes the accessibility violations found by automated testing using [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright).

## Summary

**Test Run Date**: Current  
**Test Suite**: `e2e/axe-accessibility.spec.js`  
**Tests Run**: 12  
**Tests Passed**: 8  
**Tests Failed**: 4  
**Issue Type**: Color Contrast (WCAG 2.1 Level AA)

## Critical Issues (Must Fix)

### 1. Timer Badge - Critical Contrast Failure

**Location**: Game Screen  
**Element**: `.badge.bg-info` (Time display)  
**Current Contrast**: 1.95:1  
**Required**: 4.5:1 (WCAG AA)  
**Severity**: Serious

**Current Colors**:

- Foreground: `#ffffff` (white text)
- Background: `#0dcaf0` (Bootstrap info/cyan)

**Fix Options**:

1. Change to `bg-dark` class (high contrast)
2. Use custom background color with better contrast
3. Use `bg-primary` or `bg-secondary` instead

```jsx
// Current (FAILS)
<div className="badge bg-info fs-6 p-2">Time: {formatTime(elapsedTime)}</div>

// Fix Option 1 (PASSES)
<div className="badge bg-dark fs-6 p-2">Time: {formatTime(elapsedTime)}</div>

// Fix Option 2 (PASSES)
<div className="badge bg-primary fs-6 p-2">Time: {formatTime(elapsedTime)}</div>
```

---

### 2. Intermediate Difficulty Title - Contrast Failure

**Location**: Start Screen  
**Element**: Intermediate difficulty card title  
**Current Contrast**: 2.96:1  
**Required**: 3:1 (WCAG AA for large text 24px)  
**Severity**: Serious

**Current Colors**:

- Foreground: `#cc8800` (custom gold/orange)
- Background: `#ffffff` (white)

**Fix Options**:

1. Darken the gold color to `#996600` or darker
2. Use a different color with better contrast
3. Keep border but use default text color

```jsx
// Current (FAILS)
<h4 className="card-title" style={{ color: 'rgb(204, 136, 0)' }}>
  Intermediate
</h4>

// Fix Option 1 (PASSES) - Darker gold
<h4 className="card-title" style={{ color: '#996600' }}>
  Intermediate
</h4>

// Fix Option 2 (PASSES) - Use Bootstrap warning text
<h4 className="card-title text-warning">
  Intermediate
</h4>
```

---

## Moderate Issues (Should Fix)

### 3. Bootstrap Outline Buttons - Contrast Near Threshold

**Location**: Start Screen, SID Screen  
**Elements**: WCAG version buttons, View Leaderboard button  
**Current Contrast**: 4.26:1  
**Required**: 4.5:1 (WCAG AA)  
**Severity**: Serious

**Affected Elements**:

- WCAG 2.1 button (`.btn-outline-primary`)
- WCAG 2.2 button (`.btn-outline-primary`)
- View Leaderboard button (`.btn-outline-primary`)

**Current Colors**:

- Foreground: `#0d6efd` (Bootstrap primary blue)
- Background: `#f8f9fa` (light gray body background)

**Fix Options**:

1. Darken the primary color slightly
2. Change button style to solid (`.btn-primary`)
3. Use custom CSS to meet contrast requirements

```jsx
// Current (FAILS by 0.24 points)
<button className="btn btn-outline-primary">WCAG 2.1</button>

// Fix Option 1 (PASSES) - Use solid buttons
<button className="btn btn-primary">WCAG 2.1</button>

// Fix Option 2 (PASSES) - Custom dark blue
<button className="btn btn-outline-primary" style={{
  borderColor: '#0055cc',
  color: '#0055cc'
}}>
  WCAG 2.1
</button>
```

---

## Additional Findings

### Color Contrast Test - WCAG AAA (Enhanced)

**Test**: `should check color contrast on all screens`  
**Status**: Failed (Expected behavior)  
**Note**: This test checks WCAG AAA (7:1 ratio) which is more stringent than WCAG AA (4.5:1)

The failures in this test are **informational only** since the application targets WCAG 2.1 Level AA, not AAA. However, improving contrast to AAA levels would benefit users with low vision.

**Elements that pass AA but fail AAA**:

- Skip link: 5.56:1 (passes AA, fails AAA)
- Header tagline: 4.5:1 (passes AA, fails AAA)
- Form help text: 6.72:1 (passes AA, fails AAA)
- Primary buttons: 4.5:1 (passes AA, fails AAA)

---

## Recommended Action Plan

### Priority 1 (Must Fix for WCAG AA Compliance)

1. ✅ Fix Timer badge contrast (1.95 → 4.5+)

   - Change from `bg-info` to `bg-dark` or `bg-primary`
   - File: `src/components/GameScreen.jsx`

2. ✅ Fix Intermediate title contrast (2.96 → 3.0+)

   - Use darker gold `#996600` or Bootstrap `text-warning`
   - File: `src/components/StartScreen.jsx`

3. ✅ Fix outline button contrast (4.26 → 4.5+)
   - Change to solid `.btn-primary` or custom darker blue
   - Files: `src/components/StartScreen.jsx`, `src/components/SIDScreen.jsx`

### Priority 2 (Nice to Have for WCAG AAA)

- Consider increasing contrast on all elements to meet 7:1 ratio
- This would benefit users with low vision
- Not required for WCAG 2.1 Level AA compliance

---

## Testing Commands

Run axe accessibility tests:

```bash
# Run all axe tests
npx playwright test axe-accessibility.spec.js --project=chromium

# Run specific test
npx playwright test axe-accessibility.spec.js:5 --project=chromium

# Run with headed browser to see issues
npx playwright test axe-accessibility.spec.js --headed --project=chromium
```

---

## Resources

- [WCAG 2.1 Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Axe DevTools](https://www.deque.com/axe/devtools/)
- [Bootstrap Color System](https://getbootstrap.com/docs/5.3/customize/color/)
