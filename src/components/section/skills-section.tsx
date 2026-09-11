import BlurFade from "@/components/magicui/blur-fade";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Skill, SkillGroup } from "@/data/resume";
import { ChevronDown } from "lucide-react";

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
  GitHub: "text-[#181717] dark:text-white",
  Git: "text-[#f05032]",
  Linux: "text-[#333333] dark:text-[#f5c211]",
  Docker: "text-[#008fe2]",
  Kubernetes: "text-[#326ce5]",
  LangChain: "text-[#1c3c3c] dark:text-[#9fe870]",
  Elasticsearch: "text-[#00bfb3]",
};

type Cluster = {
  title: string;
  skills?: readonly Skill[];
  concepts?: readonly string[];
};

function TechnologyChips({ skills, subdued = false }: { skills: readonly Skill[]; subdued?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <li key={skill.name} className={`flex min-h-8 items-center gap-2 rounded-md border px-2.5 py-1.5 ${subdued ? "border-border/70 bg-muted/30" : "border-border bg-background"}`}>
          <skill.icon className={`size-4 shrink-0 ${BRAND_ICON_CLASSES[skill.name] ?? "text-primary"}`} aria-hidden="true" />
          <span className={`text-sm leading-none ${subdued ? "text-muted-foreground" : "font-medium text-foreground"}`}>{skill.name}</span>
        </li>
      ))}
    </ul>
  );
}

function ConceptChips({ concepts, subdued = false }: { concepts: readonly string[]; subdued?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {concepts.map((concept) => <li key={concept} className={`rounded-md border px-2.5 py-1.5 text-sm leading-none ${subdued ? "border-border/70 bg-muted/30 text-muted-foreground" : "border-border bg-background text-foreground"}`}>{concept}</li>)}
    </ul>
  );
}

function ClusterList({ clusters, subdued = false }: { clusters: readonly Cluster[]; subdued?: boolean }) {
  return (
    <div className="space-y-3">
      {clusters.map((cluster, index) => (
        <div key={cluster.title} className={index > 0 ? "border-t border-border/60 pt-3" : ""}>
          <h4 className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{cluster.title}</h4>
          {cluster.skills && cluster.skills.length > 0 && <TechnologyChips skills={cluster.skills} subdued={subdued} />}
          {cluster.concepts && cluster.concepts.length > 0 && <div className={cluster.skills && cluster.skills.length > 0 ? "mt-2" : ""}><ConceptChips concepts={cluster.concepts} subdued={subdued} /></div>}
        </div>
      ))}
    </div>
  );
}

function CapabilityCard({
  title,
  icon: Icon,
  clusters,
  additional = [],
}: {
  title: string;
  icon?: SkillGroup["icon"];
  clusters: readonly Cluster[];
  additional?: readonly Cluster[];
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold leading-tight">
        {Icon && <Icon className="size-[1.125rem] shrink-0 text-primary" aria-hidden="true" />}
        {title}
      </h3>
      <ClusterList clusters={clusters} />
      {additional.length > 0 && (
        <Accordion type="single" collapsible className="mt-4 border-t border-border/70">
          <AccordionItem value="additional" className="border-0">
            <AccordionTrigger className="py-2.5 text-sm font-medium text-muted-foreground hover:no-underline [&>svg]:hidden">
              <span className="flex items-center gap-1.5">Additional skills <ChevronDown className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden="true" /></span>
            </AccordionTrigger>
            <AccordionContent className="pb-1 pt-1">
              <ClusterList clusters={additional} subdued />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}

export default function SkillsSection({ coreStack, groups }: { coreStack: readonly Skill[]; groups: readonly SkillGroup[] }) {
  const skillsByName = new Map<string, Skill>();
  [...coreStack, ...groups.flatMap((group) => group.technologies)].forEach((skill) => skillsByName.set(skill.name, skill));
  const getSkills = (names: readonly string[]) => names.flatMap((name) => {
    const skill = skillsByName.get(name);
    return skill ? [skill] : [];
  });
  const group = (name: string) => groups.find((item) => item.category === name);
  const concepts = (name: string) => group(name)?.concepts ?? [];

  return (
    <section id="skills" className="flex flex-col gap-5">
      <BlurFade delay={0.04}>
        <div className="flex items-center gap-2">
          <span className="h-5 w-1 rounded-full bg-primary" aria-hidden="true" />
          <h2 className="text-xl font-bold tracking-tight">Technical Skills</h2>
        </div>
      </BlurFade>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <BlurFade delay={0.08}>
          <CapabilityCard
            title="Data Engineering & Pipelines"
            icon={group("Data Engineering")?.icon}
            clusters={[
              { title: "Languages & Data", skills: getSkills(["Python", "SQL", "Pandas", "NumPy"]) },
              { title: "Distributed Processing", skills: getSkills(["Apache Spark", "PySpark"]) },
              { title: "Streaming", skills: getSkills(["Apache Kafka"]) },
              { title: "Orchestration & Transformation", skills: getSkills(["Apache Airflow", "dbt"]) },
              { title: "Data Engineering Concepts", concepts: ["ETL", "ELT", "Data Modeling", "Data Quality"] },
            ]}
            additional={[
              { title: "Storage & Warehousing", skills: getSkills(["Delta Lake", "PostgreSQL", "MySQL", "Microsoft SQL Server", "Oracle", "SQLite", "DuckDB"]) },
              { title: "Distributed Storage", skills: getSkills(["Hadoop", "HDFS"]) },
              { title: "Additional Methods", concepts: [...concepts("Programming & Query"), ...concepts("Data Engineering").filter((item) => !["ETL", "ELT", "Data Modeling", "Data Quality", "Pipeline Testing", "REST API Integration"].includes(item))] },
            ]}
          />
        </BlurFade>
        <BlurFade delay={0.11}>
          <CapabilityCard
            title="Analytics & Business Intelligence"
            icon={group("Analytics & BI")?.icon}
            clusters={[
              { title: "BI & Visualization", skills: getSkills(["Power BI", "Tableau", "Grafana"]) },
              { title: "Analysis", concepts: ["KPI Development", "Trend Analysis", "Root Cause Analysis"] },
            ]}
            additional={[
              { title: "Additional Tools", skills: getSkills(["Excel", "Streamlit", "Plotly", "Matplotlib", "Seaborn"]) },
              { title: "Additional Methods", concepts: concepts("Analytics & BI").filter((item) => !["KPI Development", "Trend Analysis", "Root Cause Analysis"].includes(item)) },
            ]}
          />
        </BlurFade>
        <BlurFade delay={0.14}>
          <CapabilityCard
            title="Data Science & Machine Learning"
            icon={group("Data Science & Machine Learning")?.icon}
            clusters={[
              { title: "Libraries & Frameworks", skills: getSkills(["scikit-learn", "XGBoost", "R"]) },
              { title: "Modeling", concepts: ["Predictive Modeling", "Regression", "Time-Series Forecasting"] },
              { title: "Evaluation & Features", concepts: ["Feature Engineering", "Model Evaluation"] },
            ]}
            additional={[
              { title: "Additional Methods", concepts: concepts("Data Science & Machine Learning").filter((item) => !["Predictive Modeling", "Regression", "Time-Series Forecasting", "Feature Engineering", "Model Evaluation"].includes(item)) },
            ]}
          />
        </BlurFade>
        <BlurFade delay={0.17}>
          <CapabilityCard
            title="Cloud & Data Platforms"
            icon={group("Cloud & Data Platforms")?.icon}
            clusters={[
              { title: "Cloud", skills: getSkills(["Azure", "Google Cloud Platform"]) },
              { title: "Data & Lakehouse Platforms", skills: getSkills(["Microsoft Fabric", "Databricks", "Snowflake"]) },
            ]}
            additional={[
              { title: "Fabric & Azure Services", skills: getSkills(["OneLake", "Fabric Lakehouse", "Fabric Warehouse", "Fabric Data Pipelines", "Fabric Data Factory", "Dataflows Gen2", "Fabric Spark", "Fabric SQL", "Real-Time Intelligence", "Azure Data Factory", "Azure Blob Storage", "Azure Databricks"]) },
              { title: "Additional Cloud", skills: getSkills(["AWS", "Amazon S3", "Amazon EC2", "Amazon Redshift", "AWS IAM", "Oracle Cloud / OCI"]) },
              { title: "Platform Methods", concepts: concepts("Microsoft Fabric & Azure") },
            ]}
          />
        </BlurFade>
        <BlurFade delay={0.2}>
          <CapabilityCard
            title="Applied AI"
            icon={group("AI / LLM / RAG")?.icon}
            clusters={[
              { title: "LLM Applications", skills: getSkills(["LangChain"]), concepts: ["RAG", "LLM Applications"] },
              { title: "Retrieval", skills: getSkills(["FAISS", "Elasticsearch"]), concepts: ["Vector Search", "Embeddings"] },
              { title: "Agentic Systems", concepts: ["MCP / Model Context Protocol", "AI Agents / Agentic Workflows"] },
            ]}
            additional={[
              { title: "Additional Methods", concepts: concepts("AI / LLM / RAG").filter((item) => !["RAG", "LLM Applications", "Vector Search", "Embeddings", "MCP / Model Context Protocol", "AI Agents / Agentic Workflows"].includes(item)) },
            ]}
          />
        </BlurFade>
        <BlurFade delay={0.23}>
          <CapabilityCard
            title="Engineering & Delivery"
            icon={group("DevOps / Delivery / Collaboration")?.icon}
            clusters={[
              { title: "Source Control", skills: getSkills(["Git", "GitHub"]) },
              { title: "Containers", skills: getSkills(["Docker"]) },
              { title: "CI/CD & Delivery", concepts: ["CI/CD", "MLOps", "Deployment Workflows"] },
            ]}
            additional={[
              { title: "Additional Tools", skills: getSkills(["Kubernetes", "Linux"]) },
              { title: "Additional Methods", concepts: concepts("DevOps / Delivery / Collaboration").filter((item) => !["CI/CD", "MLOps", "Deployment Workflows", "Model Evaluation"].includes(item)) },
            ]}
          />
        </BlurFade>
      </div>
    </section>
  );
}
