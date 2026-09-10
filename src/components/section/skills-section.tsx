import BlurFade from "@/components/magicui/blur-fade";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Skill, SkillGroup } from "@/data/resume";
import { ChevronDown } from "lucide-react";

const separator = " / ";
const BRAND_ICON_CLASSES: Record<string, string> = {
  Python: "text-[#3776ab]", Pandas: "text-[#150458] dark:text-[#9b8cff]", "Apache Spark": "text-[#e25a1c]", PySpark: "text-[#e25a1c]", Snowflake: "text-[#29b5e8]", "Microsoft Fabric": "text-[#742774]", Azure: "text-[#0078d4]", "Power BI": "text-[#f2c811]", "Apache Airflow": "text-[#017cee]", dbt: "text-[#ff694a]", "Apache Kafka": "text-[#111827] dark:text-white", Databricks: "text-[#ff3621]", "Azure Databricks": "text-[#ff3621]", "scikit-learn": "text-[#f89939]", AWS: "text-[#ff9900]", "Google Cloud Platform": "text-[#4285f4]", GitHub: "text-[#181717] dark:text-white", Git: "text-[#f05032]", Linux: "text-[#333333] dark:text-[#f5c211]", Docker: "text-[#008fe2]", Kubernetes: "text-[#326ce5]", LangChain: "text-[#1c3c3c] dark:text-[#9fe870]", Elasticsearch: "text-[#00bfb3]",
};

function TechnologyChips({ skills }: { skills: readonly Skill[] }) {
  return <ul className="flex flex-wrap gap-2">{skills.map((skill) => <li key={skill.name} className="flex min-h-8 items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5 transition-colors hover:border-primary/30 hover:bg-primary/5"><skill.icon className={`size-4 shrink-0 ${BRAND_ICON_CLASSES[skill.name] ?? "text-primary"}`} aria-hidden="true" /><span className="text-sm font-medium leading-none text-foreground">{skill.name}</span></li>)}</ul>;
}

function mergeGroups(groups: readonly SkillGroup[], names: readonly string[]) {
  const selected = names.map((name) => groups.find((group) => group.category === name)).filter(Boolean) as SkillGroup[];
  const technologies = Array.from(new Map(selected.flatMap((group) => group.technologies).map((skill) => [skill.name, skill])).values());
  const concepts = Array.from(new Set(selected.flatMap((group) => group.concepts)));
  return { technologies, concepts, icon: selected[0]?.icon };
}

const platformDetails: Record<string, string> = {
  "Microsoft Fabric": "OneLake / Lakehouse / Warehouse / Fabric Data Pipelines / Fabric Data Factory / Fabric Spark / Real-Time Intelligence",
  Azure: "Azure Data Factory / Azure Blob Storage / Azure Databricks",
  AWS: "S3 / EC2 / Redshift / IAM",
  Snowflake: "Warehouse and analytics workflows",
  Databricks: "Spark / Delta / notebook environment",
};

function SkillItem({ title, technologies, concepts, icon: Icon, cloud }: { title: string; technologies: readonly Skill[]; concepts: readonly string[]; icon?: SkillGroup["icon"]; cloud?: boolean }) {
  const visible = cloud ? technologies.filter((skill) => Object.hasOwn(platformDetails, skill.name)).slice(0, 6) : technologies.slice(0, 6);
  const additional = technologies.filter((skill) => !visible.some((item) => item.name === skill.name));
  return <AccordionItem value={title} className="rounded-xl border border-border bg-card px-5 transition-colors hover:border-primary/20">
    <AccordionTrigger className="gap-3 py-4 hover:no-underline [&>svg]:size-4" aria-label={`Expand ${title}`}><h3 className="flex min-w-0 flex-1 items-center gap-2 text-base font-semibold leading-tight">{Icon && <Icon className="size-[1.125rem] shrink-0 text-primary" aria-hidden="true" />}<span>{title}</span></h3><ChevronDown className="size-4 shrink-0" aria-hidden="true" /></AccordionTrigger>
      <AccordionContent className="pt-1">
        <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Core technologies</p>
        <TechnologyChips skills={visible} />
        {additional.length > 0 && <div><p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Additional technologies</p><TechnologyChips skills={additional} /></div>}
        {cloud && <div className="mt-4 space-y-2 border-t border-border/60 pt-3">{visible.map((skill) => <p key={skill.name} className="text-xs leading-relaxed text-muted-foreground"><span className="font-semibold text-foreground">{skill.name}:</span> {platformDetails[skill.name]}</p>)}</div>}
        {concepts.length > 0 && <div className="mt-4 border-t border-border/70 pt-3"><p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Concepts &amp; methods</p><p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{concepts.join(separator)}</p></div>}
      </AccordionContent>
  </AccordionItem>;
}

export default function SkillsSection({ coreStack, groups }: { coreStack: readonly Skill[]; groups: readonly SkillGroup[] }) {
  const capabilities = [
    { title: "Data Engineering", categories: ["Programming & Query", "Data Engineering", "Databases & Warehouses"] },
    { title: "Analytics & ML", categories: ["Analytics & BI", "Data Science & Machine Learning"] },
    { title: "Cloud & Data Platforms", categories: ["Microsoft Fabric & Azure", "Cloud & Data Platforms"], cloud: true },
    { title: "Applied AI", categories: ["AI / LLM / RAG"] },
  ].map((capability) => ({ ...capability, ...mergeGroups(groups, capability.categories) }));
  const supporting = groups.find((group) => group.category === "DevOps / Delivery / Collaboration");
  return <section id="skills" className="flex flex-col gap-5">
    <BlurFade delay={0.04}><div className="flex items-center gap-2"><span className="h-5 w-1 rounded-full bg-primary" aria-hidden="true" /><h2 className="text-xl font-bold tracking-tight">Technical Skills</h2></div></BlurFade>
    <div className="rounded-xl border border-primary/20 bg-primary/[0.035] p-4 sm:p-5 dark:bg-primary/[0.07]"><h3 className="mb-3 text-base font-semibold">Core Stack</h3><TechnologyChips skills={coreStack} /></div>
    <Accordion type="multiple" className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {capabilities.map((capability, index) => <BlurFade key={capability.title} delay={0.08 + index * 0.03}><SkillItem title={capability.title} technologies={capability.technologies} concepts={capability.concepts} icon={capability.icon} cloud={capability.cloud} /></BlurFade>)}
      {supporting && <BlurFade className="md:col-span-2"><SkillItem title="Supporting Tools & Delivery" technologies={supporting.technologies} concepts={supporting.concepts} icon={supporting.icon} /></BlurFade>}
    </Accordion>
  </section>;
}
