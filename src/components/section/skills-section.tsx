"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { GitHubIcon } from "@/components/icons";
import { AzureDataFactoryIcon } from "@/components/technology-icons";
import { DATA, type Skill, type SkillGroup } from "@/data/resume";
import { BrainCircuit, ChevronRight, Database, GitBranch, ScanSearch, Workflow, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { FaAws } from "react-icons/fa";
import { GrOracle } from "react-icons/gr";
import { IoLogoTableau } from "react-icons/io5";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { DiMsqlServer } from "react-icons/di";
import {
  SiApachecassandra,
  SiApachehadoop,
  SiApachehive,
  SiApachekafka,
  SiApachespark,
  SiDatabricks,
  SiElasticsearch,
  SiGithubactions,
  SiGooglebigquery,
  SiGooglecloudstorage,
  SiHuggingface,
  SiJenkins,
  SiJira,
  SiKeras,
  SiKubernetes,
  SiLanggraph,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiPostman,
  SiGooglepubsub,
  SiPytorch,
  SiSqlite,
  SiTerraform,
  SiTensorflow,
  SiConfluence,
} from "react-icons/si";
import { TbBrandOpenai } from "react-icons/tb";
import { VscAzure, VscAzureDevops } from "react-icons/vsc";
import { Docker } from "@/components/ui/svgs/docker";

type DisplaySkill = { name: string; icon?: Skill["icon"] };
type DetailGroup = { title: string; technologies?: readonly DisplaySkill[]; capabilities?: readonly string[] };
type SkillCategory = {
  id: string;
  title: string;
  icon?: SkillGroup["icon"];
  featuredTools: readonly DisplaySkill[];
  featuredCapabilities: readonly string[];
  detailGroups: readonly DetailGroup[];
};

type AssetIconProps = { className?: string };

function TechnologyAssetIcon({ src, alt, className }: AssetIconProps & { src: string; alt: string }) {
  return <Image src={src} alt="" width={20} height={20} className={`object-contain ${className ?? ""}`} aria-hidden="true" data-technology-logo={alt} />;
}

const ApacheAirflowLogo = (props: AssetIconProps) => <TechnologyAssetIcon src="/apache-airflow.png" alt="Apache Airflow" {...props} />;
const DbtLogo = (props: AssetIconProps) => <TechnologyAssetIcon src="/dbt.png" alt="dbt" {...props} />;
const MicrosoftFabricLogo = (props: AssetIconProps) => <TechnologyAssetIcon src="/microsoft-fabric.svg" alt="Microsoft Fabric" {...props} />;
const PowerBiLogo = (props: AssetIconProps) => <TechnologyAssetIcon src="/power-bi.svg" alt="Power BI" {...props} />;

const BRAND_ICON_CLASSES: Record<string, string> = {
  Python: "text-[#3776ab]",
  SQL: "text-primary",
  R: "text-[#276dc3]",
  Pandas: "text-[#150458] dark:text-[#9b8cff]",
  NumPy: "text-[#4dabcf]",
  "Apache Spark (PySpark)": "text-[#e25a1c]",
  "Apache Spark": "text-[#e25a1c]",
  PySpark: "text-[#e25a1c]",
  "Apache Kafka": "text-[#111827] dark:text-white",
  // These image assets carry their own native brand colors.
  "Apache Airflow": "",
  Hadoop: "text-[#222222] dark:text-white",
  HDFS: "text-[#222222] dark:text-white",
  Hive: "text-[#fdee21]",
  "Delta Lake": "text-[#e15759]",
  dbt: "",
  "Power BI": "",
  "Power BI Service": "",
  "Microsoft SQL Server": "text-[#cc2927]",
  Cassandra: "text-[#1287b1]",
  Oracle: "text-[#c74634]",
  "Oracle Database": "text-[#c74634]",
  Tableau: "text-[#e97627]",
  Excel: "text-[#217346]",
  Streamlit: "text-[#ff4b4b]",
  Grafana: "text-[#f46800]",
  Matplotlib: "text-[#11557c]",
  Seaborn: "text-[#4c72b0]",
  Plotly: "text-[#3f4f75]",
  "scikit-learn": "text-[#f89939]",
  Azure: "text-[#0078d4]",
  "Microsoft Azure": "text-[#0078d4]",
  "Google Cloud": "text-[#4285f4]",
  "Google Cloud Platform": "text-[#4285f4]",
  "Microsoft Fabric": "",
  AWS: "text-[#ff9900]",
  "Azure Data Factory": "",
  "Oracle Cloud": "text-[#c74634]",
  Databricks: "text-[#ff3621]",
  Snowflake: "text-[#29b5e8]",
  PostgreSQL: "text-[#336791]",
  MySQL: "text-[#4479a1]",
  MongoDB: "text-[#47a248]",
  SQLite: "text-[#003b57]",
  DuckDB: "text-[#fff000]",
  TensorFlow: "text-[#ff6f00]",
  Keras: "text-[#d00000]",
  PyTorch: "text-[#ee4c2c]",
  Git: "text-[#f05032]",
  GitHub: "text-[#181717] dark:text-white",
  "GitHub Actions": "text-[#2088ff]",
  Docker: "text-[#008fe2]",
  Terraform: "text-[#7b42bc]",
  Kubernetes: "text-[#326ce5]",
  "Azure DevOps": "text-[#0078d7]",
  Linux: "text-[#fcc624]",
  Jenkins: "text-[#d24939]",
  Postman: "text-[#ff6c37]",
  Jira: "text-[#0052cc]",
  Confluence: "text-[#1868db]",
  LangChain: "text-[#1c3c3c] dark:text-[#9fe870]",
  LangGraph: "text-[#1c3c3c] dark:text-[#9fe870]",
  "OpenAI API": "text-foreground",
  "Hugging Face": "text-[#ffd21e]",
  BigQuery: "text-[#4285f4]",
  "Amazon S3": "text-[#ff9900]",
  "Amazon EC2": "text-[#ff9900]",
  "Amazon Redshift": "text-[#ff9900]",
  "AWS IAM": "text-[#ff9900]",
  S3: "text-[#ff9900]",
  EC2: "text-[#ff9900]",
  IAM: "text-[#ff9900]",
  Redshift: "text-[#ff9900]",
  EMR: "text-[#ff9900]",
  Glue: "text-[#ff9900]",
  Lambda: "text-[#ff9900]",
  "Azure Databricks": "text-[#ff3621]",
  Elasticsearch: "text-[#00bfb3]",
};

// One resolver map keeps brand icons, service-specific marks, and intentional
// text-only fallbacks consistent across chips and the full-stack dialog.
const technologyIcons: Record<string, Skill["icon"] | null> = {
  SQL: Database,
  "Apache Spark": SiApachespark,
  PySpark: SiApachespark,
  "Spark SQL": null,
  Hadoop: SiApachehadoop,
  Hive: SiApachehive,
  HDFS: SiApachehadoop,
  MapReduce: null,
  "Delta Lake": null,
  "Apache Kafka": SiApachekafka,
  "Apache Airflow": ApacheAirflowLogo,
  dbt: DbtLogo,
  Azure: VscAzure,
  "Microsoft Fabric": MicrosoftFabricLogo,
  "Azure Data Factory": AzureDataFactoryIcon,
  "Power BI": PowerBiLogo,
  Tableau: IoLogoTableau,
  Excel: PiMicrosoftExcelLogoFill,
  Matplotlib: null,
  Seaborn: null,
  "OpenAI API": TbBrandOpenai,
  "Microsoft SQL Server": DiMsqlServer,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Cassandra: SiApachecassandra,
  DynamoDB: Database,
  "Cosmos DB": Database,
  Oracle: GrOracle,
  "Oracle Database": GrOracle,
  SQLite: SiSqlite,
  Elasticsearch: SiElasticsearch,
  BigQuery: SiGooglebigquery,
  Chroma: Database,
  "Azure Blob Storage": null,
  "Azure DevOps": VscAzureDevops,
  "Agile / Scrum": null,
  "Agile/Scrum": null,
  "CI/CD Pipelines": null,
  FAISS: ScanSearch,
  LlamaIndex: null,
  Transformers: null,
  "Sentence Transformers": null,
  XGBoost: BrainCircuit,
  FastAPI: null,
  "Google Cloud Storage": SiGooglecloudstorage,
  "Compute Engine": null,
  "Cloud Run": null,
  "Cloud Functions": null,
  GKE: null,
  "Pub/Sub": SiGooglepubsub,
  "Oracle Cloud / OCI": GrOracle,
  "ADLS Gen2": null,
  OneLake: null,
  "Fabric Lakehouse": null,
  "Fabric Warehouse": null,
  "Fabric Data Pipelines": null,
  "Fabric Data Factory": Workflow,
  "Dataflows Gen2": null,
  "Fabric Spark": null,
  "Fabric SQL": null,
  "Real-Time Intelligence": null,
  "Azure Synapse Analytics": null,
  "Azure Functions": null,
  "Azure Logic Apps": null,
  "Azure Key Vault": null,
  "Fabric Data Factory / Pipelines": Workflow,
  "Fabric Notebooks": null,
  "Power BI Service": PowerBiLogo,
  "Synapse SQL Pools": null,
  "Amazon S3": null,
  "Amazon EC2": null,
  "Amazon Redshift": null,
  "AWS IAM": null,
  "Azure OpenAI": null,
  "Gemini API": null,
  "Claude API": null,
  S3: FaAws,
  EC2: FaAws,
  IAM: FaAws,
  Redshift: FaAws,
  EMR: FaAws,
  Glue: FaAws,
  Lambda: FaAws,
  "Databricks SQL": SiDatabricks,
  "GitHub Actions": SiGithubactions,
  "Hugging Face": SiHuggingface,
  LangGraph: SiLanggraph,
  TensorFlow: SiTensorflow,
  PyTorch: SiPytorch,
  Keras: SiKeras,
  Git: GitBranch,
  GitHub: GitHubIcon,
  Docker: Docker,
  Terraform: SiTerraform,
  Kubernetes: SiKubernetes,
  Linux: SiLinux,
  Jira: SiJira,
  Confluence: SiConfluence,
  Jenkins: SiJenkins,
  Postman: SiPostman,
  "Cloud Code": null,
};

function TechnologyChips({ skills, emphasis = "standard" }: { skills: readonly DisplaySkill[]; emphasis?: "core" | "standard" }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <li key={skill.name} className={emphasis === "core" ? "flex min-h-9 items-center gap-2 rounded-md border border-primary/25 bg-primary/[0.045] px-3 py-1.5" : "flex min-h-8 items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5"}>
          {skill.icon && <skill.icon className={`size-4 shrink-0 ${BRAND_ICON_CLASSES[skill.name] ?? "text-primary"}`} aria-hidden="true" />}
          <span className={`${emphasis === "core" ? "font-semibold" : "font-medium"} text-sm leading-none text-foreground`}>{skill.name}</span>
        </li>
      ))}
    </ul>
  );
}

function CapabilitySummary({ items }: { items: readonly string[] }) {
  return <div className="border-t border-border/60 pt-3"><p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Capabilities</p><p className="text-sm leading-6 text-muted-foreground">{items.join(" · ")}</p></div>;
}

function DetailGroups({ groups }: { groups: readonly DetailGroup[] }) {
  return <div className="space-y-5">{groups.map((group) => <div key={group.title} className="space-y-2"><h4 className="text-sm font-semibold text-foreground">{group.title}</h4>{group.technologies && <TechnologyChips skills={group.technologies} />}{group.capabilities && <p className="text-sm leading-6 text-muted-foreground">{group.capabilities.join(" · ")}</p>}</div>)}</div>;
}

function SkillsDetailDialog({ category, dialogRef, onClose }: { category: SkillCategory | null; dialogRef: RefObject<HTMLDialogElement | null>; onClose: () => void }) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") return;
    const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };

  return <dialog ref={dialogRef} onClose={onClose} onKeyDown={handleKeyDown} aria-labelledby="skills-dialog-title" className="m-auto max-h-[min(800px,calc(100vh-2rem))] w-[min(720px,calc(100%-2rem))] rounded-xl border border-border bg-background p-0 text-foreground shadow-2xl backdrop:bg-black/40">
    {category && <div className="flex max-h-[min(800px,calc(100vh-2rem))] flex-col"><div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6"><div><p className="mb-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-primary">Full stack</p><h2 id="skills-dialog-title" className="text-lg font-semibold">{category.title}</h2></div><button type="button" autoFocus onClick={() => dialogRef.current?.close()} aria-label="Close skill details" className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><X className="size-5" aria-hidden="true" /></button></div><div className="overflow-y-auto px-5 py-5 sm:px-6"><DetailGroups groups={category.detailGroups} /></div></div>}
  </dialog>;
}

function SkillCard({ category, onOpen }: { category: SkillCategory; onOpen: (category: SkillCategory, trigger: HTMLButtonElement) => void }) {
  const Icon = category.icon;
  return <div className="flex h-full flex-col rounded-xl border border-border bg-card p-4 sm:p-5"><h3 className="mb-3 flex items-center gap-2 text-base font-semibold leading-tight">{Icon && <Icon className="size-[1.125rem] shrink-0 text-primary" aria-hidden="true" />}{category.title}</h3><div className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Technologies</div><TechnologyChips skills={category.featuredTools} /><div className="mt-4"><CapabilitySummary items={category.featuredCapabilities} /></div><button type="button" onClick={(event) => onOpen(category, event.currentTarget)} aria-haspopup="dialog" aria-label={`View full stack for ${category.title}`} className="mt-auto flex w-fit items-center gap-1 pt-4 text-sm font-medium text-primary transition-colors hover:text-primary/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"><span>View full stack</span><ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></button></div>;
}

function SupportingCard({ category, onOpen }: { category: SkillCategory; onOpen: (category: SkillCategory, trigger: HTMLButtonElement) => void }) {
  const Icon = category.icon;
  return <div className="flex h-full flex-col rounded-xl border border-border/70 bg-muted/20 p-4 sm:p-5"><h3 className="mb-3 flex items-center gap-2 text-base font-semibold leading-tight">{Icon && <Icon className="size-[1.125rem] shrink-0 text-primary" aria-hidden="true" />}{category.title}</h3><TechnologyChips skills={category.featuredTools} /><button type="button" onClick={(event) => onOpen(category, event.currentTarget)} aria-haspopup="dialog" aria-label={`View full stack for ${category.title}`} className="mt-4 flex w-fit items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"><span>View full stack</span><ChevronRight className="size-4" aria-hidden="true" /></button></div>;
}

export default function SkillsSection() {
  const { coreStack, skillGroups: groups } = DATA;
  const skillsByName = new Map<string, Skill>();
  [...coreStack, ...groups.flatMap((group) => group.technologies)].forEach((skill) => skillsByName.set(skill.name, skill));
  const getSkill = (sourceName: string, displayName = sourceName): DisplaySkill => {
    const source = skillsByName.get(sourceName);
    const icon = Object.prototype.hasOwnProperty.call(technologyIcons, sourceName) ? technologyIcons[sourceName] : source?.icon ?? null;
    return { name: displayName, icon: icon ?? undefined };
  };
  const getSkills = (names: readonly string[]) => names.map((name) => getSkill(name));
  const getGroupIcon = (name: string) => groups.find((group) => group.category === name)?.icon;
  const detailTechnologyGroup = (title: string, names: readonly string[]) => ({ title, technologies: getSkills(names) });
  const detailCapabilityGroup = (title: string, items: readonly string[]) => ({ title, capabilities: items });
  const category = (id: string, title: string, icon: SkillGroup["icon"], featuredTools: readonly string[], featuredCapabilities: readonly string[], detailGroups: readonly DetailGroup[]): SkillCategory => ({ id, title, icon, featuredTools: getSkills(featuredTools).map((skill) => {
    if (title === "Data Engineering & Big Data" && skill.name === "Apache Spark") return { ...skill, name: "Apache Spark (PySpark)" };
    if (title === "Cloud & Data Platforms" && skill.name === "Azure") return { ...skill, name: "Microsoft Azure" };
    if (title === "Cloud & Data Platforms" && skill.name === "Google Cloud Platform") return { ...skill, name: "Google Cloud" };
    if (title === "Cloud & Data Platforms" && skill.name === "Oracle Cloud / OCI") return { ...skill, name: "Oracle Cloud" };
    return skill;
  }), featuredCapabilities, detailGroups });

  const primaryCategories: SkillCategory[] = [
    category("programming", "Programming & Querying", getGroupIcon("Programming & Query"), ["Python", "SQL", "R", "Pandas", "NumPy"], ["CTEs", "Window Functions", "Stored Procedures", "Query Optimization"], [detailTechnologyGroup("Technologies", ["Python", "SQL", "R", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly"]), detailCapabilityGroup("SQL / Querying", ["CTEs", "Window Functions", "Stored Procedures", "Query Optimization"]), detailCapabilityGroup("Capability", ["Data Manipulation"])]),
    category("data-engineering", "Data Engineering & Big Data", getGroupIcon("Data Engineering"), ["Apache Spark", "Apache Kafka", "Apache Airflow", "dbt", "Databricks", "Azure Data Factory"], ["ETL / ELT", "Batch & Streaming", "Data Modeling", "Data Quality"], [detailTechnologyGroup("Distributed & Big Data", ["Apache Spark", "PySpark", "Spark SQL", "Hadoop", "Hive", "HDFS", "MapReduce", "Delta Lake"]), detailTechnologyGroup("Pipelines & Orchestration", ["Apache Kafka", "Apache Airflow", "dbt", "Azure Data Factory"]), detailCapabilityGroup("Pipelines & Integration", ["ETL / ELT", "Pipeline Development", "Batch Processing", "Streaming / Real-Time Processing", "CDC", "REST API Integration", "FastAPI Integration"]), detailCapabilityGroup("Modeling & Quality", ["Data Modeling", "Dimensional Modeling", "Star Schema", "Data Warehousing", "Data Quality", "Data Validation", "Data Reconciliation", "Data Profiling", "Schema Evolution", "Data Partitioning"])]),
    category("analytics", "Analytics & BI", getGroupIcon("Analytics & BI"), ["Power BI", "Tableau", "Excel", "Streamlit", "Grafana"], ["DAX", "Power Query", "EDA", "KPI Development", "Dashboarding"], [detailTechnologyGroup("Tools", ["Power BI", "Tableau", "Excel", "Streamlit", "Grafana", "Matplotlib", "Seaborn", "Plotly"]), detailCapabilityGroup("Power BI / Excel", ["DAX", "Power Query", "Pivot Tables", "VLOOKUP / XLOOKUP"]), detailCapabilityGroup("Analytics", ["EDA", "KPI Development", "Dashboarding", "Trend Analysis", "Root Cause Analysis", "Data Storytelling", "Ad Hoc Reporting", "Segmentation", "A/B Testing", "Hypothesis Testing", "Statistical Analysis"]), detailCapabilityGroup("Business / Governance", ["Requirements Gathering", "UAT / Report Validation", "Data Governance", "Data Lineage", "Data Dictionary"])]),
    category("machine-learning", "Data Science & Machine Learning", getGroupIcon("Data Science & Machine Learning"), ["scikit-learn", "XGBoost", "TensorFlow", "Keras", "PyTorch"], ["Classification", "Regression", "Forecasting", "Feature Engineering", "Model Evaluation"], [detailTechnologyGroup("Libraries", ["scikit-learn", "XGBoost", "TensorFlow", "Keras", "PyTorch"]), detailCapabilityGroup("Algorithms & Modeling", ["Linear Regression", "Logistic Regression", "Random Forest", "Gradient Boosting", "Decision Trees", "KNN", "SVM", "K-Means / Clustering", "Classification", "Regression Modeling"]), detailCapabilityGroup("Time Series", ["Time-Series Forecasting", "ARIMA / SARIMA"]), detailCapabilityGroup("Model Development", ["Feature Engineering", "Feature Selection", "Model Evaluation", "Cross Validation", "Anomaly Detection", "Imbalanced Data Handling", "Statistical Modeling", "Experiment Design", "NLP"])]),
    category("applied-ai", "Applied AI & Agents", getGroupIcon("AI / LLM / RAG"), ["LangChain", "LangGraph", "OpenAI API", "FAISS", "Hugging Face", "Chroma"], ["RAG", "MCP", "AI Agents", "Vector Search", "Tool Calling"], [detailTechnologyGroup("Frameworks & APIs", ["LangChain", "LangGraph", "LlamaIndex", "OpenAI API", "Azure OpenAI", "Gemini API", "Claude API", "Hugging Face", "Transformers", "Sentence Transformers"]), detailCapabilityGroup("Retrieval & RAG", ["RAG", "Advanced RAG", "Embeddings", "Vector Search", "Semantic Search", "Hybrid Search", "Reranking", "Document Chunking"]), detailCapabilityGroup("Agents & Tool Use", ["MCP", "AI Agents", "Agentic Workflows", "Multi-Agent Systems", "ReAct Agents", "Agent Memory", "Function Calling", "Tool Calling", "Structured Outputs", "JSON Mode"]), detailCapabilityGroup("Evaluation & Safety", ["Retrieval Evaluation", "RAG Evaluation", "LLM Evaluation", "Guardrails", "Safety Checks"]), detailCapabilityGroup("LLM Engineering", ["Prompt Engineering", "Fine-Tuning", "LoRA / PEFT", "Quantization", "vLLM", "Ollama"]), detailCapabilityGroup("Applications", ["OCR / Document Processing", "PDF / Document Q&A", "Chatbots / Conversational AI", "Streamlit AI Apps", "FastAPI AI Backends"]), detailTechnologyGroup("Retrieval tooling", ["FAISS", "Chroma", "Elasticsearch"])]),
    category("cloud", "Cloud & Data Platforms", getGroupIcon("Cloud & Data Platforms"), ["AWS", "Azure", "Microsoft Fabric", "Google Cloud Platform", "Oracle Cloud / OCI"], ["Cloud Data", "Lakehouse", "Serverless", "Big Data", "Containers"], [detailTechnologyGroup("Azure", ["Azure Blob Storage", "ADLS Gen2", "Azure Data Factory", "Azure Synapse Analytics", "Azure Functions", "Azure Logic Apps", "Azure Key Vault", "Azure DevOps", "Azure Databricks"]), detailTechnologyGroup("Microsoft Fabric", ["OneLake", "Fabric Data Factory / Pipelines", "Fabric Lakehouse", "Fabric Warehouse", "Fabric Notebooks", "Power BI Service"]), detailTechnologyGroup("Google Cloud", ["BigQuery", "Google Cloud Storage", "Compute Engine", "Cloud Run", "Cloud Functions", "GKE", "Pub/Sub", "Cloud Code"]), detailTechnologyGroup("AWS", ["S3", "EC2", "IAM", "Redshift", "EMR", "Glue", "Lambda"]), detailTechnologyGroup("Additional Platforms", ["Oracle Cloud / OCI", "Databricks"])]),
  ];

  const supportingCategories: SkillCategory[] = [
    category("data-stores", "Data Stores & Retrieval", getGroupIcon("Databases & Warehouses"), ["PostgreSQL", "Microsoft SQL Server", "MySQL", "MongoDB", "Snowflake", "Elasticsearch"], [], [detailTechnologyGroup("Relational", ["PostgreSQL", "MySQL", "Microsoft SQL Server", "Oracle Database", "SQLite", "DuckDB"]), detailTechnologyGroup("NoSQL", ["MongoDB", "Cassandra", "DynamoDB", "Cosmos DB"]), detailTechnologyGroup("Analytical / Warehouse", ["Snowflake", "BigQuery", "Amazon Redshift", "Fabric Warehouse", "Synapse SQL Pools", "Databricks SQL"]), detailTechnologyGroup("Search & Vector", ["Elasticsearch", "FAISS", "Chroma"])]),
    category("engineering", "Engineering & Delivery", getGroupIcon("DevOps / Delivery / Collaboration"), ["Git", "GitHub", "Docker", "Terraform", "Kubernetes", "Azure DevOps"], [], [detailTechnologyGroup("Source Control", ["Git", "GitHub"]), detailTechnologyGroup("CI/CD", ["GitHub Actions", "Jenkins", "Azure DevOps", "CI/CD Pipelines"]), detailTechnologyGroup("Infrastructure & Containers", ["Docker", "Kubernetes", "Terraform", "Linux"]), detailTechnologyGroup("Development / Testing", ["Postman"]), detailTechnologyGroup("Collaboration", ["Jira", "Confluence"]), detailCapabilityGroup("Ways of Working", ["Agile / Scrum"]), detailCapabilityGroup("ML Delivery", ["MLOps", "Model Deployment"])]),
  ];

  const coreSkills: DisplaySkill[] = [getSkill("Python"), getSkill("SQL"), getSkill("Apache Spark", "Apache Spark (PySpark)"), getSkill("Apache Kafka"), getSkill("Apache Airflow"), getSkill("Azure"), getSkill("Microsoft Fabric"), getSkill("Databricks"), getSkill("Snowflake"), getSkill("Power BI"), getSkill("scikit-learn"), getSkill("LangChain")];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(null);

  useEffect(() => {
    if (!selectedCategory || !dialogRef.current) return;
    const dialog = dialogRef.current;
    dialog.showModal();
    return () => { if (dialog.open) dialog.close(); };
  }, [selectedCategory]);

  const openDetails = (categoryToOpen: SkillCategory, trigger: HTMLButtonElement) => { triggerRef.current = trigger; setSelectedCategory(categoryToOpen); };
  const closeDetails = () => { setSelectedCategory(null); requestAnimationFrame(() => triggerRef.current?.focus()); };

  return <section id="skills" className="flex flex-col gap-5">
    <BlurFade delay={0.04}><div className="flex items-center gap-2"><span className="h-5 w-1 rounded-full bg-primary" aria-hidden="true" /><h2 className="text-xl font-bold tracking-tight">Technical Skills</h2></div></BlurFade>
    <BlurFade delay={0.08}><div className="rounded-xl border border-primary/25 bg-primary/[0.025] p-4 sm:p-5"><p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-primary">Core Tech Stack</p><TechnologyChips skills={coreSkills} emphasis="core" /></div></BlurFade>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">{primaryCategories.map((categoryItem, index) => <BlurFade key={categoryItem.id} delay={0.12 + index * 0.03} className="h-full"><SkillCard category={categoryItem} onOpen={openDetails} /></BlurFade>)}</div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{supportingCategories.map((categoryItem, index) => <BlurFade key={categoryItem.id} delay={0.3 + index * 0.03} className="h-full"><SupportingCard category={categoryItem} onOpen={openDetails} /></BlurFade>)}</div>
    <SkillsDetailDialog category={selectedCategory} dialogRef={dialogRef} onClose={closeDetails} />
  </section>;
}
