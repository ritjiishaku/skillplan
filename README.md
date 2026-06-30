# Skillplan

Free, skills-first engineering roadmaps aligned to the **WEF Future of Jobs Report 2025**. No paywalls. No degrees required. All resources are free and remote-ready.

**9 roadmaps** covering the highest-demand tech careers — each with 8+ phases, 100+ hand-curated resources, milestone projects, and a localStorage-based progress tracker.

## Roadmaps

| Roadmap | Focus | Resources |
|---------|-------|-----------|
| **AI Automation Engineering** | Python → Production AI, dual General & Healthcare tracks | 150+ |
| **Full-Stack Engineering** | End-to-end web development | 120+ |
| **Frontend Engineering** | React, performance, accessibility | 120+ |
| **Backend Engineering** | APIs, databases, distributed systems | 120+ |
| **Cybersecurity Engineering** | Offensive & defensive security | 32+ |
| **Data Engineering & Analytics** | Pipelines, warehousing, BI | 48+ |
| **Cloud/DevOps Engineering** | AWS, CI/CD, infrastructure as code | 64+ |
| **Fintech Engineering** | Payments, compliance, real-time systems | 40+ |
| **Conversion & Growth Engineering** | Analytics, A/B testing, growth loops | 100+ |

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **React:** 19
- **Language:** JavaScript (no TypeScript)
- **Icons:** [Lucide React](https://lucide.dev)
- **Styling:** Single global CSS file (`globals.css`) — dark/light theme via CSS variables
- **Data:** Static JSON files per roadmap (no database)
- **Progress:** localStorage (per-roadmap completion tracking)
- **Fonts:** Syne, DM Mono, Fraunces (via `next/font/google`)

## Getting Started

```bash
# Clone
git clone https://github.com/your-username/skillplan.git
cd skillplan

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
skillplan/
├── app/
│   ├── layout.js              # Root layout, fonts, metadata, OG tags
│   ├── page.js                # Homepage (roadmap grid)
│   ├── not-found.js           # Custom 404
│   ├── globals.css            # All styles (dark/light themes)
│   ├── components/
│   │   ├── HomePage.js        # Landing page with roadmap cards
│   │   ├── Page.js            # Main roadmap view
│   │   ├── PhaseSection.js    # Phase accordion with modules
│   │   ├── ModuleCard.js      # Module card with topics & resources
│   │   ├── ResourceItem.js    # Resource link with progress checkbox
│   │   ├── ProgressBar.js     # Sticky top progress bar
│   │   ├── StickyNav.js       # Navigation with phase links & roadmap selector
│   │   ├── ProjectModal.js    # Modal for phase/capstone projects
│   │   ├── ThemeToggle.js     # Dark/light mode switch
│   │   ├── Toast.js           # Toast notification system
│   │   ├── ScrollAnimations.js # IntersectionObserver fade-in animations
│   │   ├── Footer.js          # Site footer
│   │   └── Providers.js       # Theme + Modal + Progress context wrapper
│   ├── context/
│   │   ├── ThemeContext.js     # Theme state (localStorage)
│   │   ├── ModalContext.js     # Modal open/close state
│   │   └── ProgressContext.js  # Per-roadmap completion (localStorage)
│   ├── lib/
│   │   └── icons.js           # Lucide icon name → component mapper
│   └── [roadmapId]/
│       └── page.js            # Dynamic route for each roadmap
├── data/
│   ├── ai.json
│   ├── backend.json
│   ├── cloud-devops.json
│   ├── cybersecurity.json
│   ├── data-engineering.json
│   ├── fintech.json
│   ├── frontend.json
│   ├── fullstack.json
│   └── growth.json
├── public/
│   └── og-image.png           # OpenGraph preview image
├── package.json
├── next.config.mjs
├── jsconfig.json
└── eslint.config.mjs
```

## Features

- **9 career roadmaps** with structured phases, modules, and curated free resources
- **Progress tracking** — check off completed resources, persisted in localStorage per roadmap
- **Dark/light theme** — toggle with system preference detection
- **Phase projects** — milestone projects at the end of each phase
- **Capstone projects** — final projects for each roadmap
- **Scroll animations** — fade-in effects on scroll using IntersectionObserver
- **Responsive design** — mobile-first with hamburger nav, works from 360px to 1024px+
- **Static generation** — all 9 roadmap pages are pre-rendered at build time
- **OpenGraph / Twitter cards** — social media preview image support
- **Accessible** — skip links, semantic HTML, keyboard navigation, focus management

## Data Structure

Each roadmap JSON file follows this schema:

```json
{
  "banner": "100% Free · 8 Phases · 150+ Resources",
  "titleDisplay": "AI Automation<br><em>Engineering</em>",
  "subtitle": "Description of the roadmap...",
  "meta": {
    "duration": "18–20 mo",
    "cost": "$0",
    "resources": "150+",
    "salaryTarget": "$140k+"
  },
  "phases": [
    {
      "number": "01",
      "badge": "badge-foundation",
      "badgeLabel": "Foundation",
      "title": "Phase Title",
      "duration": "Months 1–2",
      "modules": [
        {
          "icon": "terminal",
          "accentClass": "a2",
          "title": "Module Title",
          "topics": ["Topic 1", "Topic 2"],
          "resources": [
            {
              "icon": "book-open",
              "name": "Resource Name",
              "meta": "Author · Description",
              "url": "https://..."
            }
          ]
        }
      ],
      "phaseProject": {
        "title": "Phase Project",
        "description": "Build something...",
        "outcomes": ["Outcome 1"]
      }
    }
  ],
  "capstone": {
    "title": "Capstone Project",
    "description": "Final project...",
    "outcomes": ["Outcome 1"]
  }
}
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## License

Built by [Ritji Ishaku](https://ritji.xyz). All roadmaps and resources are free and open.
