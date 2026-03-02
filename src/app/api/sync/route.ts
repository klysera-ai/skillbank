import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// ─────────────────────────────────────────────
// Slug Maps (inlined from constants.ts)
// ─────────────────────────────────────────────

const ROLE_SLUG_MAP: Record<string, string> = {
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

const CATEGORY_SLUG_MAP: Record<string, string> = {
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

const FORMAT_SLUG_MAP: Record<string, string> = {
  'Claude Code skill (SKILL.md)': 'claude-code-skill',
  'Jupyter notebook': 'jupyter-notebook',
  'Framework tool (Python class)': 'framework-tool',
  'Cursor rule (.cursorrules)': 'cursor-rule',
  'Custom GPT': 'custom-gpt',
  'Slash command / prompt file': 'slash-command',
  'System prompt (.md)': 'system-prompt',
  'Prompt file (system prompt .md)': 'system-prompt',
}

// Tab names in the spreadsheet (one per role)
const SHEET_TABS = [
  'MLOps Engineer',
  'AI Agent Engineer',
  'Generative AI Eng',
  'Sr Backend Python',
  'Design Engineer',
  'Product Eng FE',
  'Product Eng BE',
  'Cloud DevOps',
  'Cloud Security',
  'Cloud FinOps',
]

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function parseRoles(raw: string): string[] {
  if (!raw || !raw.trim()) return []
  return raw
    .split(/,\s*/)
    .map((r) => ROLE_SLUG_MAP[r.trim()])
    .filter((slug): slug is string => !!slug)
}

function parseQuality(raw: string): 1 | 2 | 3 | null {
  const n = parseInt(raw, 10)
  if (n >= 1 && n <= 3) return n as 1 | 2 | 3
  return null
}

type SkillRow = {
  skill_name: string
  description: string
  task_category: string
  roles: string[]
  source_platform: string
  format_type: string
  source_link: string | null
  quality_rating: 1 | 2 | 3
  sheet_row_id: string
}

type Warning = { tab: string; row: number; message: string }

function parseSheetRow(
  row: string[],
  tabName: string,
  rowIndex: number,
): { skill: SkillRow | null; warnings: Warning[] } {
  const warnings: Warning[] = []
  const warn = (msg: string) =>
    warnings.push({ tab: tabName, row: rowIndex + 2, message: msg })

  // Columns: # | Skill Name | What It Does | Task Category | Roles | Source Platform | Format Type | Source Link | Quality
  const [, skillName, description, categoryRaw, rolesRaw, sourcePlatform, formatRaw, sourceLink, qualityRaw] = row

  if (!skillName?.trim()) return { skill: null, warnings }

  const categorySlug = CATEGORY_SLUG_MAP[categoryRaw?.trim()]
  if (!categorySlug) {
    warn(`Unknown category: "${categoryRaw}"`)
    return { skill: null, warnings }
  }

  const formatSlug = FORMAT_SLUG_MAP[formatRaw?.trim()]
  if (!formatSlug) {
    warn(`Unknown format type: "${formatRaw}"`)
    return { skill: null, warnings }
  }

  const roles = parseRoles(rolesRaw ?? '')
  if (roles.length === 0) {
    warn(`No valid roles parsed from: "${rolesRaw}"`)
    return { skill: null, warnings }
  }

  const quality = parseQuality(qualityRaw ?? '')
  if (!quality) {
    warn(`Invalid quality rating: "${qualityRaw}"`)
    return { skill: null, warnings }
  }

  // Generate stable sheet_row_id from tab slug + row number
  const tabSlug = tabName.toLowerCase().replace(/\s+/g, '-')
  const sheetRowId = `${tabSlug}-row-${rowIndex + 2}`

  return {
    skill: {
      skill_name: skillName.trim(),
      description: (description ?? '').trim(),
      task_category: categorySlug,
      roles,
      source_platform: (sourcePlatform ?? '').trim(),
      format_type: formatSlug,
      source_link: sourceLink?.trim() || null,
      quality_rating: quality,
      sheet_row_id: sheetRowId,
    },
    warnings,
  }
}

// ─────────────────────────────────────────────
// API Route Handler
// ─────────────────────────────────────────────

export async function POST(request: NextRequest) {
  // Auth check
  const syncSecret = process.env.SYNC_SECRET
  if (!syncSecret) {
    return NextResponse.json({ error: 'SYNC_SECRET not configured' }, { status: 500 })
  }

  const authHeader = request.headers.get('authorization')
  const token = authHeader?.replace(/^Bearer\s+/i, '')
  if (token !== syncSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Config check
  const sheetsApiKey = process.env.GOOGLE_SHEETS_API_KEY
  const sheetId = process.env.GOOGLE_SHEETS_ID
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!sheetsApiKey || !sheetId || !supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: 'Missing env vars: GOOGLE_SHEETS_API_KEY, GOOGLE_SHEETS_ID, SUPABASE_SERVICE_ROLE_KEY' },
      { status: 500 },
    )
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey)

  try {
    // Batch-read all tabs from the sheet
    const ranges = SHEET_TABS.map((tab) => `'${tab}'!A:I`).join('&ranges=')
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet?ranges=${ranges}&key=${sheetsApiKey}`

    const sheetsRes = await fetch(url)
    if (!sheetsRes.ok) {
      const errText = await sheetsRes.text()
      throw new Error(`Google Sheets API error (${sheetsRes.status}): ${errText}`)
    }

    const sheetsData = await sheetsRes.json()
    const valueRanges: { range: string; values?: string[][] }[] = sheetsData.valueRanges ?? []

    // Parse all rows across all tabs
    const allSkills: SkillRow[] = []
    const allWarnings: Warning[] = []

    for (let tabIdx = 0; tabIdx < valueRanges.length; tabIdx++) {
      const tabName = SHEET_TABS[tabIdx]
      const rows = valueRanges[tabIdx].values ?? []

      // Skip header row (index 0), process data rows
      for (let rowIdx = 1; rowIdx < rows.length; rowIdx++) {
        const { skill, warnings } = parseSheetRow(rows[rowIdx], tabName, rowIdx)
        allWarnings.push(...warnings)
        if (skill) allSkills.push(skill)
      }
    }

    // Deduplicate by skill_name (same skill can appear in multiple role tabs)
    // Merge roles from duplicate entries
    const skillMap = new Map<string, SkillRow>()
    for (const skill of allSkills) {
      const existing = skillMap.get(skill.skill_name)
      if (existing) {
        // Merge roles (union)
        const mergedRoles = [...new Set([...existing.roles, ...skill.roles])]
        skillMap.set(skill.skill_name, { ...existing, roles: mergedRoles })
      } else {
        skillMap.set(skill.skill_name, skill)
      }
    }

    const dedupedSkills = [...skillMap.values()]

    // Use the first occurrence's sheet_row_id as the canonical one
    // This ensures idempotent upserts

    // Upsert into Supabase
    let added = 0
    let updated = 0
    const errors: string[] = []

    for (const skill of dedupedSkills) {
      // Check if this sheet_row_id already exists
      const { data: existing } = await supabase
        .from('skills')
        .select('id')
        .eq('sheet_row_id', skill.sheet_row_id)
        .maybeSingle()

      const { error } = await supabase.from('skills').upsert(
        {
          skill_name: skill.skill_name,
          description: skill.description,
          task_category: skill.task_category,
          roles: skill.roles,
          source_platform: skill.source_platform,
          format_type: skill.format_type,
          source_link: skill.source_link,
          quality_rating: skill.quality_rating,
          sheet_row_id: skill.sheet_row_id,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'sheet_row_id' },
      )

      if (error) {
        errors.push(`${skill.skill_name}: ${error.message}`)
      } else if (existing) {
        updated++
      } else {
        added++
      }
    }

    // Log to sync_log
    const status = errors.length > 0 ? 'partial' : 'success'
    await supabase.from('sync_log').insert({
      rows_synced: dedupedSkills.length,
      rows_added: added,
      rows_updated: updated,
      status,
      error_message: errors.length > 0 ? errors.join('; ') : null,
    })

    return NextResponse.json({
      status,
      synced: dedupedSkills.length,
      added,
      updated,
      warnings: allWarnings,
      errors,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)

    // Log failure
    await supabase.from('sync_log').insert({
      rows_synced: 0,
      rows_added: 0,
      rows_updated: 0,
      status: 'error',
      error_message: message,
    })

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
