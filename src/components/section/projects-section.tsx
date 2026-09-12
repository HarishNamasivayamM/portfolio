"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { CompactProjectCard, ProjectCard } from "@/components/project-card";
import SectionHeading from "@/components/section/section-heading";
import { DATA, type Project } from "@/data/resume";
import { useMemo, useState } from "react";

function FullProjectCard({ project }: { project: Project }) {
  return (
    <ProjectCard
      title={project.title}
      categories={project.categories}
      problem={project.problem}
      build={project.build}
      approach={project.approach}
      scale={project.scale}
      outcome={project.outcome}
      metrics={project.metrics}
      venue={project.venue}
      badge={project.badge}
      research={project.research}
      featuredMetric={project.featuredMetric}
      featuredMetricLabel={project.featuredMetricLabel}
      websiteUrl={project.websiteUrl}
      sourceUrl={project.sourceUrl}
      githubUrl={project.githubUrl}
      demoUrl={project.demoUrl}
      architectureUrl={project.architectureUrl}
      caseStudyUrl={project.caseStudyUrl}
      paperUrl={project.paperUrl}
      date={project.date}
      status={project.status}
      coverImage={project.coverImage}
      demoVideo={project.demoVideo}
      image={project.image}
      video={project.video}
    />
  );
}

function matchesFilter(project: Project, activeFilter: string) {
  if (activeFilter === "All") return true;
  if (activeFilter === "Data Engineering") return project.categories.includes("Data Engineering");
  if (activeFilter === "Analytics & BI") return project.categories.some((category) => category === "Analytics" || category === "BI" || category === "Financial Analytics");
  if (activeFilter === "Data Science / ML") return project.categories.some((category) => category === "Data Science" || category === "Machine Learning" || category === "Forecasting");
  if (activeFilter === "Applied AI") return project.categories.some((category) => category === "AI" || category === "RAG");
  if (activeFilter === "Cloud / Big Data") return project.categories.some((category) => category === "Big Data" || category === "Databricks");
  return project.categories.includes("Hackathon");
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Data Engineering", "Analytics & BI", "Data Science / ML", "Applied AI", "Cloud / Big Data", "Hackathons"];
  const { featuredProjects, moreProjects } = useMemo(() => ({
    featuredProjects: activeFilter === "All"
      ? DATA.projects.filter((project) => project.featured)
      : DATA.projects.filter((project) => !project.research && matchesFilter(project, activeFilter)).sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))).slice(0, 4),
    moreProjects: activeFilter === "All"
      ? DATA.projects.filter((project) => !project.featured && !project.research)
      : DATA.projects.filter((project) => !project.research && matchesFilter(project, activeFilter)).sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))).slice(4),
  }), [activeFilter]);

  return (
    <section id="projects" className="flex flex-col gap-8">
      <SectionHeading label="Selected Work" title="Projects">
        <p className="max-w-2xl text-balance text-base leading-relaxed text-muted-foreground">
          A focused selection of data systems, analytical products, predictive models, and retrieval applications.
        </p>
      </SectionHeading>

      <div className="flex flex-wrap gap-2" aria-label="Filter projects by category">
        {filters.map((filter) => (
          <button key={filter} type="button" aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)} className={`min-h-9 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${activeFilter === filter ? "border-primary/40 bg-primary/10 text-primary" : "border-border/70 bg-background/60 text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
            {filter}
          </button>
        ))}
      </div>

      {featuredProjects.length > 0 && <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Featured Projects</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <BlurFade key={project.canonicalId} delay={0.08 + index * 0.03} className="h-full">
              <FullProjectCard project={project} />
            </BlurFade>
          ))}
        </div>
      </div>}

      {moreProjects.length > 0 && <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">More Projects</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {moreProjects.map((project, index) => (
            <BlurFade key={project.canonicalId} delay={0.08 + index * 0.025} className="h-full">
              <CompactProjectCard title={project.title} categories={project.categories} problem={project.problem} build={project.build} scale={project.scale} outcome={project.outcome} approach={project.approach} badge={project.badge} websiteUrl={project.websiteUrl} sourceUrl={project.sourceUrl} githubUrl={project.githubUrl} demoUrl={project.demoUrl} caseStudyUrl={project.caseStudyUrl} architectureUrl={project.architectureUrl} paperUrl={project.paperUrl} />
            </BlurFade>
          ))}
        </div>
      </div>}
      {featuredProjects.length === 0 && moreProjects.length === 0 && <p className="text-sm text-muted-foreground">No projects match this category yet.</p>}
    </section>
  );
}
