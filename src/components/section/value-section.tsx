import BlurFade from "@/components/magicui/blur-fade";
import { BarChart3, BrainCircuit, CloudCog, Workflow } from "lucide-react";

const valueCards = [
  {
    title: "Data Engineering & Modernization",
    description: "Build reliable pipelines, data models, and cloud platforms while replacing fragmented or manual workflows with scalable tooling.",
    areas: "ETL / ELT   ·   Spark   ·   Kafka   ·   Airflow   ·   dbt   ·   Fabric   ·   Azure   ·   Snowflake",
    icon: Workflow,
  },
  {
    title: "Analytics & Business Intelligence",
    description: "Turn operational data into trusted metrics, dashboards, analytical models, and decision-ready insights.",
    areas: "SQL   ·   Power BI   ·   Tableau   ·   Grafana   ·   KPIs   ·   Root cause analysis",
    icon: BarChart3,
  },
  {
    title: "Data Science & MLOps",
    description: "Build and evaluate predictive models while connecting feature engineering and experimentation to testing, deployment, and monitoring.",
    areas: "scikit-learn   ·   XGBoost   ·   Forecasting   ·   Model evaluation   ·   CI/CD",
    icon: CloudCog,
  },
  {
    title: "Applied AI & Agentic Systems",
    description: "Build grounded AI applications with retrieval, LLM workflows, tool integration, and agentic patterns for practical tasks.",
    areas: "RAG   ·   LangChain   ·   MCP   ·   Agentic workflows   ·   Vector search",
    icon: BrainCircuit,
  },
] as const;

export default function ValueSection() {
  return (
    <section id="value" className="flex flex-col gap-5">
      <BlurFade delay={0.04}>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Where I Add Value</h2>
          <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">From raw data to decisions, deployed models, and intelligent systems.</p>
        </div>
      </BlurFade>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {valueCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <BlurFade key={card.title} delay={0.08 + index * 0.03}>
              <article className="h-full rounded-xl border border-border bg-card/70 p-4 transition-colors hover:border-primary/25 hover:bg-primary/[0.025]">
                <Icon className="size-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 text-base font-semibold leading-snug">{card.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                <p className="mt-3 text-xs leading-relaxed text-primary/85">{card.areas}</p>
              </article>
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
}
