-- SB-01 Skill Bank Dashboard — Seed Data
-- Run this AFTER 001_initial_schema.sql
-- Populates reference tables + 30 skills from Issue 1 taxonomy sample pass

-- ─────────────────────────────────────────────
-- Roles (10)
-- ─────────────────────────────────────────────
INSERT INTO roles (slug, display_name, phase, cluster_name, sort_order) VALUES
  ('mlops',            'MLOps Engineer',          1, 'AI Cluster',      1),
  ('ai-agent-eng',     'AI Agent Engineer',       1, 'AI Cluster',      2),
  ('gen-ai-eng',       'Generative AI Engineer',  1, 'AI Cluster',      3),
  ('senior-backend-py','Senior Backend Python',   2, 'Product Cluster',  4),
  ('design-eng',       'Design Engineer',         2, 'Product Cluster',  5),
  ('product-eng-fe',   'Product Engineer FE',     2, 'Product Cluster',  6),
  ('product-eng-be',   'Product Engineer BE',     2, 'Product Cluster',  7),
  ('cloud-devops',     'Cloud DevOps',            3, 'Cloud Cluster',    8),
  ('cloud-security',   'Cloud Security',          3, 'Cloud Cluster',    9),
  ('cloud-finops',     'Cloud FinOps',            3, 'Cloud Cluster',   10)
ON CONFLICT (slug) DO NOTHING;

-- ─────────────────────────────────────────────
-- Task Categories (15)
-- ─────────────────────────────────────────────
INSERT INTO task_categories (slug, display_name, layer, sort_order) VALUES
  ('scaffolding',              'Scaffolding',                'Build',   1),
  ('code-generation',          'Code Generation',            'Build',   2),
  ('architecture-guidance',    'Architecture Guidance',      'Build',   3),
  ('agent-design',             'Agent Design',               'Build',   4),
  ('pipeline-orchestration',   'Pipeline / Orchestration',   'Operate', 5),
  ('integration-tooling',      'Integration / Tooling',      'Operate', 6),
  ('optimization',             'Optimization',               'Operate', 7),
  ('retrieval-data-pipeline',  'Retrieval / Data Pipeline',  'Operate', 8),
  ('testing',                  'Testing',                    'Quality', 9),
  ('evaluation-monitoring',    'Evaluation / Monitoring',    'Quality', 10),
  ('code-review-hardening',    'Code Review / Hardening',    'Quality', 11),
  ('risk-analysis',            'Risk Analysis',              'Quality', 12),
  ('code-quality-standards',   'Code Quality / Standards',   'Quality', 13),
  ('documentation',            'Documentation',              'Support', 14),
  ('tooling-workflow-authoring','Tooling / Workflow Authoring','Support',15)
ON CONFLICT (slug) DO NOTHING;

-- ─────────────────────────────────────────────
-- Format Types (7)
-- ─────────────────────────────────────────────
INSERT INTO format_types (slug, display_name, sort_order) VALUES
  ('claude-code-skill', 'Claude Code skill (SKILL.md)',    1),
  ('jupyter-notebook',  'Jupyter notebook',                2),
  ('framework-tool',    'Framework tool (Python class)',    3),
  ('cursor-rule',       'Cursor rule (.cursorrules)',       4),
  ('custom-gpt',        'Custom GPT',                      5),
  ('slash-command',     'Slash command / prompt file',      6),
  ('system-prompt',     'System prompt (.md)',              7)
ON CONFLICT (slug) DO NOTHING;

-- ─────────────────────────────────────────────
-- Skills (30) — Issue 1 taxonomy sample pass
-- ─────────────────────────────────────────────
INSERT INTO skills (skill_name, description, task_category, roles, source_platform, format_type, source_link, quality_rating, phase, sheet_row_id) VALUES
  ('mcp-builder',
   'Guides Claude through creating a production-quality MCP server connecting an LLM to an external API',
   'scaffolding', ARRAY['ai-agent-eng','gen-ai-eng'],
   'GitHub - Anthropic Official', 'claude-code-skill',
   'https://github.com/anthropics/skills/blob/main/skills/mcp-builder/SKILL.md',
   3, 1, 'row-001'),

  ('frontend-design',
   'Creates production-grade frontend interfaces with genuine design quality',
   'code-generation', ARRAY['design-eng','product-eng-fe'],
   'GitHub - Anthropic Official', 'claude-code-skill',
   'https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md',
   3, 2, 'row-002'),

  ('skill-creator',
   'Interactive workflow that guides you through building a new Claude Code skill',
   'tooling-workflow-authoring', ARRAY['mlops','ai-agent-eng','gen-ai-eng','senior-backend-py','design-eng','product-eng-fe','product-eng-be','cloud-devops','cloud-security','cloud-finops'],
   'GitHub - Anthropic Official', 'claude-code-skill',
   'https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md',
   3, 1, 'row-003'),

  ('doc-coauthoring',
   'Three-stage collaborative document writing workflow with enterprise integrations',
   'documentation', ARRAY['mlops','ai-agent-eng','gen-ai-eng','senior-backend-py','design-eng','product-eng-fe','product-eng-be','cloud-devops','cloud-security','cloud-finops'],
   'GitHub - Anthropic Official', 'claude-code-skill',
   'https://github.com/anthropics/skills/blob/main/skills/doc-coauthoring/SKILL.md',
   3, 1, 'row-004'),

  ('pre-mortem',
   'Writes a fictional post-mortem for bugs that have not happened yet, forcing complete causal chains',
   'risk-analysis', ARRAY['senior-backend-py','mlops','ai-agent-eng'],
   'GitHub - Community', 'claude-code-skill',
   'https://github.com/honnibal/claude-skills',
   3, 1, 'row-005'),

  ('resilience-analysis',
   'Identifies fragile production code patterns: shared state, stringly-typed contracts, non-atomic ops',
   'code-review-hardening', ARRAY['senior-backend-py','mlops'],
   'GitHub - Community', 'claude-code-skill',
   'https://github.com/honnibal/claude-skills',
   3, 1, 'row-006'),

  ('mutation-testing',
   'Audits test suite strength by introducing deliberate mutations and checking if tests catch them',
   'testing', ARRAY['senior-backend-py','ai-agent-eng'],
   'GitHub - Community', 'claude-code-skill',
   'https://github.com/honnibal/claude-skills',
   3, 1, 'row-007'),

  ('feature-development workflow',
   'Multi-agent orchestration that takes a feature requirement and coordinates execution across subagents',
   'pipeline-orchestration', ARRAY['product-eng-fe','product-eng-be','ai-agent-eng'],
   'GitHub - Community', 'slash-command',
   'https://github.com/wshobson/commands/tree/main/workflows',
   2, 1, 'row-008'),

  ('security-scan',
   'OWASP Top 10 security vulnerability assessment for a codebase or endpoint',
   'code-review-hardening', ARRAY['senior-backend-py','cloud-devops','cloud-security'],
   'GitHub - Community', 'slash-command',
   'https://github.com/wshobson/commands/tree/main/tools',
   2, 1, 'row-009'),

  ('java-architect',
   'Senior architect guidance for Spring Boot 3.x, Java 21 LTS with Clean Architecture principles',
   'architecture-guidance', ARRAY['senior-backend-py'],
   'GitHub - Community', 'claude-code-skill',
   'https://github.com/Jeffallan/claude-skills/blob/main/skills/java-architect/SKILL.md',
   2, 2, 'row-010'),

  ('nestjs-expert',
   'Activates on NestJS requests and loads authentication, DI, and module-design references',
   'code-generation', ARRAY['product-eng-be'],
   'GitHub - Community', 'claude-code-skill',
   'https://github.com/Jeffallan/claude-skills/tree/main/skills/nestjs-expert',
   2, 2, 'row-011'),

  ('i18n-expert',
   'Complete i18n setup and auditing: library selection, locale file architecture, translation strategy',
   'code-generation', ARRAY['design-eng','product-eng-fe'],
   'GitHub - Community', 'claude-code-skill',
   'https://github.com/daymade/claude-code-skills',
   2, 2, 'row-012'),

  ('Orchestrator-Workers Pattern',
   'Multi-agent architecture where an orchestrator decomposes tasks and delegates to parallel workers',
   'pipeline-orchestration', ARRAY['ai-agent-eng','gen-ai-eng'],
   'Anthropic Cookbook', 'jupyter-notebook',
   'https://github.com/anthropics/anthropic-cookbook/blob/main/patterns/agents/orchestrator_workers.ipynb',
   3, 1, 'row-013'),

  ('Evaluator-Optimizer Loop',
   'One LLM generates output, a second evaluates it and returns feedback; loops until approved',
   'evaluation-monitoring', ARRAY['ai-agent-eng','gen-ai-eng','mlops'],
   'Anthropic Cookbook', 'jupyter-notebook',
   'https://github.com/anthropics/anthropic-cookbook/blob/main/patterns/agents/evaluator_optimizer.ipynb',
   3, 1, 'row-014'),

  ('Basic Workflows (Chaining, Routing, Parallelization)',
   'Three foundational agentic patterns: sequential LLM chaining, input routing, parallel LLM calls',
   'pipeline-orchestration', ARRAY['ai-agent-eng','gen-ai-eng'],
   'Anthropic Cookbook', 'jupyter-notebook',
   'https://github.com/anthropics/anthropic-cookbook/blob/main/patterns/agents/basic_workflows.ipynb',
   3, 1, 'row-015'),

  ('Building Evaluations',
   'Two grading strategies for LLM outputs: code-based (deterministic) and model-based (rubric scoring)',
   'evaluation-monitoring', ARRAY['mlops','gen-ai-eng','ai-agent-eng'],
   'Anthropic Cookbook', 'jupyter-notebook',
   'https://github.com/anthropics/anthropic-cookbook/blob/main/misc/building_evals.ipynb',
   3, 1, 'row-016'),

  ('Prompt Caching',
   'Caches large stable prompt segments across API calls to reduce latency and cut costs by up to 90%',
   'optimization', ARRAY['gen-ai-eng','mlops'],
   'Anthropic Cookbook', 'jupyter-notebook',
   'https://github.com/anthropics/anthropic-cookbook/blob/main/misc/prompt_caching.ipynb',
   3, 1, 'row-017'),

  ('Multi-Agent Research System',
   'Three packaged system prompts: lead agent coordinates, subagents execute tasks, citations agent tracks sources',
   'agent-design', ARRAY['ai-agent-eng','gen-ai-eng'],
   'Anthropic Cookbook', 'system-prompt',
   'https://github.com/anthropics/anthropic-cookbook/tree/main/patterns/agents/prompts',
   3, 1, 'row-018'),

  ('RAG with Pinecone',
   'Full RAG pipeline: embedding, indexing, retrieval, and synthesis using Claude + Pinecone',
   'retrieval-data-pipeline', ARRAY['gen-ai-eng','ai-agent-eng'],
   'Anthropic Cookbook', 'jupyter-notebook',
   'https://github.com/anthropics/claude-cookbooks/blob/main/third_party/Pinecone/rag_using_pinecone.ipynb',
   3, 1, 'row-019'),

  ('SQLDatabaseChain',
   'Accepts a natural language question, generates SQL, executes it, and returns a summarized answer',
   'retrieval-data-pipeline', ARRAY['senior-backend-py','mlops'],
   'LangChain', 'framework-tool',
   'https://python.langchain.com/api_reference/experimental/sql/langchain_experimental.sql.base.SQLDatabaseChain.html',
   2, 1, 'row-020'),

  ('GitHubToolkit',
   'Gives an LLM agent the ability to read repos, open issues, create PRs, and inspect commit history',
   'integration-tooling', ARRAY['ai-agent-eng','product-eng-be','senior-backend-py'],
   'LangChain', 'framework-tool',
   'https://python.langchain.com/api_reference/community/agent_toolkits/langchain_community.agent_toolkits.github.toolkit.GitHubToolkit.html',
   3, 1, 'row-021'),

  ('PythonREPLTool',
   'Executes arbitrary Python code in a live REPL session and returns stdout',
   'testing', ARRAY['ai-agent-eng','senior-backend-py','mlops'],
   'LangChain', 'framework-tool',
   'https://python.langchain.com/api_reference/experimental/tools.html',
   2, 1, 'row-022'),

  ('ShellTool',
   'Runs arbitrary bash commands and returns output, with optional human-in-the-loop confirmation',
   'integration-tooling', ARRAY['mlops','cloud-devops','senior-backend-py'],
   'LangChain', 'framework-tool',
   'https://python.langchain.com/api_reference/community/tools/langchain_community.tools.shell.tool.ShellTool.html',
   2, 1, 'row-023'),

  ('VectorStoreQATool',
   'Wraps a vector store and answers natural language questions by retrieving document chunks',
   'retrieval-data-pipeline', ARRAY['gen-ai-eng','ai-agent-eng'],
   'LangChain', 'framework-tool',
   'https://python.langchain.com/api_reference/community/tools/langchain_community.tools.vectorstore.tool.VectorStoreQATool.html',
   3, 1, 'row-024'),

  ('JiraToolkit',
   'CRUD operations over Jira issues and project state as agent-callable tools',
   'integration-tooling', ARRAY['ai-agent-eng','cloud-devops'],
   'LangChain', 'framework-tool',
   'https://python.langchain.com/docs/integrations/tools/jira',
   2, 1, 'row-025'),

  ('Python LLM & ML Workflow rules',
   'Cursor rules for a Python ML engineer: vectorized ops, JAX best practices, performance optimization',
   'code-quality-standards', ARRAY['senior-backend-py','mlops','gen-ai-eng'],
   'cursor.directory / GitHub', 'cursor-rule',
   'https://github.com/PatrickJS/awesome-cursorrules/blob/main/rules/python-llm-ml-workflow-cursorrules-prompt-file/.cursorrules',
   2, 1, 'row-026'),

  ('Agentic cursorrules',
   'Manages multiple AI agents in Cursor through strict file-tree partitioning and domain boundaries',
   'agent-design', ARRAY['ai-agent-eng'],
   'GitHub - Community', 'cursor-rule',
   'https://github.com/s-smits/agentic-cursorrules',
   2, 1, 'row-027'),

  ('DevOps GPT',
   'General-purpose DevOps assistant for infrastructure, deployment, and automation tasks',
   'code-generation', ARRAY['cloud-devops'],
   'OpenAI GPT Store', 'custom-gpt',
   'https://chatgpt.com/g/g-lnTXc3PgP-devops-gpt',
   1, 3, 'row-028'),

  ('RAG Expert',
   'Specialized assistant for designing and debugging retrieval-augmented generation pipelines',
   'scaffolding', ARRAY['gen-ai-eng','ai-agent-eng'],
   'OpenAI GPT Store', 'custom-gpt',
   'https://chatgpt.com/g/g-eVxHBQF1E-rag-expert',
   1, 1, 'row-029'),

  ('Code Review Assistant',
   'Reviews code for issues, improvements, and best practices',
   'code-review-hardening', ARRAY['mlops','ai-agent-eng','gen-ai-eng','senior-backend-py','design-eng','product-eng-fe','product-eng-be','cloud-devops','cloud-security','cloud-finops'],
   'OpenAI GPT Store', 'custom-gpt',
   'https://chatgpt.com/g/g-F3dNa2gxP-code-review-assistant',
   1, 1, 'row-030')
ON CONFLICT (sheet_row_id) DO NOTHING;

-- Log the seed as a sync event
INSERT INTO sync_log (rows_synced, rows_added, status)
VALUES (30, 30, 'success');
