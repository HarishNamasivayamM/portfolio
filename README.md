# Harish Namasivayam Muthuswamy  -  Portfolio

This is Harish Namasivayam Muthuswamy's portfolio for work across data engineering, analytics and BI, data science, machine learning, AI/RAG applications, and research.

## Portfolio Tech Stack

This website is built with:

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS
- shadcn/ui primitives
- Magic UI components
- Motion for restrained animations
- Content Collections for the retained writing infrastructure

## Features

- Responsive portfolio layout
- Light and dark mode
- Outcome-driven work experience
- Where I Add Value capability overview
- Featured and secondary project case studies
- Lightweight project category filters, including the HERE Technologies hackathon project
- IEEE research and paper-link support
- Certifications and leadership progression
- Desktop section rail, five-function bottom dock, and client-side search (Ctrl/Cmd+K or `/`)
- Accessible navigation and focus states
- Print-friendly output with floating controls hidden

## Getting Started

Install dependencies and start the local development server:

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` in a browser.

Run the production checks with:

```bash
pnpm exec tsc --noEmit --incremental false
pnpm lint
pnpm build
```

## Project Structure

- `src/data/resume.tsx`  -  centralized portfolio content and typed data
- `src/app/page.tsx`  -  homepage composition and section order
- `src/components/section/`  -  portfolio sections
- `src/components/ui/`  -  reusable interface primitives and local SVG assets
- `src/components/magicui/`  -  retained Magic UI components and motion utilities
- `src/app/blog/`  -  retained blog infrastructure, hidden until personal posts are configured

## Updating Content

Portfolio content is primarily maintained in [`src/data/resume.tsx`](./src/data/resume.tsx). Optional links, images, GitHub activity, writing posts, certification metadata, and `contact.scheduleUrl` should only be added when verified values are available. The homepage search indexes this structured content, so new projects and roles become searchable automatically.

The contact area uses a verified `mailto:` fallback for email. Automatic message delivery is intentionally not configured; a future form would require a provider such as Resend or Formspree and its server-side credentials.

## Adding Projects

Projects use a typed structure with a canonical identity and outcome-driven fields:

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

Leave optional link fields empty until real destinations exist; empty links are not rendered.

## License

This project retains the existing MIT license and the attribution required by the original Magic UI portfolio template. See [`LICENSE`](./LICENSE).
