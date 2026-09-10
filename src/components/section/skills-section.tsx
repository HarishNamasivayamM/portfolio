import BlurFade from "@/components/magicui/blur-fade";
import type { Skill, SkillGroup } from "@/data/resume";

const separator = " / ";

const BRAND_ICON_CLASSES: Record<string, string> = {
  Python: "text-[#3776ab]",
  Pandas: "text-[#150458] dark:text-[#9b8cff]",
  "Apache Spark": "text-[#e25a1c]",
  PySpark: "text-[#e25a1c]",
  Snowflake: "text-[#29b5e8]",
  "Microsoft Fabric": "text-[#742774]",
  Azure: "text-[#0078d4]",
  "Power BI": "text-[#f2c811]",
  "Apache Airflow": "text-[#017cee]",
  dbt: "text-[#ff694a]",
  "Apache Kafka": "text-[#111827] dark:text-white",
  Databricks: "text-[#ff3621]",
  "Azure Databricks": "text-[#ff3621]",
  "scikit-learn": "text-[#f89939]",
  AWS: "text-[#ff9900]",
  "Google Cloud Platform": "text-[#4285f4]",
  BigQuery: "text-[#4285f4]",
  GitHub: "text-[#181717] dark:text-white",
  Git: "text-[#f05032]",
  Linux: "text-[#333333] dark:text-[#f5c211]",
  Docker: "text-[#008fe2]",
  LangChain: "text-[#1c3c3c] dark:text-[#9fe870]",
  Elasticsearch: "text-[#00bfb3]",
};

function TechnologyChips({ skills }: { skills: readonly Skill[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <li key={skill.name} className="flex min-h-8 items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5 transition-colors hover:border-primary/30 hover:bg-primary/5">
          <skill.icon className={`size-4 shrink-0 ${BRAND_ICON_CLASSES[skill.name] ?? "text-primary"}`} aria-hidden="true" />
          <span className="text-sm font-medium leading-none text-foreground">{skill.name}</span>
        </li>
      ))}
    </ul>
  );
}

function mergeGroups(groups: readonly SkillGroup[], names: readonly string[]) {
  const selected = names.map((name) => groups.find((group) => group.category === name)).filter(Boolean) as SkillGroup[];
  const technologies = Array.from(new Map(selected.flatMap((group) => group.technologies).map((skill) => [skill.name, skill])).values());
  const concepts = Array.from(new Set(selected.flatMap((group) => group.concepts)));
  return { technologies, concepts, icon: selected[0]?.icon };
}

const platformDetails: Record<string, string> = {
  "Microsoft Fabric": "OneLake   ·   Lakehouse   ·   Warehouse   ·   Fabric Data Pipelines   ·   Fabric Data Factory   ·   Fabric Spark   ·   Real-Time Intelligence",
  Azure: "Azure Data Factory   ·   Azure Blob Storage   ·   Azure Databricks",
  AWS: "S3   ·   EC2   ·   Redshift   ·   IAM",
  "Google Cloud Platform": "BigQuery",
  Snowflake: "Warehouse and analytics workflows",
  Databricks: "Spark   ·   Delta   ·   notebook environment",
};

export default function SkillsSection({ coreStack, groups }: { coreStack: readonly Skill[]; groups: readonly SkillGroup[] }) {
  const capabilities = [
    { title: "Data Engineering", categories: ["Programming & Query", "Data Engineering", "Databases & Warehouses"] },
    { title: "Analytics & ML", categories: ["Analytics & BI", "Data Science & Machine Learning"] },
    { title: "Cloud & Data Platforms", categories: ["Microsoft Fabric & Azure", "Cloud & Data Platforms"] },
    { title: "Applied AI", categories: ["AI / LLM / RAG"] },
  ].map((capability) => ({ ...capability, ...mergeGroups(groups, capability.categories) }));
  const supporting = groups.find((group) => group.category === "DevOps / Delivery / Collaboration");

  return (
    <section id="skills" className="flex flex-col gap-5">
      <BlurFade delay={0.04}>
        <div className="flex items-center gap-2">
          <span className="h-5 w-1 rounded-full bg-primary" aria-hidden="true" />
          <h2 className="text-2xl font-bold tracking-tight">Technical Skills</h2>
        </div>
      </BlurFade>
      <div className="rounded-xl border border-primary/20 bg-primary/[0.035] p-4 sm:p-5 dark:bg-primary/[0.07]">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold">Core Stack</h3>
        </div>
        <TechnologyChips skills={coreStack} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {capabilities.map((capability, index) => {
          const CategoryIcon = capability.icon;
          return (
            <BlurFade key={capability.title} delay={0.08 + index * 0.03}>
              <article className="h-full rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/20">
                <h3 className="flex items-center gap-2 text-base font-semibold leading-tight">
                  {CategoryIcon && <CategoryIcon className="size-[1.125rem] text-primary" aria-hidden="true" />}
                  {capability.title}
                </h3>
                <div className="mt-4">
                  <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Core technologies</p>
                  <TechnologyChips skills={capability.title === "Cloud & Data Platforms" ? capability.technologies.filter((skill) => Object.hasOwn(platformDetails, skill.name)) : capability.technologies} />
                  {capability.title === "Cloud & Data Platforms" && (
                    <div className="mt-3 space-y-2 border-t border-border/60 pt-3">
                      {capability.technologies.filter((skill) => Object.hasOwn(platformDetails, skill.name)).map((skill) => (
                        <p key={skill.name} className="text-xs leading-relaxed text-muted-foreground"><span className="font-semibold text-foreground">{skill.name}:</span> {platformDetails[skill.name]}</p>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-4 border-t border-border/70 pt-3">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Concepts &amp; methods</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{capability.concepts.join(separator)}</p>
                </div>
              </article>
            </BlurFade>
          );
        })}
      </div>
      {supporting && (
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-base font-semibold">Supporting Tools &amp; Delivery</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div><p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Core tools</p><TechnologyChips skills={supporting.technologies} /></div>
            <div><p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Engineering &amp; delivery</p><p className="text-sm leading-relaxed text-muted-foreground">{supporting.concepts.filter((concept) => !["Jira", "Confluence", "Agile", "Scrum"].includes(concept)).join(separator)}</p></div>
            <div><p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Collaboration</p><p className="text-sm leading-relaxed text-muted-foreground">{supporting.concepts.filter((concept) => ["Jira", "Confluence", "Agile", "Scrum"].includes(concept)).join(separator)}</p></div>
          </div>
        </div>
      )}
    </section>
  );
}
