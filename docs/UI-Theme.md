## docs/ui-theme.md

# UI Theme & Design System – Snapora

## Overview

Snapora uses **Tailwind CSS** for styling, allowing for rapid, consistent, and responsive UI development. This document defines the design tokens, component patterns, and styling conventions used throughout the application.

---

## Design Principles

- **Modern & Clean:** Minimalistic interfaces with generous whitespace and subtle shadows.
- **Content-First:** Vlogs are the hero; UI elements support the content without overpowering it.
- **Responsive:** Mobile-first design that scales gracefully to desktop.
- **Consistent:** Predefined colour palette, typography scale, and component styles ensure visual harmony.
- **Accessible:** Sufficient colour contrast, focus indicators, and semantic HTML.

---

## Color Palette

Primary and neutral colours are defined as Tailwind CSS custom colours. The palette is inspired by creative media platforms – vibrant but not distracting.

| Role                 | Colour Name   | Hex Code   | Tailwind Class       |
|----------------------|---------------|------------|----------------------|
| Primary (actions)    | Snapora Blue  | `#2563EB`  | `blue-600`           |
| Primary Hover        | Darker Blue   | `#1D4ED8`  | `blue-700`           |
| Secondary            | Snapora Pink  | `#EC4899`  | `pink-500`           |
| Accent (likes, CTA) | Snapora Red   | `#EF4444`  | `red-500`            |
| Background (light)  | White Smoke   | `#F9FAFB`  | `gray-50`            |
| Surface (cards)     | White         | `#FFFFFF`  | `white`              |
| Text (primary)      | Dark Gray     | `#111827`  | `gray-900`           |
| Text (secondary)    | Medium Gray   | `#6B7280`  | `gray-500`           |
| Border / Divider    | Light Gray    | `#E5E7EB`  | `gray-200`           |
| Success             | Green         | `#10B981`  | `emerald-500`        |
| Error               | Red           | `#EF4444`  | `red-500`            |

### Dark Mode (future scope)
Currently the application uses light theme only. A dark mode palette will be introduced later.

---

## Typography

The system uses the default Tailwind font stack (`Inter` via system font fallback). The typography scale is based on Tailwind’s built-in sizes.

| Usage              | Font Size | Line Height | Tailwind Class     |
|--------------------|-----------|-------------|--------------------|
| Page Title         | 2.25rem   | 2.5rem      | `text-4xl`         |
| Section Heading    | 1.875rem  | 2.25rem     | `text-3xl`         |
| Card Title         | 1.25rem   | 1.75rem     | `text-xl`          |
| Body Text          | 1rem      | 1.5rem      | `text-base`        |
| Small / Captions   | 0.875rem  | 1.25rem     | `text-sm`          |
| Extra Small        | 0.75rem   | 1rem        | `text-xs`          |

All headings use `font-semibold` or `font-bold`. Body text is `font-normal`. The font family defaults to:

```css
font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
```

---

## Spacing & Layout

Spacing follows Tailwind’s default spacing scale (0.25rem increments). Commonly used values:

- **Page padding:** `px-4 sm:px-6 lg:px-8` (responsive)
- **Section margins:** `my-8` or `my-12`
- **Card padding:** `p-4 sm:p-6`
- **Gap between elements:** `gap-4` (grids, flex containers)

The app uses a **container** class with `max-w-7xl mx-auto` for centering content.

---

## Component Styling

### Buttons

Three variants used throughout the application:

**Primary Button:**
```html
<button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Create Vlog
</button>
```

**Secondary/Outline Button:**
```html
<button class="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
  Cancel
</button>
```

**Danger Button (delete actions):**
```html
<button class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
  Delete
</button>
```

### Cards (Vlog Cards)

Vlog cards use a clean, elevated style:

```html
<div class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
  <img src="..." alt="Vlog cover" class="w-full h-48 object-cover" />
  <div class="p-4">
    <h3 class="text-lg font-semibold text-gray-900 truncate">Vlog Title</h3>
    <p class="text-sm text-gray-500 mt-1">By John Doe</p>
    <div class="flex items-center justify-between mt-3">
      <span class="text-sm text-gray-600">👁 1.2k views</span>
      <span class="text-sm text-pink-500">❤ 42 likes</span>
    </div>
  </div>
</div>
```

### Forms

Form elements follow a consistent style with labels, inputs, and validation states.

```html
<form class="space-y-4 max-w-md mx-auto">
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter vlog title" />
  </div>
  <!-- more fields -->
  <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">Submit</button>
</form>
```

**Error state:** Add `border-red-500` and a helper text with `text-red-600 text-sm`.

### Navigation Bar

Fixed top navbar with transparent background and a subtle border-bottom.

```html
<nav class="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
    <a href="/" class="text-2xl font-bold text-blue-600">Snapora</a>
    <div class="flex items-center gap-4">
      <!-- Navigation links, user menu -->
    </div>
  </div>
</nav>
```

### Profile Avatar

User avatars are replaced with a generated initial avatar (since no profile picture upload is required). Fallback:

```html
<div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
  JD
</div>
```

---

## Responsive Breakpoints

Tailwind’s default breakpoints are used:

| Breakpoint | Min Width | Typical Device        |
|------------|-----------|------------------------|
| `sm`       | 640px     | Large phones           |
| `md`       | 768px     | Tablets                |
| `lg`       | 1024px    | Small laptops          |
| `xl`       | 1280px    | Desktops               |
| `2xl`      | 1536px    | Large desktops         |

Grid layouts transition from single column (mobile) to multi-column on larger screens using `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.

---

## Tailwind Configuration (tailwind.config.ts)

For reference, the custom theme extension (if any) is minimal; mostly default Tailwind classes are used. However, the configuration might extend colours or fontFamily.

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom Snapora colors can be added here if needed
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

No additional plugins are required; all styling is achievable with Tailwind utility classes.

---

## Accessibility Considerations

- **Color contrast:** All text/background combinations meet WCAG AA standards (minimum ratio 4.5:1 for normal text).
- **Focus states:** All interactive elements have visible focus rings (`focus:ring-2 focus:ring-blue-500`).
- **Semantic HTML:** `<button>`, `<nav>`, `<main>`, `<article>`, and `<form>` are used correctly.
- **Alt text:** All images have descriptive `alt` attributes.
- **Labels:** Form inputs always have associated `<label>` elements.

These guidelines ensure a professional, maintainable, and user-friendly interface for Snapora.