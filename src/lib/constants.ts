// ─────────────────────────────────────────────
// Brand System
// ─────────────────────────────────────────────

export const COLORS = {
  navy: '#001F3F',
  navyLight: '#0A2E54',
  navyMuted: '#132D4A',
  offwhite: '#F0F4F8',
  body: '#2E333D',
  bodyMuted: '#6B7280',
  accent: '#3B82F6',

  layer: {
    Build: '#3B82F6',
    Operate: '#8B5CF6',
    Quality: '#10B981',
    Support: '#F59E0B',
  } as Record<string, string>,

  quality: {
    1: '#EF4444',
    2: '#F59E0B',
    3: '#10B981',
  } as Record<number, string>,
} as const

export const QUALITY_LABELS: Record<number, string> = {
  1: 'Concept',
  2: 'Usable',
  3: 'Production-ready',
}

// ─────────────────────────────────────────────
// Taxonomy Reference (used for client-side lookups
// before Supabase is wired up, and as fallback)
// ─────────────────────────────────────────────

export const ROLES = [
  { slug: 'mlops', display_name: 'MLOps Engineer', phase: 1 as const, cluster_name: 'AI Cluster', sort_order: 1 },
  { slug: 'ai-agent-eng', display_name: 'AI Agent Engineer', phase: 1 as const, cluster_name: 'AI Cluster', sort_order: 2 },
  { slug: 'gen-ai-eng', display_name: 'Generative AI Engineer', phase: 1 as const, cluster_name: 'AI Cluster', sort_order: 3 },
  { slug: 'senior-backend-py', display_name: 'Senior Backend Python', phase: 2 as const, cluster_name: 'Product Cluster', sort_order: 4 },
  { slug: 'design-eng', display_name: 'Design Engineer', phase: 2 as const, cluster_name: 'Product Cluster', sort_order: 5 },
  { slug: 'product-eng-fe', display_name: 'Product Engineer FE', phase: 2 as const, cluster_name: 'Product Cluster', sort_order: 6 },
  { slug: 'product-eng-be', display_name: 'Product Engineer BE', phase: 2 as const, cluster_name: 'Product Cluster', sort_order: 7 },
  { slug: 'cloud-devops', display_name: 'Cloud DevOps', phase: 3 as const, cluster_name: 'Cloud Cluster', sort_order: 8 },
  { slug: 'cloud-security', display_name: 'Cloud Security', phase: 3 as const, cluster_name: 'Cloud Cluster', sort_order: 9 },
  { slug: 'cloud-finops', display_name: 'Cloud FinOps', phase: 3 as const, cluster_name: 'Cloud Cluster', sort_order: 10 },
]

export const TASK_CATEGORIES = [
  { slug: 'scaffolding', display_name: 'Scaffolding', layer: 'Build' as const, sort_order: 1 },
  { slug: 'code-generation', display_name: 'Code Generation', layer: 'Build' as const, sort_order: 2 },
  { slug: 'architecture-guidance', display_name: 'Architecture Guidance', layer: 'Build' as const, sort_order: 3 },
  { slug: 'agent-design', display_name: 'Agent Design', layer: 'Build' as const, sort_order: 4 },
  { slug: 'pipeline-orchestration', display_name: 'Pipeline / Orchestration', layer: 'Operate' as const, sort_order: 5 },
  { slug: 'integration-tooling', display_name: 'Integration / Tooling', layer: 'Operate' as const, sort_order: 6 },
  { slug: 'optimization', display_name: 'Optimization', layer: 'Operate' as const, sort_order: 7 },
  { slug: 'retrieval-data-pipeline', display_name: 'Retrieval / Data Pipeline', layer: 'Operate' as const, sort_order: 8 },
  { slug: 'testing', display_name: 'Testing', layer: 'Quality' as const, sort_order: 9 },
  { slug: 'evaluation-monitoring', display_name: 'Evaluation / Monitoring', layer: 'Quality' as const, sort_order: 10 },
  { slug: 'code-review-hardening', display_name: 'Code Review / Hardening', layer: 'Quality' as const, sort_order: 11 },
  { slug: 'risk-analysis', display_name: 'Risk Analysis', layer: 'Quality' as const, sort_order: 12 },
  { slug: 'code-quality-standards', display_name: 'Code Quality / Standards', layer: 'Quality' as const, sort_order: 13 },
  { slug: 'documentation', display_name: 'Documentation', layer: 'Support' as const, sort_order: 14 },
  { slug: 'tooling-workflow-authoring', display_name: 'Tooling / Workflow Authoring', layer: 'Support' as const, sort_order: 15 },
]

export const FORMAT_TYPES = [
  { slug: 'claude-code-skill', display_name: 'Claude Code skill (SKILL.md)', sort_order: 1 },
  { slug: 'jupyter-notebook', display_name: 'Jupyter notebook', sort_order: 2 },
  { slug: 'framework-tool', display_name: 'Framework tool (Python class)', sort_order: 3 },
  { slug: 'cursor-rule', display_name: 'Cursor rule (.cursorrules)', sort_order: 4 },
  { slug: 'custom-gpt', display_name: 'Custom GPT', sort_order: 5 },
  { slug: 'slash-command', display_name: 'Slash command / prompt file', sort_order: 6 },
  { slug: 'system-prompt', display_name: 'System prompt (.md)', sort_order: 7 },
]

// Map from taxonomy-sample-pass.md display names to slugs
export const ROLE_SLUG_MAP: Record<string, string> = {
  'MLOps': 'mlops',
  'MLOps Engineer': 'mlops',
  'MLOps Eng': 'mlops',
  'AI Agent Eng': 'ai-agent-eng',
  'AI Agent Engineer': 'ai-agent-eng',
  'Generative AI Eng': 'gen-ai-eng',
  'Generative AI Engineer': 'gen-ai-eng',
  'Senior Backend': 'senior-backend-py',
  'Senior Backend Python': 'senior-backend-py',
  'Design Eng': 'design-eng',
  'Design Engineer': 'design-eng',
  'Product Eng FE': 'product-eng-fe',
  'Product Engineer FE': 'product-eng-fe',
  'Product Eng BE': 'product-eng-be',
  'Product Engineer BE': 'product-eng-be',
  'Cloud DevOps': 'cloud-devops',
  'Cloud Security': 'cloud-security',
  'Cloud FinOps': 'cloud-finops',
}

export const CATEGORY_SLUG_MAP: Record<string, string> = {
  'Scaffolding': 'scaffolding',
  'Code Generation': 'code-generation',
  'Architecture Guidance': 'architecture-guidance',
  'Agent Design': 'agent-design',
  'Pipeline / Orchestration': 'pipeline-orchestration',
  'Integration / Tooling': 'integration-tooling',
  'Optimization': 'optimization',
  'Retrieval / Data Pipeline': 'retrieval-data-pipeline',
  'Testing': 'testing',
  'Evaluation / Monitoring': 'evaluation-monitoring',
  'Code Review / Hardening': 'code-review-hardening',
  'Risk Analysis': 'risk-analysis',
  'Code Quality / Standards': 'code-quality-standards',
  'Documentation': 'documentation',
  'Tooling / Workflow Authoring': 'tooling-workflow-authoring',
}

export const FORMAT_SLUG_MAP: Record<string, string> = {
  'Claude Code skill (SKILL.md)': 'claude-code-skill',
  'Jupyter notebook': 'jupyter-notebook',
  'Framework tool (Python class)': 'framework-tool',
  'Cursor rule (.cursorrules)': 'cursor-rule',
  'Custom GPT': 'custom-gpt',
  'Slash command / prompt file': 'slash-command',
  'System prompt (.md)': 'system-prompt',
  'Prompt file (system prompt .md)': 'system-prompt',
}

// All 30 skills from Issue 1 taxonomy sample pass
// Used for local dev and seeding Supabase
export const SEED_SKILLS = [
  { skill_name: 'mcp-builder', description: 'Guides Claude through creating a production-quality MCP server connecting an LLM to an external API', task_category: 'scaffolding', roles: ['ai-agent-eng', 'gen-ai-eng'], source_platform: 'GitHub - Anthropic Official', format_type: 'claude-code-skill', source_link: 'https://github.com/anthropics/skills/blob/main/skills/mcp-builder/SKILL.md', quality_rating: 3, phase: 1 },
  { skill_name: 'frontend-design', description: 'Creates production-grade frontend interfaces with genuine design quality', task_category: 'code-generation', roles: ['design-eng', 'product-eng-fe'], source_platform: 'GitHub - Anthropic Official', format_type: 'claude-code-skill', source_link: 'https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md', quality_rating: 3, phase: 2 },
  { skill_name: 'skill-creator', description: 'Interactive workflow that guides you through building a new Claude Code skill', task_category: 'tooling-workflow-authoring', roles: ['mlops', 'ai-agent-eng', 'gen-ai-eng', 'senior-backend-py', 'design-eng', 'product-eng-fe', 'product-eng-be', 'cloud-devops', 'cloud-security', 'cloud-finops'], source_platform: 'GitHub - Anthropic Official', format_type: 'claude-code-skill', source_link: 'https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md', quality_rating: 3, phase: 1 },
  { skill_name: 'doc-coauthoring', description: 'Three-stage collaborative document writing workflow with enterprise integrations', task_category: 'documentation', roles: ['mlops', 'ai-agent-eng', 'gen-ai-eng', 'senior-backend-py', 'design-eng', 'product-eng-fe', 'product-eng-be', 'cloud-devops', 'cloud-security', 'cloud-finops'], source_platform: 'GitHub - Anthropic Official', format_type: 'claude-code-skill', source_link: 'https://github.com/anthropics/skills/blob/main/skills/doc-coauthoring/SKILL.md', quality_rating: 3, phase: 1 },
  { skill_name: 'pre-mortem', description: 'Writes a fictional post-mortem for bugs that have not happened yet, forcing complete causal chains', task_category: 'risk-analysis', roles: ['senior-backend-py', 'mlops', 'ai-agent-eng'], source_platform: 'GitHub - Community', format_type: 'claude-code-skill', source_link: 'https://github.com/honnibal/claude-skills', quality_rating: 3, phase: 1 },
  { skill_name: 'resilience-analysis', description: 'Identifies fragile production code patterns: shared state, stringly-typed contracts, non-atomic ops', task_category: 'code-review-hardening', roles: ['senior-backend-py', 'mlops'], source_platform: 'GitHub - Community', format_type: 'claude-code-skill', source_link: 'https://github.com/honnibal/claude-skills', quality_rating: 3, phase: 1 },
  { skill_name: 'mutation-testing', description: 'Audits test suite strength by introducing deliberate mutations and checking if tests catch them', task_category: 'testing', roles: ['senior-backend-py', 'ai-agent-eng'], source_platform: 'GitHub - Community', format_type: 'claude-code-skill', source_link: 'https://github.com/honnibal/claude-skills', quality_rating: 3, phase: 1 },
  { skill_name: 'feature-development workflow', description: 'Multi-agent orchestration that takes a feature requirement and coordinates execution across subagents', task_category: 'pipeline-orchestration', roles: ['product-eng-fe', 'product-eng-be', 'ai-agent-eng'], source_platform: 'GitHub - Community', format_type: 'slash-command', source_link: 'https://github.com/wshobson/commands/tree/main/workflows', quality_rating: 2, phase: 1 },
  { skill_name: 'security-scan', description: 'OWASP Top 10 security vulnerability assessment for a codebase or endpoint', task_category: 'code-review-hardening', roles: ['senior-backend-py', 'cloud-devops', 'cloud-security'], source_platform: 'GitHub - Community', format_type: 'slash-command', source_link: 'https://github.com/wshobson/commands/tree/main/tools', quality_rating: 2, phase: 1 },
  { skill_name: 'java-architect', description: 'Senior architect guidance for Spring Boot 3.x, Java 21 LTS with Clean Architecture principles', task_category: 'architecture-guidance', roles: ['senior-backend-py'], source_platform: 'GitHub - Community', format_type: 'claude-code-skill', source_link: 'https://github.com/Jeffallan/claude-skills/blob/main/skills/java-architect/SKILL.md', quality_rating: 2, phase: 2 },
  { skill_name: 'nestjs-expert', description: 'Activates on NestJS requests and loads authentication, DI, and module-design references', task_category: 'code-generation', roles: ['product-eng-be'], source_platform: 'GitHub - Community', format_type: 'claude-code-skill', source_link: 'https://github.com/Jeffallan/claude-skills/tree/main/skills/nestjs-expert', quality_rating: 2, phase: 2 },
  { skill_name: 'i18n-expert', description: 'Complete i18n setup and auditing: library selection, locale file architecture, translation strategy', task_category: 'code-generation', roles: ['design-eng', 'product-eng-fe'], source_platform: 'GitHub - Community', format_type: 'claude-code-skill', source_link: 'https://github.com/daymade/claude-code-skills', quality_rating: 2, phase: 2 },
  { skill_name: 'Orchestrator-Workers Pattern', description: 'Multi-agent architecture where an orchestrator decomposes tasks and delegates to parallel workers', task_category: 'pipeline-orchestration', roles: ['ai-agent-eng', 'gen-ai-eng'], source_platform: 'Anthropic Cookbook', format_type: 'jupyter-notebook', source_link: 'https://github.com/anthropics/anthropic-cookbook/blob/main/patterns/agents/orchestrator_workers.ipynb', quality_rating: 3, phase: 1 },
  { skill_name: 'Evaluator-Optimizer Loop', description: 'One LLM generates output, a second evaluates it and returns feedback; loops until approved', task_category: 'evaluation-monitoring', roles: ['ai-agent-eng', 'gen-ai-eng', 'mlops'], source_platform: 'Anthropic Cookbook', format_type: 'jupyter-notebook', source_link: 'https://github.com/anthropics/anthropic-cookbook/blob/main/patterns/agents/evaluator_optimizer.ipynb', quality_rating: 3, phase: 1 },
  { skill_name: 'Basic Workflows (Chaining, Routing, Parallelization)', description: 'Three foundational agentic patterns: sequential LLM chaining, input routing, parallel LLM calls', task_category: 'pipeline-orchestration', roles: ['ai-agent-eng', 'gen-ai-eng'], source_platform: 'Anthropic Cookbook', format_type: 'jupyter-notebook', source_link: 'https://github.com/anthropics/anthropic-cookbook/blob/main/patterns/agents/basic_workflows.ipynb', quality_rating: 3, phase: 1 },
  { skill_name: 'Building Evaluations', description: 'Two grading strategies for LLM outputs: code-based (deterministic) and model-based (rubric scoring)', task_category: 'evaluation-monitoring', roles: ['mlops', 'gen-ai-eng', 'ai-agent-eng'], source_platform: 'Anthropic Cookbook', format_type: 'jupyter-notebook', source_link: 'https://github.com/anthropics/anthropic-cookbook/blob/main/misc/building_evals.ipynb', quality_rating: 3, phase: 1 },
  { skill_name: 'Prompt Caching', description: 'Caches large stable prompt segments across API calls to reduce latency and cut costs by up to 90%', task_category: 'optimization', roles: ['gen-ai-eng', 'mlops'], source_platform: 'Anthropic Cookbook', format_type: 'jupyter-notebook', source_link: 'https://github.com/anthropics/anthropic-cookbook/blob/main/misc/prompt_caching.ipynb', quality_rating: 3, phase: 1 },
  { skill_name: 'Multi-Agent Research System', description: 'Three packaged system prompts: lead agent coordinates, subagents execute tasks, citations agent tracks sources', task_category: 'agent-design', roles: ['ai-agent-eng', 'gen-ai-eng'], source_platform: 'Anthropic Cookbook', format_type: 'system-prompt', source_link: 'https://github.com/anthropics/anthropic-cookbook/tree/main/patterns/agents/prompts', quality_rating: 3, phase: 1 },
  { skill_name: 'RAG with Pinecone', description: 'Full RAG pipeline: embedding, indexing, retrieval, and synthesis using Claude + Pinecone', task_category: 'retrieval-data-pipeline', roles: ['gen-ai-eng', 'ai-agent-eng'], source_platform: 'Anthropic Cookbook', format_type: 'jupyter-notebook', source_link: 'https://github.com/anthropics/claude-cookbooks/blob/main/third_party/Pinecone/rag_using_pinecone.ipynb', quality_rating: 3, phase: 1 },
  { skill_name: 'SQLDatabaseChain', description: 'Accepts a natural language question, generates SQL, executes it, and returns a summarized answer', task_category: 'retrieval-data-pipeline', roles: ['senior-backend-py', 'mlops'], source_platform: 'LangChain', format_type: 'framework-tool', source_link: 'https://python.langchain.com/api_reference/experimental/sql/langchain_experimental.sql.base.SQLDatabaseChain.html', quality_rating: 2, phase: 1 },
  { skill_name: 'GitHubToolkit', description: 'Gives an LLM agent the ability to read repos, open issues, create PRs, and inspect commit history', task_category: 'integration-tooling', roles: ['ai-agent-eng', 'product-eng-be', 'senior-backend-py'], source_platform: 'LangChain', format_type: 'framework-tool', source_link: 'https://python.langchain.com/api_reference/community/agent_toolkits/langchain_community.agent_toolkits.github.toolkit.GitHubToolkit.html', quality_rating: 3, phase: 1 },
  { skill_name: 'PythonREPLTool', description: 'Executes arbitrary Python code in a live REPL session and returns stdout', task_category: 'testing', roles: ['ai-agent-eng', 'senior-backend-py', 'mlops'], source_platform: 'LangChain', format_type: 'framework-tool', source_link: 'https://python.langchain.com/api_reference/experimental/tools.html', quality_rating: 2, phase: 1 },
  { skill_name: 'ShellTool', description: 'Runs arbitrary bash commands and returns output, with optional human-in-the-loop confirmation', task_category: 'integration-tooling', roles: ['mlops', 'cloud-devops', 'senior-backend-py'], source_platform: 'LangChain', format_type: 'framework-tool', source_link: 'https://python.langchain.com/api_reference/community/tools/langchain_community.tools.shell.tool.ShellTool.html', quality_rating: 2, phase: 1 },
  { skill_name: 'VectorStoreQATool', description: 'Wraps a vector store and answers natural language questions by retrieving document chunks', task_category: 'retrieval-data-pipeline', roles: ['gen-ai-eng', 'ai-agent-eng'], source_platform: 'LangChain', format_type: 'framework-tool', source_link: 'https://python.langchain.com/api_reference/community/tools/langchain_community.tools.vectorstore.tool.VectorStoreQATool.html', quality_rating: 3, phase: 1 },
  { skill_name: 'JiraToolkit', description: 'CRUD operations over Jira issues and project state as agent-callable tools', task_category: 'integration-tooling', roles: ['ai-agent-eng', 'cloud-devops'], source_platform: 'LangChain', format_type: 'framework-tool', source_link: 'https://python.langchain.com/docs/integrations/tools/jira', quality_rating: 2, phase: 1 },
  { skill_name: 'Python LLM & ML Workflow rules', description: 'Cursor rules for a Python ML engineer: vectorized ops, JAX best practices, performance optimization', task_category: 'code-quality-standards', roles: ['senior-backend-py', 'mlops', 'gen-ai-eng'], source_platform: 'cursor.directory / GitHub', format_type: 'cursor-rule', source_link: 'https://github.com/PatrickJS/awesome-cursorrules/blob/main/rules/python-llm-ml-workflow-cursorrules-prompt-file/.cursorrules', quality_rating: 2, phase: 1 },
  { skill_name: 'Agentic cursorrules', description: 'Manages multiple AI agents in Cursor through strict file-tree partitioning and domain boundaries', task_category: 'agent-design', roles: ['ai-agent-eng'], source_platform: 'GitHub - Community', format_type: 'cursor-rule', source_link: 'https://github.com/s-smits/agentic-cursorrules', quality_rating: 2, phase: 1 },
  { skill_name: 'DevOps GPT', description: 'General-purpose DevOps assistant for infrastructure, deployment, and automation tasks', task_category: 'code-generation', roles: ['cloud-devops'], source_platform: 'OpenAI GPT Store', format_type: 'custom-gpt', source_link: 'https://chatgpt.com/g/g-lnTXc3PgP-devops-gpt', quality_rating: 1, phase: 3 },
  { skill_name: 'RAG Expert', description: 'Specialized assistant for designing and debugging retrieval-augmented generation pipelines', task_category: 'scaffolding', roles: ['gen-ai-eng', 'ai-agent-eng'], source_platform: 'OpenAI GPT Store', format_type: 'custom-gpt', source_link: 'https://chatgpt.com/g/g-eVxHBQF1E-rag-expert', quality_rating: 1, phase: 1 },
  { skill_name: 'Code Review Assistant', description: 'Reviews code for issues, improvements, and best practices', task_category: 'code-review-hardening', roles: ['mlops', 'ai-agent-eng', 'gen-ai-eng', 'senior-backend-py', 'design-eng', 'product-eng-fe', 'product-eng-be', 'cloud-devops', 'cloud-security', 'cloud-finops'], source_platform: 'OpenAI GPT Store', format_type: 'custom-gpt', source_link: 'https://chatgpt.com/g/g-F3dNa2gxP-code-review-assistant', quality_rating: 1, phase: 1 },
] as const
