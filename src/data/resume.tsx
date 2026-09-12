import { GitHubIcon, Icons } from "@/components/icons";
import { AzureDataFactoryIcon } from "@/components/technology-icons";
import { BarChart3, BrainCircuit, Cloud, CloudCog, Code2, Database, FileTextIcon, GitBranch, HomeIcon, Layers3, Workflow, type LucideIcon } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Python } from "@/components/ui/svgs/python";
import { FaAws, FaRProject } from "react-icons/fa";
import {
  SiApacheairflow,
  SiApachehadoop,
  SiApachekafka,
  SiApachespark,
  SiDatabricks,
  SiDelta,
  SiDuckdb,
  SiElasticsearch,
  SiGit,
  SiGooglecloud,
  SiGrafana,
  SiLangchain,
  SiLinux,
  SiMysql,
  SiNumpy,
  SiPandas,
  SiPlotly,
  SiScikitlearn,
  SiSnowflake,
  SiSqlite,
  SiStreamlit,
  SiWipro,
} from "react-icons/si";

export interface Skill { name: string; icon: ComponentType<{ className?: string }>; }
export interface SkillGroup { category: string; technologies: readonly Skill[]; concepts: readonly string[]; icon?: LucideIcon; }
export interface WorkExperience { company: string; title: string; logoUrl?: string; logo?: ComponentType<{ className?: string }>; location?: string; start: string; end?: string; summary?: string; highlights?: readonly string[]; additionalHighlights?: readonly string[]; }
export interface Education { school: string; initials: string; degree: string; field?: string; affiliatedCollege?: string; href?: string; logoUrl?: string; start?: string; end?: string; gpa?: string; location?: string; }
export interface Project { canonicalId: string; title: string; categories: readonly string[]; problem: string; build?: string; approach: readonly string[]; scale?: string; outcome: string; metrics?: readonly string[]; venue?: string; badge?: string; date?: string; status?: string; featured?: boolean; research?: boolean; featuredMetric?: string; featuredMetricLabel?: string; githubUrl?: string; demoUrl?: string; architectureUrl?: string; caseStudyUrl?: string; paperUrl?: string; coverImage?: string; demoVideo?: string; image?: string; video?: string; }
export interface PublicationAchievement { type: "Publication" | "Achievement / Award" | "Participation"; title: string; organization: string; date?: string; description: string; href?: string; badge?: string; project?: string; highlight?: string; technologies?: readonly string[]; }
export interface Certification { name: string; issuer: string; initials: string; subtitle?: string; date?: string; year?: string; credentialId?: string; href?: string; logoUrl?: string; }
export interface GitHubActivity { profileUrl: string; imageUrl: string; alt: string; }
export interface LeadershipRole { title: string; start: string; end: string; }
export interface LeadershipEntry { organization: string; initials: string; roles: readonly LeadershipRole[]; description?: string; secondary?: boolean; }
export interface Hackathon { title: string; dates?: string; location?: string; description?: string; image?: string; links?: readonly { title: string; href: string; icon?: ReactNode }[]; }

const withIcon = (names: readonly string[], icon: ComponentType<{ className?: string }>): Skill[] => names.map((name) => ({ name, icon }));

const CORE_STACK: Skill[] = [
  { name: "Python", icon: Python },
  { name: "SQL", icon: Database },
  { name: "Apache Spark", icon: SiApachespark },
  { name: "Apache Kafka", icon: SiApachekafka },
  { name: "Apache Airflow", icon: SiApacheairflow },
  { name: "Azure", icon: CloudCog },
  { name: "Microsoft Fabric", icon: Layers3 },
  { name: "Databricks", icon: SiDatabricks },
  { name: "Snowflake", icon: SiSnowflake },
  { name: "Power BI", icon: BarChart3 },
  { name: "scikit-learn", icon: SiScikitlearn },
  { name: "LangChain", icon: SiLangchain },
];

export const DATA = {
  name: "Harish Namasivayam Muthuswamy",
  initials: "HNM",
  role: "Data Engineering   ·   Analytics   ·   ML/AI   ·   MLOps",
  breadth: "Data & Analytics Engineer with 2+ years of experience building modern data platforms and applied AI systems across financial services and manufacturing.",
  url: "https://harishmuthuswamy.com",
  location: "Chicago, IL",
  description: "My work spans data pipelines, analytics, machine learning, MLOps, RAG, and agentic workflows, from ingestion and modeling through deployment.",
  summary: "I build data systems that make messy operational data easier to trust, understand, and use.\n\nMy work has covered data engineering, analytics, predictive modeling, and applied AI across financial services and manufacturing. I have worked on everything from data pipelines and reporting to ML workflows and RAG applications. What matters to me is building something that works well, can be maintained, and is actually useful to the people using it.",
  avatarUrl: "/me.jpg",
  heroHighlights: [
    { label: "IEEE Research", kind: "credential" },
    { label: "LA Hacks Challenge Winner", kind: "credential" },
  ],
  coreStack: CORE_STACK,
  skillGroups: [
    { category: "Programming & Query", icon: Code2, technologies: [{ name: "Python", icon: Python }, { name: "SQL", icon: Database }, { name: "R", icon: FaRProject }, { name: "PySpark", icon: SiApachespark }, { name: "Pandas", icon: SiPandas }, { name: "NumPy", icon: SiNumpy }], concepts: ["CTEs", "Window Functions", "Stored Procedures", "Query Optimization", "Complex Joins", "Data Manipulation"] },
    { category: "Data Engineering", icon: Workflow, technologies: [{ name: "Apache Spark", icon: SiApachespark }, { name: "PySpark", icon: SiApachespark }, { name: "Apache Kafka", icon: SiApachekafka }, { name: "Apache Airflow", icon: SiApacheairflow }, { name: "dbt", icon: Workflow }, { name: "Delta Lake", icon: SiDelta }, { name: "Hadoop", icon: SiApachehadoop }, { name: "HDFS", icon: SiApachehadoop }], concepts: ["ETL", "ELT", "Data Pipelines", "Data Modeling", "Dimensional Modeling", "Star Schema", "Fact & Dimension Design", "Data Warehousing", "Medallion Architecture", "Data Validation", "Data Profiling", "Data Reconciliation", "Data Quality", "Pipeline Testing", "REST API Integration", "Event-Driven Workflows"] },
    { category: "Microsoft Fabric & Azure", icon: Cloud, technologies: [{ name: "Microsoft Fabric", icon: Layers3 }, { name: "OneLake", icon: Layers3 }, { name: "Fabric Lakehouse", icon: Layers3 }, { name: "Fabric Warehouse", icon: Database }, { name: "Fabric Data Pipelines", icon: Workflow }, { name: "Fabric Data Factory", icon: Workflow }, { name: "Dataflows Gen2", icon: Workflow }, { name: "Fabric Spark", icon: SiApachespark }, { name: "Fabric SQL", icon: Database }, { name: "Real-Time Intelligence", icon: CloudCog }, { name: "Power BI", icon: BarChart3 }, { name: "Azure Data Factory", icon: AzureDataFactoryIcon }, { name: "Azure Blob Storage", icon: CloudCog }, { name: "Azure Databricks", icon: SiDatabricks }], concepts: ["KQL", "DAX", "Power Query"] },
    { category: "Cloud & Data Platforms", icon: Cloud, technologies: [{ name: "AWS", icon: FaAws }, ...withIcon(["Amazon S3", "Amazon EC2", "Amazon Redshift", "AWS IAM"], FaAws), { name: "Google Cloud Platform", icon: SiGooglecloud }, { name: "Snowflake", icon: SiSnowflake }, { name: "Databricks", icon: SiDatabricks }, { name: "Oracle Cloud / OCI", icon: Cloud }], concepts: [] },
    { category: "Databases & Warehouses", icon: Database, technologies: [{ name: "PostgreSQL", icon: Postgresql }, { name: "MySQL", icon: SiMysql }, { name: "Microsoft SQL Server", icon: Database }, { name: "Oracle", icon: Database }, { name: "Snowflake", icon: SiSnowflake }, { name: "SQLite", icon: SiSqlite }, { name: "Elasticsearch", icon: SiElasticsearch }, { name: "DuckDB", icon: SiDuckdb }], concepts: [] },
    { category: "Analytics & BI", icon: BarChart3, technologies: [{ name: "Power BI", icon: BarChart3 }, { name: "Tableau", icon: BarChart3 }, { name: "Grafana", icon: SiGrafana }, { name: "Excel", icon: BarChart3 }, { name: "Streamlit", icon: SiStreamlit }, { name: "Plotly", icon: SiPlotly }, ...withIcon(["Matplotlib", "Seaborn"], BarChart3)], concepts: ["KPI Development", "Ad Hoc Reporting", "Data Storytelling", "Trend Analysis", "Root Cause Analysis", "RFM Segmentation", "Drill-Down Analysis"] },
    { category: "Data Science & Machine Learning", icon: BrainCircuit, technologies: [{ name: "scikit-learn", icon: SiScikitlearn }, { name: "XGBoost", icon: BrainCircuit }], concepts: ["Regression", "Linear Regression", "Random Forest", "Gradient Boosting", "Feature Engineering", "Predictive Modeling", "Model Evaluation", "Time-Series Forecasting", "Holt-Winters", "Statistical Analysis", "Hypothesis Testing", "A/B Testing", "Forecast Accuracy", "WAPE", "Risk Scoring", "Segmentation"] },
    { category: "AI / LLM / RAG", icon: BrainCircuit, technologies: [{ name: "LangChain", icon: SiLangchain }, { name: "FAISS", icon: Database }, { name: "Elasticsearch", icon: SiElasticsearch }], concepts: ["RAG", "Vector Search", "Embeddings", "Elasticsearch Retrieval", "MCP / Model Context Protocol", "AI Agents / Agentic Workflows", "LLM Applications", "Document Chunking", "Metadata-Aware Retrieval", "Prompt Engineering", "LLM Evaluation", "Transformers", "LoRA", "Federated Learning"] },
    { category: "DevOps / Delivery / Collaboration", icon: GitBranch, technologies: [{ name: "Git", icon: SiGit }, { name: "GitHub", icon: GitHubIcon }, { name: "Docker", icon: Docker }, { name: "Kubernetes", icon: Kubernetes }, { name: "Linux", icon: SiLinux }], concepts: ["MLOps", "CI/CD", "Automated Testing", "Pipeline Testing", "Model Evaluation", "Deployment Workflows", "Code Reviews", "Technical Documentation", "REST API Integration", "Jira", "Confluence", "Agile", "Scrum"] },
  ] as SkillGroup[],
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
  contact: { email: "harishnamasivayam@gmail.com", scheduleUrl: "https://calendly.com/harishnamasivayam/quick-chat", social: {
    GitHub: { name: "GitHub", url: "https://github.com/HarishNamasivayamM", icon: GitHubIcon, navbar: false },
    LinkedIn: { name: "LinkedIn", url: "https://www.linkedin.com/in/harish-namasivayam-muthuswamy/", icon: Icons.linkedin, navbar: true },
    email: { name: "Email", url: "mailto:harishnamasivayam@gmail.com", icon: Icons.email, navbar: true },
    Resume: { name: "Resume", url: "", icon: FileTextIcon, navbar: false },
  } },
  work: [
    { company: "U-Sense.IT srl", title: "Data Analytics & Algorithms Intern", location: "Remote", start: "Mar 2026", end: "May 2026", summary: "Built data-quality analysis, vehicle risk scoring, predictive models, and real-time manufacturing quality monitoring across two production stages.", highlights: ["Analyzed 2,000+ automotive sensor records across two manufacturing stages, identifying 15+ data-quality issues and establishing a cleaner foundation for downstream risk modeling.", "Engineered 10+ tolerance-margin features and a vehicle-level risk score to surface high-risk units before Final Assembly.", "Built and benchmarked Linear Regression, Random Forest, and Gradient Boosting models in scikit-learn, reaching up to approximately 85% prediction accuracy.", "Built a real-time Grafana dashboard tracking quality KPIs, pass/fail rates, and anomaly alerts for manufacturing monitoring."] },
    { company: "Wipro Technologies Ltd.", title: "Project Engineer", logo: SiWipro, location: "Chennai, India", start: "Dec 2022", end: "Jul 2024", summary: "Built SQL-based ETL and BI solutions for a KYC compliance platform serving a US-based banking client.", highlights: ["Engineered and maintained SQL-based ETL workflows for a KYC compliance platform processing 1M+ onboarding records across source, staging, and reporting layers.", "Optimized SQL queries, stored procedures, views, and indexing strategies, improving ETL processing performance by approximately 40%.", "Developed Power BI reporting for onboarding and operational KPIs, contributing to approximately 15% higher account activation and approximately 30% lower manual reporting effort.", "Performed data-quality validation, reconciliation, profiling, and root cause analysis with QA, business, and compliance teams."] },
    { company: "Wipro Technologies Ltd.", title: "Analytics Intern", logo: SiWipro, location: "Chennai, India", start: "Mar 2022", end: "May 2022", summary: "Automated recurring reporting and improved customer-data reconciliation through SQL analysis and validation.", highlights: ["Automated recurring reporting with 30+ SQL queries across three databases, reducing manual reporting effort by approximately 25%.", "Profiled and validated 50K+ customer records, resolving inconsistencies and supporting approximately 98% reconciliation accuracy."] },
  ] as WorkExperience[],
  projects: [
    { canonicalId: "retailiq", title: "RetailIQ  -  Retail Data Platform & Revenue Analytics", categories: ["Data Engineering", "Analytics", "BI"], problem: "Retail transaction data needed to be transformed into structured, decision-ready analytics.", build: "Designed a modern retail analytics pipeline and dimensional model for revenue, product, and customer analysis.", scale: "100K+ retail transactions", approach: ["Python", "SQL", "Airflow", "dbt", "Snowflake", "Power BI", "Star Schema", "RFM Segmentation"], outcome: "Created analytics-ready models and interactive BI reporting across 8+ business KPIs.", featured: true, featuredMetric: "100K+", featuredMetricLabel: "Retail transactions" },
    { canonicalId: "churnshield", title: "ChurnShield  -  Synthetic Telecom Churn Data Foundation", categories: ["Data Engineering", "Data Quality"], problem: "Create reproducible customer and behavioral-event data for a downstream churn analytics pipeline.", build: "Built a seeded Python generator and validator for synthetic telecom customers and behavioral events across five event types.", scale: "50,000 customers and 811,871 validated events across 547 days", approach: ["Python", "NumPy", "Pandas", "CSV", "Synthetic Data", "Data Validation"], outcome: "Completed and validated the reproducible data foundation; Kafka, Snowflake, ML, and Power BI milestones remain planned.", status: "Milestone 1 complete", featuredMetric: "50K", featuredMetricLabel: "Synthetic customers" },
    { canonicalId: "campusguide-rag", title: "CampusGuide RAG  -  Grounded Institutional Knowledge Assistant", categories: ["AI", "RAG"], problem: "Institutional policies and student-services information were distributed across documents and difficult to retrieve quickly.", build: "Built a retrieval-augmented assistant that indexes institutional documents, retrieves relevant context through semantic search, and generates grounded responses.", approach: ["Python", "LangChain", "Elasticsearch", "Vector Search", "Document Ingestion", "Chunking", "Embeddings", "Prompt Workflows"], outcome: "Created a semantic retrieval workflow that returns contextual answers grounded in institutional content.", featured: true, featuredMetric: "Grounded Q&A", featuredMetricLabel: "Semantic document retrieval" },
    { canonicalId: "findocs-rag", title: "FinDocs RAG  -  Financial Document Q&A System", categories: ["AI", "RAG", "Financial Services"], problem: "Searching large collections of financial policy and compliance documents manually is inefficient.", build: "Developed a document intelligence application with source-aware retrieval.", scale: "Approximately 500+ financial documents", approach: ["Python", "LangChain", "FAISS", "OpenAI API", "Streamlit", "Chunk Overlap", "Metadata-Aware Retrieval", "Semantic Search"], outcome: "Enabled contextual question answering with retrieval traceability and source-aware responses." },
    { canonicalId: "cta-transitpulse", title: "CTA TransitPulse  -  Chicago Transit Analytics", categories: ["Analytics", "Data Engineering"], problem: "Transform transit vehicle and arrival-prediction data into usable operational insights.", build: "Designed an analytical data model and interactive transit dashboard.", scale: "17K+ vehicle records, 69K+ arrival predictions, and 14 CTA routes", approach: ["Python", "SQL", "Pandas", "SQLite", "Star Schema", "Streamlit", "Plotly", "10+ Analytical SQL Queries"], outcome: "Enabled route-level KPI monitoring, trend analysis, heatmaps, and geographic exploration.", featuredMetric: "69K+", featuredMetricLabel: "Arrival predictions analyzed" },
    { canonicalId: "medicost", title: "MediCost  -  Healthcare Cost Prediction & Risk Analytics", categories: ["Data Science", "Analytics"], problem: "Understand cost drivers and identify high-risk healthcare and member segments.", build: "Developed a regression and risk-stratification workflow with executive reporting.", scale: "Approximately 100K+ records", approach: ["Python", "SQL", "R", "Pandas", "scikit-learn", "Tableau / Power BI", "EDA", "Feature Engineering", "Regression", "Risk Stratification"], outcome: "Built healthcare cost-prediction models and delivered an executive analytics dashboard with 10+ KPIs." },
    { canonicalId: "finstream", title: "FinStream  -  Credit Card Transaction Analytics Pipeline", categories: ["Data Engineering", "Financial Analytics"], problem: "Transform raw transaction-level data into quality-tested analytical models.", build: "Created a layered analytics pipeline with a star schema and tested transformations.", scale: "Approximately 100K+ simulated credit-card transactions", approach: ["Python", "SQL", "Snowflake", "dbt", "Pandas", "Rolling Spend", "Merchant Aggregation", "Geo-Anomaly Features"], outcome: "Created a structured analytics layer supporting transaction behavior and anomaly analysis." },
    { canonicalId: "partsflow", title: "PartsFlow  -  Demand Forecasting & Replenishment Engine", categories: ["Data Science", "Forecasting", "Analytics"], problem: "Improve SKU-level demand forecasting and inventory replenishment decisions.", build: "Built Holt-Winters forecasts and an accuracy-versus-cost dashboard.", scale: "Simulated 40-SKU, three-year demand network", approach: ["Python", "DuckDB", "statsmodels", "Holt-Winters", "Streamlit"], outcome: "Connected forecast accuracy to operational inventory outcomes.", metrics: ["19.1% WAPE vs. 21.6% naive baseline", "Outperformed the baseline on 30 of 40 SKUs", "Simulated fill rate improved from 82% to 89%", "Approximately 40% lower lost sales"], featured: true, featuredMetric: "19.1% WAPE", featuredMetricLabel: "Compared with 21.6% baseline" },
    { canonicalId: "gridwatt", title: "GridWatt  -  Smart Meter Energy Analytics Pipeline", categories: ["Big Data", "Data Engineering"], problem: "Process high-volume smart-meter data efficiently for downstream analysis.", build: "Created a partitioned data lake and incremental warehouse-loading pipeline.", scale: "Approximately 10M+ smart-meter readings", approach: ["PySpark", "Python", "AWS S3", "Parquet", "Snowflake", "SQL", "Incremental Loading"], outcome: "Created scalable aggregate analytics for consumption, peak demand, and household segments." },
    { canonicalId: "healthsync", title: "HealthSync  -  Healthcare Claims Data Platform", categories: ["Data Engineering", "Databricks"], problem: "Integrate healthcare claims and patient data from multiple sources while maintaining data quality.", build: "Created an ingestion, validation, and Delta Lake processing workflow.", scale: "Approximately 80K+ records across approximately five datasets", approach: ["Python", "Databricks", "PySpark", "Kafka", "REST API", "Delta Lake", "SQL"], outcome: "Reached approximately 97% data completeness and enabled analytics for claims cost, patient trends, and quality monitoring." },
    { canonicalId: "bandaid-maps", title: "Bandaid Maps  -  AI-Assisted Healthcare Navigation", categories: ["AI", "Healthcare", "Hackathon"], problem: "Help users understand health readiness and locate appropriate nearby healthcare resources.", build: "Created an AI-assisted healthcare navigation application during a 36-hour LA Hacks build at UCLA.", approach: ["FastAPI", "React", "Google Gemini API", "Melissa APIs", "MongoDB", "Health Readiness Score", "Emergency Action Plan", "Interactive Map"], outcome: "Won the Melissa Data Challenge at LA Hacks 2025.", badge: "Winner  -  Melissa Data Challenge, LA Hacks 2025", featured: true, featuredMetric: "Winner", featuredMetricLabel: "LA Hacks 2025 Melissa Data Challenge" },
    { canonicalId: "here-road-sign-validation", title: "Road Sign Validation & Geospatial Intelligence", categories: ["Hackathon", "Applied Data Science", "Computer Vision", "Geospatial"], problem: "Road sign and road network information can contain missing, misplaced, or inconsistent records that affect map quality and routing accuracy.", build: "Built an automated road sign validation workflow combining computer vision, clustering, and HERE geospatial APIs during the 2025 HERE Technologies Chicago Hackathon, representing Illinois Institute of Technology.", approach: ["OpenCV", "Object Detection", "Computer Vision", "Clustering", "HERE APIs", "Routing APIs", "Probe Data", "Geospatial Data", "Backend Data Pipeline"], outcome: "Reached the finalist stage while applying computer vision, routing data, and geospatial pipelines to urban transportation infrastructure under hackathon time constraints.", badge: "Finalist - HERE Technologies Chicago Hackathon 2025" },
    { canonicalId: "food-delivery-database", title: "Scalable Food Delivery Database System", categories: ["Database Engineering"], problem: "Design a relational system that supports structured food-delivery transactions and analytical reporting.", build: "Designed a normalized relational data model for transaction processing and reporting.", approach: ["SQL", "Relational Modeling", "Normalization", "3NF", "Query Optimization"], outcome: "Created a normalized database structure supporting scalable transaction handling and analytical queries." },
    { canonicalId: "federated-iot-intrusion-detection", title: "Hybrid Transformer and XGBoost Model for Federated IoT Intrusion Detection", categories: ["Research", "Machine Learning", "Cybersecurity"], problem: "IoT intrusion detection needs strong predictive performance while federated learning introduces privacy and communication constraints.", build: "Developed a hybrid Transformer and XGBoost intrusion-detection architecture for distributed IoT learning.", approach: ["Transformer", "XGBoost", "Federated Learning", "LoRA", "IoT", "Cybersecurity", "Machine Learning"], outcome: "Achieved approximately 98% detection performance with approximately 90% lower communication overhead.", venue: "2026 IEEE 5th International Conference on AI in Cybersecurity (ICAIC)", paperUrl: "https://doi.org/10.1109/ICAIC67076.2026.11395795", research: true, featuredMetric: "~98% detection", featuredMetricLabel: "~90% lower communication overhead" },
  ] as Project[],
  publicationsAchievements: [
    { type: "Achievement / Award", title: "Melissa Data Challenge Winner", organization: "LA Hacks 2025   ·   UCLA", date: "2025", project: "Bandaid Maps", badge: "Winner", description: "Won the Melissa Data Challenge for Bandaid Maps, an AI-assisted healthcare navigation application built during a 36-hour hackathon. It helps users understand health readiness and locate appropriate nearby healthcare resources.", highlight: "Combined a Health Readiness Score, Emergency Action Plan, and Interactive Map to guide users toward nearby healthcare resources.", technologies: ["FastAPI", "React", "Google Gemini API", "Melissa APIs", "MongoDB"] },
    { type: "Participation", title: "AnDackaThon 2026", organization: "Analytics & Data Summit 2026   ·   Oracle Redwood Shores / San Jose State University", date: "2026", badge: "Participant   ·   Datathon", description: "Participated in the Datathon track, working with real-world datasets and Oracle analytics and data technologies under a compressed hackathon timeline." },
    { type: "Participation", title: "HERE Technologies Chicago Hackathon Finalist", organization: "HERE Technologies Chicago Hackathon", date: "2025", badge: "Finalist", description: "Reached the finalist stage with a road sign validation and geospatial intelligence project." },
  ] as PublicationAchievement[],
  education: [
    { school: "Illinois Institute of Technology", initials: "IIT", location: "Chicago, IL", degree: "Master of Data Science", gpa: "3.81", start: "Aug 2024", end: "May 2026" },
    { school: "Anna University", initials: "AU", affiliatedCollege: "St. Joseph's College of Engineering", location: "Chennai, India", degree: "Bachelor of Engineering", field: "Electronics and Communication Engineering", gpa: "3.65", start: "Aug 2018", end: "May 2022" },
  ] as Education[],
  certifications: [
    { name: "Microsoft Certified: Fabric Data Engineer Associate", issuer: "Microsoft", initials: "MS", subtitle: "DP-700", href: "https://learn.microsoft.com/api/credentials/share/en-us/HarishNamasivayamMuthuswamy-8878/1875FA6C12BD2DBA?sharingId=48FEA08B143E048B" },
    { name: "Google Cloud Associate Cloud Engineer", issuer: "Google Cloud", initials: "GCP", date: "May 2023", credentialId: "73403999" },
  ] as Certification[],
  leadership: [
    { organization: "IIT Product Management Club", initials: "PMC", roles: [{ title: "Vice President", start: "Aug 2025", end: "May 2026" }], description: "Co-led the club with the President, supporting product-building activities, AI-oriented initiatives, workshops, case studies, and product work connecting strategy, data, and engineering." },
    { organization: "Indian Student Association - Illinois Tech", initials: "ISA", roles: [{ title: "Vice President", start: "Jan 2026", end: "May 2026" }, { title: "Finance Head", start: "Aug 2025", end: "Dec 2025" }, { title: "Finance Team Member", start: "Feb 2025", end: "Jul 2025" }], description: "Supported event management, budgeting, expense tracking, reimbursements, organization operations, and executive leadership across three roles." },
    { organization: "ACM Illinois Tech", initials: "ACM", roles: [{ title: "Treasurer", start: "May 2025", end: "May 2026" }, { title: "Vice Treasurer", start: "Nov 2024", end: "May 2025" }], description: "Managed budget planning, expense tracking, reimbursements, sponsor and vendor payments, and chapter operations, including ScarletHacks organizing." },
    { organization: "The Optical Society (OSA)", initials: "OSA", roles: [{ title: "President", start: "Jun 2021", end: "May 2022" }, { title: "Treasurer", start: "Jun 2020", end: "Jun 2021" }], description: "As President, led a 16 to 17 member student organization and coordinated approximately 10 to 12 technical events and workshops with faculty, members, and sponsors. As Treasurer, managed budgeting and financial coordination for chapter activities and supported sponsorship-related planning." },
  ] as LeadershipEntry[],
  githubActivity: null as GitHubActivity | null,
  writing: { personalPostSlugs: [] as string[] },
  hackathons: [] as Hackathon[],
} as const;
