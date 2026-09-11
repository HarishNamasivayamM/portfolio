<div align="center">

# Harish Namasivayam Muthuswamy

### Data Engineering · Analytics · Machine Learning · Applied AI

A modern portfolio showcasing my work across data platforms, analytics, ML/AI, research, cloud, and applied engineering.

<p>
  <a href="https://portfolio-coral-xi-78.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Portfolio-Visit%20Site-2563EB?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Portfolio" />
  </a>
  <a href="https://www.linkedin.com/in/harish-namasivayam-muthuswamy/">
    <img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="https://calendly.com/harishnamasivayam/quick-chat">
    <img src="https://img.shields.io/badge/Schedule-a%20Conversation-006BFF?style=for-the-badge&logo=calendar&logoColor=white" alt="Schedule a conversation" />
  </a>
</p>

<p>
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=000000" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/License-MIT-22C55E?style=flat-square" alt="MIT License" />
</p>

</div>

---

## Overview

This repository contains my personal portfolio, built to present my experience, technical depth, selected projects, research, certifications, and contact options in one place.

The site is designed to stay easy to scan at first glance while still giving technical reviewers the option to dig deeper into project details, skills, architecture, and outcomes.

## Portfolio Highlights

- **Work Experience** with compact role summaries and expandable details
- **Technical Skills** with a concise core stack and deeper full-stack views
- **Projects** with reusable cards, filters, outcomes, and links where available
- **Research & Recognition** covering IEEE research, hackathons, and awards
- **Certifications** including Microsoft Fabric and Google Cloud
- **Section-aware navigation** with a desktop rail and floating bottom dock
- **Light and dark mode** with responsive behavior across screen sizes
- **Search and keyboard interactions** for quicker navigation
- **Contact and scheduling** through email, LinkedIn, GitHub, and Calendly

## Portfolio Sections

| Section | What it covers |
| --- | --- |
| About | Short professional introduction and focus areas |
| Where I Add Value | Data engineering, analytics, ML, and applied AI strengths |
| Experience | Professional roles and impact |
| Technical Skills | Core stack plus deeper tools, platforms, and capabilities |
| Projects | Featured work and supporting project case studies |
| Research & Recognition | Research outcomes, hackathon wins, and recognition |
| Education & Certifications | Academic background and professional credentials |
| Leadership | Community and leadership experience |
| Contact | Quick message, social links, and scheduling |

## Tech Stack

| Area | Technologies |
| --- | --- |
| Framework | Next.js 16, React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| UI | shadcn/ui primitives, Magic UI components |
| Icons | Lucide React, React Icons, local SVG assets |
| Motion | Motion |
| Content | Content Collections / MDX infrastructure |
| Theme | next-themes |
| Deployment | Vercel |

## Architecture

```text
src/
├── app/                  # App Router pages and application structure
├── components/
│   ├── section/          # Portfolio sections
│   ├── ui/               # Reusable UI primitives and local assets
│   └── magicui/          # Magic UI components and motion utilities
├── data/
│   └── resume.tsx        # Centralized portfolio content and typed data
└── ...
```

Most portfolio content is maintained in `src/data/resume.tsx`, which acts as the main source of truth for experience, skills, projects, research, certifications, contact information, and related metadata.

## Run Locally

### Prerequisites

- Node.js 18+
- pnpm

### Setup

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

### Quality checks

```bash
pnpm exec tsc --noEmit --incremental false
pnpm lint
pnpm build
```

## Design Approach

This portfolio started from the Magic UI portfolio template and has been substantially adapted around my own experience, projects, technical profile, research, navigation, and content structure.

The design is built around a few principles:

- keep the first view easy to scan
- expose deeper technical detail only when useful
- prioritize real outcomes over decorative content
- keep project and skill information structured and consistent
- preserve accessibility and responsive behavior while adding interaction

## Contact

- **Live Portfolio:** https://portfolio-coral-xi-78.vercel.app/
- **GitHub:** https://github.com/HarishNamasivayamM
- **LinkedIn:** https://www.linkedin.com/in/harish-namasivayam-muthuswamy/
- **Schedule a conversation:** https://calendly.com/harishnamasivayam/quick-chat

## Credits & License

This project retains the existing MIT license and the attribution required by the original Magic UI portfolio template.

See [`LICENSE`](./LICENSE) for details.
