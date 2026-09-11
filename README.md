# Harish Namasivayam Muthuswamy

### Data Engineering · Analytics · Machine Learning · Applied AI

A modern personal portfolio showcasing my work across data engineering, analytics and BI, data science, machine learning, applied AI, research, and cloud platforms.

[GitHub](https://github.com/HarishNamasivayamM) · [LinkedIn](https://www.linkedin.com/in/harish-namasivayam-muthuswamy/) · [Schedule a conversation](https://calendly.com/harishnamasivayam/quick-chat)

---

## About the Portfolio

This portfolio is designed as more than a resume on the web. It brings together my professional experience, technical capabilities, selected projects, research, certifications, leadership, and ways to connect in one place.

The site is intentionally structured for two kinds of visitors:

- **Recruiters and hiring teams** can quickly understand my background, experience, certifications, and strongest areas of work.
- **Engineers and technical reviewers** can explore deeper project details, technical stacks, research, architecture, and implementation choices.

## What You'll Find

- **About** — a concise introduction to the problems and systems I like working on
- **Where I Add Value** — a high-level view of my work across data engineering, analytics, ML, and applied AI
- **Work Experience** — compact role summaries with expandable details
- **Technical Skills** — a curated core stack with deeper capability views across engineering, analytics, ML, cloud, AI, databases, and delivery
- **Projects** — featured and supporting projects with technology tags, outcomes, and links where available
- **Research & Recognition** — IEEE research, hackathon wins, finalist recognition, and supporting details
- **Education & Certifications** — academic background and professional certifications
- **Leadership** — leadership and community involvement
- **Contact** — quick email, social links, and scheduling options

## Built With

| Area | Stack |
| --- | --- |
| Framework | Next.js 16, React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| UI | shadcn/ui primitives, Magic UI components |
| Icons | Lucide React, React Icons, local SVG assets |
| Motion | Motion |
| Content | Content Collections / MDX infrastructure |
| Theme | next-themes |

## Key Experience Features

- Responsive desktop, tablet, and mobile layouts
- Light and dark themes
- Section-aware desktop navigation
- Floating bottom dock navigation
- Expandable work-experience details
- Progressive-disclosure technical skills explorer
- Project filtering and reusable project cards
- Research and recognition cards with expandable details
- Search support with keyboard shortcuts
- Accessible focus states and keyboard interactions
- Print-friendly behavior with floating controls hidden
- Contact flow with email fallback and scheduling support

## Project Structure

```text
src/
├── app/                  # App Router pages and global application structure
├── components/
│   ├── section/          # Portfolio sections
│   ├── ui/               # Reusable UI primitives and local assets
│   └── magicui/          # Magic UI components and motion utilities
├── data/
│   └── resume.tsx        # Centralized portfolio content and typed data
└── ...
```

Most portfolio content is maintained in:

```text
src/data/resume.tsx
```

That file acts as the main source of truth for experience, skills, projects, research, certifications, contact information, and related metadata.

## Running Locally

### Prerequisites

- Node.js 18+
- pnpm

### Install and run

```bash
pnpm install
pnpm dev
```

Open:

```text
http://localhost:3000
```

## Quality Checks

Before shipping changes, run:

```bash
pnpm exec tsc --noEmit --incremental false
pnpm lint
pnpm build
```

## Adding or Updating Projects

Projects are stored as structured data so the portfolio can render them consistently.

A typical project entry looks like:

```ts
{
  canonicalId: "example-project",
  title: "Example Project",
  categories: ["Data Engineering"],
  problem: "The verified problem this project addressed.",
  build: "What was built.",
  approach: ["Python", "SQL"],
  scale: "Optional verified scale.",
  outcome: "The verified result or practical outcome.",
  featured: false,
  githubUrl: "",
  demoUrl: "",
}
```

Only verified links and outcomes should be added. Empty optional links are intentionally not rendered.

## Design Approach

The portfolio is based on the original Magic UI portfolio template, but has been substantially adapted around my own experience, projects, technical profile, research, navigation, and content structure.

The design follows a few simple principles:

- keep the first view easy to scan
- expose deeper technical detail only when useful
- prioritize real outcomes over decorative content
- keep project and skill information structured and consistent
- preserve accessibility and responsive behavior while adding interaction

## Contact

- [GitHub](https://github.com/HarishNamasivayamM)
- [LinkedIn](https://www.linkedin.com/in/harish-namasivayam-muthuswamy/)
- [Schedule a conversation](https://calendly.com/harishnamasivayam/quick-chat)

## Credits & License

This project retains the existing MIT license and the attribution required by the original Magic UI portfolio template.

See [`LICENSE`](./LICENSE) for details.
