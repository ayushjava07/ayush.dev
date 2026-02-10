# AyushFolio - Web Developer Portfolio

A modern, responsive portfolio website built with React and Tailwind CSS, featuring dark mode support.

## Features

- ✨ Modern, clean design
- 🌓 Dark/Light mode toggle with system preference detection
- 📱 Fully responsive layout
- ⚡ Built with Vite for fast development
- 🎨 Tailwind CSS for styling
- 🔄 Smooth transitions and animations

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The portfolio will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
ayushfolio/
├── src/
│   ├── components/
│   │   └── WebDeveloperPortfolio.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Customization

Edit `src/components/WebDeveloperPortfolio.jsx` to customize:
- Personal information
- Projects
- Skills
- Contact details
- Colors and styling

## Dark Mode

The portfolio includes a dark mode toggle that:
- Remembers your preference in localStorage
- Detects system preference on first visit
- Smoothly transitions between themes

## Technologies Used

- React 18
- Tailwind CSS 3
- Vite
- PostCSS
- Autoprefixer

