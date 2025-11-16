// WCAG 2.1 Questions Database
// Contains all questions specific to WCAG 2.1 Success Criteria

export const wcag21Questions = {
  beginner: [
    {
      id: 1,
      title: "Missing Alt Text",
      code: `<img src="profile-photo.jpg">`,
      question: "What accessibility issue exists in this image element?",
      options: [
        "Missing alt attribute for screen readers",
        "Wrong image format",
        "Missing width and height attributes",
        "Image source is incorrect",
      ],
      correctAnswer: 0,
      explanation:
        'Images must have alt attributes to provide alternative text for screen readers. Even decorative images should have an empty alt attribute (alt="") to indicate they\'re decorative.',
      wcagReference:
        "WCAG 2.1 Success Criterion 1.1.1 Non-text Content (Level A)",
      wcagVersion: "2.1",
    },
    {
      id: 2,
      title: "Button Accessibility",
      code: `<div onclick="submitForm()">Submit</div>`,
      question: "What's wrong with this clickable element?",
      options: [
        "It should use a <button> or <a> element instead",
        "The function name is too long",
        "Missing CSS styling",
        "The text should be uppercase",
      ],
      correctAnswer: 0,
      explanation:
        "Clickable elements should use semantic HTML like <button> or <a> tags. These provide keyboard accessibility and proper screen reader announcements by default. Divs with click handlers are not keyboard accessible and don't convey their purpose to assistive technology.",
      wcagReference:
        "WCAG 2.1 Success Criterion 4.1.2 Name, Role, Value (Level A)",
      wcagVersion: "2.1",
    },
    {
      id: 3,
      title: "Form Label Missing",
      code: `<input type="text" placeholder="Enter your email">`,
      question: "What critical accessibility feature is missing?",
      options: [
        "Missing associated <label> element",
        "Input type should be 'email'",
        "Missing maxlength attribute",
        "Placeholder text is too short",
      ],
      correctAnswer: 0,
      explanation:
        'Form inputs must have associated labels using the <label> element. Placeholders disappear when typing and aren\'t accessible to all assistive technologies. Use <label for="id"> with a matching input id, or wrap the input in a <label> tag.',
      wcagReference:
        "WCAG 2.1 Success Criterion 3.3.2 Labels or Instructions (Level A)",
      wcagVersion: "2.1",
    },
    {
      id: 4,
      title: "Heading Hierarchy",
      code: `<h1>Main Title</h1>\n<h3>Subsection</h3>`,
      question: "What's wrong with this heading structure?",
      options: [
        "Skipped heading level (h2 should come before h3)",
        "h3 text should be longer",
        "Should use all h1 tags",
        "Nothing is wrong",
      ],
      correctAnswer: 0,
      explanation:
        "Heading levels should not skip levels. Going from h1 to h3 skips h2. Screen reader users rely on proper heading hierarchy to navigate and understand content structure. Always increment heading levels by one.",
      wcagReference:
        "WCAG 2.1 Success Criterion 1.3.1 Info and Relationships (Level A)",
      wcagVersion: "2.1",
    },
    {
      id: 5,
      title: "Link Purpose",
      code: `<a href="/terms">Click here</a> to read our terms.`,
      question: "What makes this link inaccessible?",
      options: [
        "Link text 'Click here' is not descriptive",
        "Missing target attribute",
        "URL should be absolute, not relative",
        "Missing title attribute",
      ],
      correctAnswer: 0,
      explanation:
        "Link text should be descriptive and make sense out of context. Screen reader users often navigate by links alone. 'Click here' doesn't explain the link's purpose. Use 'Read our terms' or 'Terms of Service' instead.",
      wcagReference:
        "WCAG 2.1 Success Criterion 2.4.4 Link Purpose (In Context) (Level A)",
      wcagVersion: "2.1",
    },
    {
      id: 6,
      title: "Color Contrast",
      code: `<p style="color: #ccc; background: white;">
  Important message
</p>`,
      question: "What accessibility issue does this styling create?",
      options: [
        "Insufficient color contrast ratio",
        "Font size is missing",
        "Background should be transparent",
        "Inline styles should be avoided",
      ],
      correctAnswer: 0,
      explanation:
        "Light gray (#ccc) on white background has poor contrast. WCAG requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. Low contrast makes content hard to read for users with low vision or color blindness.",
      wcagReference:
        "WCAG 2.1 Success Criterion 1.4.3 Contrast (Minimum) (Level AA)",
      wcagVersion: "2.1",
    },
    {
      id: 7,
      title: "Language Declaration",
      code: `<html>\n  <head><title>My Site</title></head>\n  <body>Welcome</body>\n</html>`,
      question: "What's missing from this HTML document?",
      options: [
        "lang attribute on the <html> tag",
        "DOCTYPE declaration",
        "Meta viewport tag",
        "Character encoding",
      ],
      correctAnswer: 0,
      explanation:
        'The <html> tag should include a lang attribute (e.g., lang="en") to specify the document\'s language. This helps screen readers pronounce content correctly and browsers provide appropriate language-specific features.',
      wcagReference:
        "WCAG 2.1 Success Criterion 3.1.1 Language of Page (Level A)",
      wcagVersion: "2.1",
    },
    {
      id: 8,
      title: "Table Headers",
      code: `<table>
  <tr>
    <td>Name</td>
    <td>Age</td>
  </tr>
  <tr>
    <td>John</td>
    <td>25</td>
  </tr>
</table>`,
      question: "How can we improve table accessibility?",
      options: [
        "Use <th> elements for header cells",
        "Add more rows",
        "Use <div> instead of <table>",
        'Add border="1" attribute',
      ],
      correctAnswer: 0,
      explanation:
        'Table headers should use <th> elements, not <td>. This allows screen readers to associate data cells with their headers. For complex tables, also use scope="col" or scope="row" attributes to clarify relationships.',
      wcagReference:
        "WCAG 2.1 Success Criterion 1.3.1 Info and Relationships (Level A)",
      wcagVersion: "2.1",
    },
    {
      id: 9,
      title: "Focus Indicator",
      code: `button:focus {
  outline: none;
}`,
      question: "What critical accessibility issue does this CSS create?",
      options: [
        "Removes the keyboard focus indicator",
        "Buttons should use border, not outline",
        "Focus should use background color only",
        "Nothing is wrong",
      ],
      correctAnswer: 0,
      explanation:
        "Removing the focus outline (outline: none) makes it impossible for keyboard users to see which element has focus. If you customize focus styles, always provide a visible alternative indicator with sufficient contrast.",
      wcagReference:
        "WCAG 2.1 Success Criterion 2.4.7 Focus Visible (Level AA)",
      wcagVersion: "2.1",
    },
    {
      id: 10,
      title: "Icon Button",
      code: `<button>
  <i class="icon-delete"></i>
</button>`,
      question: "What's missing from this icon-only button?",
      options: [
        "Accessible text label (visually hidden or aria-label)",
        "title attribute on the <i> tag",
        "onclick handler",
        "CSS class on the button",
      ],
      correctAnswer: 0,
      explanation:
        'Icon-only buttons need accessible text labels. Use aria-label="Delete" on the button, or include visually hidden text. Screen reader users need to know what the button does since they can\'t see the icon.',
      wcagReference:
        "WCAG 2.1 Success Criterion 4.1.2 Name, Role, Value (Level A)",
      wcagVersion: "2.1",
    },
  ],

  intermediate: [
    {
      id: 11,
      title: "ARIA Label Usage",
      code: `<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>
<nav>
  <ul>
    <li><a href="/sitemap">Sitemap</a></li>
  </ul>
</nav>`,
      question:
        "What should be added to distinguish these navigation landmarks?",
      options: [
        "aria-label or aria-labelledby on each <nav>",
        'role="navigation" attribute',
        "Different class names",
        "id attributes",
      ],
      correctAnswer: 0,
      explanation:
        'When multiple landmarks of the same type exist, each needs a unique label. Use aria-label="Main navigation" and aria-label="Footer navigation" (or aria-labelledby referencing heading IDs) so screen reader users can distinguish between them.',
      wcagReference: "WCAG 2.1 Success Criterion 2.4.1 Bypass Blocks (Level A)",
      wcagVersion: "2.1",
    },
    {
      id: 12,
      title: "Live Regions",
      code: `<div id="status"></div>

<script>
document.getElementById('status')
  .textContent = 'Form submitted successfully!';
</script>`,
      question:
        "How can we announce dynamic content changes to screen readers?",
      options: [
        'Add aria-live="polite" to the status div',
        "Use alert() instead",
        'Add role="status" only',
        "Use console.log()",
      ],
      correctAnswer: 0,
      explanation:
        'Dynamic content changes need aria-live regions to be announced to screen readers. Use aria-live="polite" for non-urgent updates or aria-live="assertive" for important alerts. You can also use role="status" or role="alert" which have implicit live region behavior.',
      wcagReference:
        "WCAG 2.1 Success Criterion 4.1.3 Status Messages (Level AA)",
      wcagVersion: "2.1",
    },
    {
      id: 13,
      title: "Modal Dialog",
      code: `<div class="modal">
  <h2>Confirm Action</h2>
  <button>OK</button>
  <button>Cancel</button>
</div>`,
      question: "What's missing for proper modal accessibility?",
      options: [
        'role="dialog", aria-modal="true", and focus management',
        "z-index CSS property",
        "transition animation",
        "overlay background",
      ],
      correctAnswer: 0,
      explanation:
        'Accessible modals need: role="dialog", aria-modal="true", aria-labelledby (referencing the title), focus trap (keyboard navigation contained), initial focus management, and Escape key to close. Background content should be inert when modal is open.',
      wcagReference: "WCAG 2.1 Success Criterion 2.4.3 Focus Order (Level A)",
      wcagVersion: "2.1",
    },
    {
      id: 14,
      title: "Form Validation",
      code: `<input type="email" id="email" required>
<span class="error" style="color: red;">
  Invalid email
</span>`,
      question: "How can we make error messages more accessible?",
      options: [
        "Link error to input with aria-describedby",
        "Use bigger font size",
        "Add an icon",
        "Use bold text",
      ],
      correctAnswer: 0,
      explanation:
        'Error messages should be programmatically associated with their inputs using aria-describedby. Also use aria-invalid="true" on the invalid input. Don\'t rely on color alone—include text and icons. Consider using aria-live for dynamic errors.',
      wcagReference:
        "WCAG 2.1 Success Criterion 3.3.1 Error Identification (Level A)",
      wcagVersion: "2.1",
    },
    {
      id: 15,
      title: "Custom Checkbox",
      code: `<div class="checkbox" onclick="toggle()">
  <span class="box"></span>
  Accept terms
</div>`,
      question: "What's the best way to make this custom checkbox accessible?",
      options: [
        'Use native <input type="checkbox"> and style it',
        'Add tabindex="0" to the div',
        'Use role="checkbox" on the div',
        'Add aria-label="checkbox"',
      ],
      correctAnswer: 0,
      explanation:
        'Use native HTML <input type="checkbox"> elements and visually hide them, then style a custom appearance with CSS. Native inputs provide keyboard support, form integration, and accessibility for free. If you must use a custom element, implement full ARIA checkbox pattern with role, aria-checked, and keyboard handling.',
      wcagReference:
        "WCAG 2.1 Success Criterion 4.1.2 Name, Role, Value (Level A)",
      wcagVersion: "2.1",
    },
    {
      id: 16,
      title: "Skip Navigation",
      code: `<header>
  <nav>
    <!-- 50 navigation links -->
  </nav>
</header>
<main>
  <h1>Content</h1>
</main>`,
      question: "What should be added to help keyboard users?",
      options: [
        "Skip link to jump to main content",
        "More navigation links",
        "Back to top button",
        "Breadcrumb navigation",
      ],
      correctAnswer: 0,
      explanation:
        "Add a 'Skip to main content' link as the first focusable element. It can be visually hidden until focused. This allows keyboard users to bypass repetitive navigation. The link should jump to the <main> element or the main content area.",
      wcagReference: "WCAG 2.1 Success Criterion 2.4.1 Bypass Blocks (Level A)",
      wcagVersion: "2.1",
    },
    {
      id: 17,
      title: "Accordion Pattern",
      code: `<div class="accordion">
  <h3 onclick="togglePanel()">Section 1</h3>
  <div class="panel">Content...</div>
</div>`,
      question: "What ARIA attributes are needed for an accessible accordion?",
      options: [
        "aria-expanded and aria-controls on header, id on panel",
        "aria-hidden on panel only",
        'role="accordion" on container',
        "aria-label on all elements",
      ],
      correctAnswer: 0,
      explanation:
        'Accordion headers need: <button> element (not heading click), aria-expanded="true/false", aria-controls="panelId". The panel needs an id. Header can be wrapped in heading tag. Ensure keyboard support (Enter/Space to toggle, arrow keys for navigation).',
      wcagReference:
        "WCAG 2.1 Success Criterion 4.1.2 Name, Role, Value (Level A)",
      wcagVersion: "2.1",
    },
    {
      id: 18,
      title: "Image Link",
      code: `<a href="/profile">
  <img src="avatar.jpg" alt="">
</a>`,
      question: "What's wrong with this image link?",
      options: [
        "Empty alt text—image is the only link content",
        "Missing title attribute",
        "Should use background-image instead",
        'Link should have target="_blank"',
      ],
      correctAnswer: 0,
      explanation:
        'When an image is the only content in a link, its alt text must describe the link\'s destination/purpose, not be empty. Empty alt is only for decorative images. This should be alt="View profile" or similar.',
      wcagReference:
        "WCAG 2.1 Success Criterion 2.4.4 Link Purpose (In Context) (Level A)",
      wcagVersion: "2.1",
    },
    {
      id: 19,
      title: "Tab Panel",
      code: `<div class="tabs">
  <button>Tab 1</button>
  <button>Tab 2</button>
</div>
<div class="panels">
  <div>Panel 1 content</div>
  <div>Panel 2 content</div>
</div>`,
      question: "What ARIA pattern should be implemented for tabs?",
      options: [
        'role="tablist", role="tab", role="tabpanel" with proper attributes',
        'role="navigation" only',
        "aria-label on everything",
        "No ARIA needed",
      ],
      correctAnswer: 0,
      explanation:
        'Tabs need: container with role="tablist", buttons with role="tab" and aria-selected, panels with role="tabpanel" and aria-labelledby. Include aria-controls linking tab to panel. Implement keyboard navigation (arrow keys, Home, End).',
      wcagReference:
        "WCAG 2.1 Success Criterion 4.1.2 Name, Role, Value (Level A)",
      wcagVersion: "2.1",
    },
    {
      id: 20,
      title: "Visually Hidden Text",
      code: `<style>
.sr-only {
  display: none;
}
</style>
<button>
  <span class="sr-only">Delete</span>
  <i class="icon-trash"></i>
</button>`,
      question: "What's wrong with this visually hidden text implementation?",
      options: [
        "display: none removes it from screen readers too",
        "Should use visibility: hidden",
        "Class name is wrong",
        "Nothing is wrong",
      ],
      correctAnswer: 0,
      explanation:
        "display: none and visibility: hidden remove content from screen readers. For visually hidden text, use: position: absolute; left: -10000px; or clip-path techniques. This keeps content in the accessibility tree while hiding it visually.",
      wcagReference:
        "WCAG 2.1 Success Criterion 4.1.2 Name, Role, Value (Level A)",
      wcagVersion: "2.1",
    },
  ],

  advanced: [
    {
      id: 21,
      title: "Complex Data Table",
      code: `<table>
  <thead>
    <tr>
      <th>Q1</th>
      <th>Q2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Revenue</th>
      <td>$100k</td>
      <td>$120k</td>
    </tr>
  </tbody>
</table>`,
      question: "What's needed for complex table accessibility?",
      options: [
        'scope="col" and scope="row" attributes on headers',
        "More CSS styling",
        "colspan attributes",
        'role="grid" on table',
      ],
      correctAnswer: 0,
      explanation:
        'Complex tables with both row and column headers need scope attributes: scope="col" for column headers, scope="row" for row headers. Very complex tables may need headers attribute with space-separated header IDs. Also consider using <caption> to describe the table.',
      wcagReference:
        "WCAG 2.1 Success Criterion 1.3.1 Info and Relationships (Level A)",
      wcagVersion: "2.1",
    },
    {
      id: 22,
      title: "Focus Management in SPA",
      code: `// React route change
function navigateToPage(path) {
  history.push(path);
  // Page content updates
}`,
      question:
        "What's missing for screen reader users in this SPA navigation?",
      options: [
        "Focus management and route announcement",
        "Loading spinner",
        "Page transition animation",
        "Browser history check",
      ],
      correctAnswer: 0,
      explanation:
        "After route changes in SPAs: 1) Move focus to the main heading or container, 2) Announce the route change with aria-live region or document title update, 3) Ensure skip links work with client-side routing. Without this, screen readers don't know content changed.",
      wcagReference: "WCAG 2.1 Success Criterion 2.4.3 Focus Order (Level A)",
      wcagVersion: "2.1",
    },
    {
      id: 23,
      title: "Autocomplete Combobox",
      code: `<input type="text" id="search">
<ul id="suggestions">
  <li>Result 1</li>
  <li>Result 2</li>
</ul>`,
      question: "What ARIA pattern makes this an accessible combobox?",
      options: [
        'role="combobox", aria-expanded, aria-autocomplete, aria-controls, and keyboard navigation',
        'role="search" only',
        "aria-label on input",
        "placeholder attribute",
      ],
      correctAnswer: 0,
      explanation:
        'Accessible combobox needs: role="combobox" on input, aria-expanded="true/false", aria-autocomplete="list", aria-controls="suggestionsId", role="listbox" on list, role="option" on items. Implement keyboard: Down arrow opens, Up/Down navigates, Enter selects, Escape closes. Announce results count.',
      wcagReference:
        "WCAG 2.1 Success Criterion 4.1.2 Name, Role, Value (Level A)",
      wcagVersion: "2.1",
    },
    {
      id: 24,
      title: "Reduced Motion",
      code: `.animated {
  animation: slide-in 0.5s ease;
}

@keyframes slide-in {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}`,
      question: "How should we respect users' motion preferences?",
      options: [
        "Use @media (prefers-reduced-motion: reduce) to disable/reduce animations",
        "Make animations faster",
        "Use JavaScript instead of CSS",
        "Add more keyframes",
      ],
      correctAnswer: 0,
      explanation:
        "Respect prefers-reduced-motion: reduce media query. Users with vestibular disorders can experience dizziness from animations. In reduced motion mode, disable or minimize animations, use instant transitions or simple fades. Essential motion (like progress indicators) should be simplified but not removed.",
      wcagReference:
        "WCAG 2.1 Success Criterion 2.3.3 Animation from Interactions (Level AAA)",
      wcagVersion: "2.1",
    },
    {
      id: 25,
      title: "Touch Target Size",
      code: `<button style="
  width: 20px;
  height: 20px;
  padding: 0;
">
  ×
</button>`,
      question: "What accessibility issue exists with this button?",
      options: [
        "Touch target too small (should be minimum 44×44px)",
        "Wrong color",
        "Text should be spelled out",
        "Missing border radius",
      ],
      correctAnswer: 0,
      explanation:
        "WCAG 2.1 Level AAA requires touch targets to be at least 44×44 pixels (Level AA 2.5.5 is 24×24px). Small targets are hard for users with motor disabilities, tremors, or anyone using touch devices. Ensure adequate spacing between adjacent targets too.",
      wcagReference: "WCAG 2.1 Success Criterion 2.5.5 Target Size (Level AAA)",
      wcagVersion: "2.1",
    },
    {
      id: 26,
      title: "Menu Button Pattern",
      code: `<button id="menu-btn">Menu</button>
<ul id="menu">
  <li><a href="/home">Home</a></li>
  <li><a href="/about">About</a></li>
</ul>`,
      question: "What's needed for accessible menu button implementation?",
      options: [
        "aria-haspopup, aria-expanded, focus trap, and Escape key handler",
        "onclick handler only",
        "CSS hover state",
        "title attribute",
      ],
      correctAnswer: 0,
      explanation:
        'Menu buttons need: aria-haspopup="true", aria-expanded="false/true", aria-controls="menuId". Menu needs role="menu" and items need role="menuitem". Implement keyboard: Enter/Space opens, Escape closes, arrow keys navigate. Focus should return to button on close. Consider focus trap if modal-like.',
      wcagReference:
        "WCAG 2.1 Success Criterion 4.1.2 Name, Role, Value (Level A)",
      wcagVersion: "2.1",
    },
    {
      id: 27,
      title: "Text Resizing",
      code: `html {
  font-size: 16px;
}

.text {
  font-size: 14px;
}`,
      question: "What makes this CSS problematic for text scaling?",
      options: [
        "Uses fixed px units instead of relative units (rem/em)",
        "Font size is too small",
        "Should use !important",
        "Missing line-height",
      ],
      correctAnswer: 0,
      explanation:
        "Use relative units (rem, em, %) for font sizes, not fixed px units. This allows users to scale text via browser zoom settings. WCAG requires text to be resizable up to 200% without loss of functionality. Set root font size in px, then use rem for everything else.",
      wcagReference: "WCAG 2.1 Success Criterion 1.4.4 Resize Text (Level AA)",
      wcagVersion: "2.1",
    },
    {
      id: 28,
      title: "Drag and Drop Accessibility",
      code: `<div draggable="true" 
     ondragstart="handleDrag(event)">
  Drag me
</div>`,
      question: "What's missing for keyboard-only users?",
      options: [
        "Keyboard alternative for drag and drop functionality",
        "Mouse cursor style",
        "Touch event handlers",
        "Animation on drag",
      ],
      correctAnswer: 0,
      explanation:
        "Drag and drop is not keyboard accessible by default. Provide alternative methods: keyboard shortcuts (Ctrl+X/C/V), context menu options, or movement buttons. Consider using aria-grabbed and aria-dropeffect (deprecated but still useful). Or implement keyboard-accessible alternatives completely.",
      wcagReference: "WCAG 2.1 Success Criterion 2.1.1 Keyboard (Level A)",
      wcagVersion: "2.1",
    },
    {
      id: 29,
      title: "Time-based Media",
      code: `<video src="tutorial.mp4" controls>
</video>`,
      question: "What's required for accessible video content?",
      options: [
        "Captions, audio description track, and transcript",
        "Autoplay attribute",
        "Poster image",
        "Higher resolution",
      ],
      correctAnswer: 0,
      explanation:
        'Videos need: 1) Captions for deaf/hard-of-hearing (use <track kind="captions">), 2) Audio description or alternative audio track for blind users describing visual content, 3) Text transcript for users who can\'t access video. Ensure media player controls are keyboard accessible.',
      wcagReference:
        "WCAG 2.1 Success Criterion 1.2.2 Captions (Prerecorded) (Level A)",
      wcagVersion: "2.1",
    },
    {
      id: 30,
      title: "Accessible SVG",
      code: `<svg viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" 
          fill="blue" />
</svg>`,
      question: "How can we make this SVG accessible to screen readers?",
      options: [
        "Add role, <title>, and <desc> elements, plus aria-labelledby",
        "Add class attribute",
        "Use inline styles",
        "Convert to PNG",
      ],
      correctAnswer: 0,
      explanation:
        'For meaningful SVGs: 1) Add role="img", 2) Include <title id="titleId">Short name</title>, 3) Add <desc id="descId">Detailed description</desc>, 4) Use aria-labelledby="titleId descId". For decorative SVGs, use role="presentation" or aria-hidden="true". Ensure interactive SVG elements are keyboard accessible.',
      wcagReference:
        "WCAG 2.1 Success Criterion 1.1.1 Non-text Content (Level A)",
      wcagVersion: "2.1",
    },
  ],
};
