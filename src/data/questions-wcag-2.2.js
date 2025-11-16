// WCAG 2.2 Specific Questions
// New success criteria introduced in WCAG 2.2

export const wcag22Questions = {
  beginner: [
    {
      id: 101,
      title: "Focus Not Obscured (Minimum)",
      code: `<div style="position: sticky; top: 0; z-index: 1000;">
  <header>Sticky Header</header>
</div>
<main>
  <button>Click me</button>
</main>`,
      question: "What WCAG 2.2 issue might this create?",
      options: [
        "Sticky header might obscure focused elements",
        "Missing z-index on button",
        "Header should not be sticky",
        "Button needs more padding",
      ],
      correctAnswer: 0,
      explanation:
        "WCAG 2.2 requires that when an item receives keyboard focus, it's not entirely hidden by author-created content (like sticky headers or footers). Ensure focused elements are at least partially visible (Level AA) or entirely visible (Level AAA).",
      wcagReference:
        "WCAG 2.2 Success Criterion 2.4.11 Focus Not Obscured (Minimum) (Level AA)",
      wcagVersion: "2.2",
    },
    {
      id: 102,
      title: "Accessible Authentication",
      code: `<form>
  <label for="password">Password:</label>
  <input type="password" id="password">
  <p>Enter characters 3, 7, and 12</p>
</form>`,
      question: "What WCAG 2.2 authentication issue exists?",
      options: [
        "Requires cognitive function test (remembering specific character positions)",
        "Password field should be type='text'",
        "Missing submit button",
        "Label should be bold",
      ],
      correctAnswer: 0,
      explanation:
        "WCAG 2.2 prohibits authentication methods that require cognitive function tests unless alternatives are provided. Asking users to remember and enter specific character positions from passwords creates barriers for users with cognitive disabilities. Offer password managers, copy-paste, or alternative authentication.",
      wcagReference:
        "WCAG 2.2 Success Criterion 3.3.8 Accessible Authentication (Minimum) (Level AA)",
      wcagVersion: "2.2",
    },
  ],

  intermediate: [
    {
      id: 111,
      title: "Dragging Movements",
      code: `<div draggable="true" ondrag="handleDrag()">
  Reorder by dragging
</div>`,
      question: "What's required by WCAG 2.2 for dragging functionality?",
      options: [
        "Provide alternative single-pointer method (buttons/controls)",
        "Add touch events",
        "Use CSS transform instead",
        "Add aria-grabbed attribute",
      ],
      correctAnswer: 0,
      explanation:
        "WCAG 2.2 requires that functionality using dragging movements has a single-pointer alternative (like up/down buttons). This helps users with motor disabilities, those using switch controls, or voice input who cannot perform dragging gestures.",
      wcagReference:
        "WCAG 2.2 Success Criterion 2.5.7 Dragging Movements (Level AA)",
      wcagVersion: "2.2",
    },
    {
      id: 112,
      title: "Redundant Entry",
      code: `<form>
  <input name="email" required>
  <!-- Later in same process -->
  <input name="confirm-email" required>
</form>`,
      question: "How can we improve this per WCAG 2.2?",
      options: [
        "Auto-fill or allow copy-paste for redundant information",
        "Remove email confirmation",
        "Add more fields",
        "Use different field names",
      ],
      correctAnswer: 0,
      explanation:
        "WCAG 2.2 requires that information previously entered by the user is auto-populated or available for selection, unless re-entry is essential for security or the information is no longer valid. This helps users with cognitive disabilities and memory issues.",
      wcagReference:
        "WCAG 2.2 Success Criterion 3.3.7 Redundant Entry (Level A)",
      wcagVersion: "2.2",
    },
  ],

  advanced: [
    {
      id: 121,
      title: "Focus Appearance",
      code: `a:focus {
  outline: 1px solid gray;
}`,
      question: "What WCAG 2.2 Level AAA issue exists?",
      options: [
        "Focus indicator too small/low contrast (needs 2px + 3:1 ratio)",
        "Should use border instead",
        "Gray is not allowed",
        "Should use box-shadow",
      ],
      correctAnswer: 0,
      explanation:
        "WCAG 2.2 Level AAA requires focus indicators to have minimum area of 2 CSS pixels (perimeter or 1px thickness around component) AND 3:1 contrast ratio against adjacent colors. This ensures visible focus for users with low vision.",
      wcagReference:
        "WCAG 2.2 Success Criterion 2.4.13 Focus Appearance (Level AAA)",
      wcagVersion: "2.2",
    },
    {
      id: 122,
      title: "Consistent Help",
      code: `<!-- Page 1 -->
<footer>
  <a href="/help">Help</a>
</footer>

<!-- Page 2 -->
<header>
  <a href="/support">Support</a>
</header>`,
      question: "What WCAG 2.2 consistency issue exists?",
      options: [
        "Help mechanism location/order should be consistent",
        "Links should have same text",
        "Should be in sidebar",
        "Should use buttons instead",
      ],
      correctAnswer: 0,
      explanation:
        "WCAG 2.2 Level A requires help mechanisms to appear in the same relative order across pages. If help is in the footer on one page, it should be in footer on all pages. This helps users with cognitive disabilities find help consistently.",
      wcagReference:
        "WCAG 2.2 Success Criterion 3.2.6 Consistent Help (Level A)",
      wcagVersion: "2.2",
    },
  ],
};
