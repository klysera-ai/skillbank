# SB-01 Dashboard — Codex Handoff (Remaining Work)

## Project

Next.js 15 App Router project at `sb01-dashboard/`. Tailwind CSS, TypeScript, Recharts, Framer Motion installed.

## What's Already Built (DO NOT recreate)

- **Data layer:** `src/lib/types.ts`, `supabase.ts`, `queries.ts`, `constants.ts`
  - `constants.ts` contains all 30 seed skills, 10 roles, 15 task categories, 7 format types, brand colors
  - `queries.ts` has a local fallback (no Supabase needed to develop)
  - `types.ts` has all TypeScript interfaces: Skill, Role, TaskCategory, FormatType
- **Layout:** `src/app/layout.tsx`, `globals.css`, `Navbar.tsx`, `Footer.tsx`, `PageContainer.tsx`
  - Fonts: DM Serif Display (display headings, CSS var `font-display`) + Outfit (body text)
  - Colors defined as CSS vars and Tailwind theme: `text-offwhite`, `bg-navy`, `bg-navy-light`, `text-body-muted`, `border-navy-light`, `border-navy-muted`
- **Overview page** (`src/app/page.tsx`) — COMPLETE, imports StatCard, ProgressRing, QualityDistribution, WeeklyGrowthChart
- **All metric components** — COMPLETE:
  - `src/components/metrics/StatCard.tsx`
  - `src/components/metrics/ProgressRing.tsx`
  - `src/components/metrics/QualityDistribution.tsx` ("use client", Recharts)
  - `src/components/metrics/WeeklyGrowthChart.tsx` ("use client", Recharts)
- **Skills page** (`src/app/skills/page.tsx`) — COMPLETE
- **All skill components** — COMPLETE:
  - `src/components/skills/QualityBadge.tsx`
  - `src/components/skills/RolePill.tsx`
  - `src/components/skills/SkillFilters.tsx` ("use client")
  - `src/components/skills/SkillTable.tsx` ("use client")
- **Taxonomy components (partial)** — these 3 are COMPLETE:
  - `src/components/taxonomy/LayerCard.tsx`
  - `src/components/taxonomy/TaxonomyGrid.tsx`
  - `src/components/taxonomy/FormatTypeBar.tsx` ("use client", Recharts)
- **Role components** — these 3 are COMPLETE:
  - `src/components/roles/RoleCard.tsx`
  - `src/components/roles/RoleCoverageChart.tsx` ("use client", Recharts)
  - `src/components/roles/RoleGapList.tsx`
- **Schema:** `supabase/migrations/001_initial_schema.sql`

---

## Design Direction

Editorial/refined meets data-dense. Dark navy background (#001F3F), off-white text (#F0F4F8). NOT generic AI slop. No Inter, no Roboto. Think Bloomberg Terminal crossed with a luxury brand lookbook.

## Brand Colors (use these Tailwind classes)

| Color | Hex | Tailwind class |
|---|---|---|
| Navy (background) | #001F3F | `bg-navy` |
| Navy light (cards) | #0A2E54 | `bg-navy-light` |
| Navy muted (borders) | #132D4A | `border-navy-muted` |
| Off-white (text) | #F0F4F8 | `text-offwhite` |
| Body muted (secondary text) | #6B7280 | `text-body-muted` |
| Accent (blue) | #3B82F6 | -- |
| Build layer | #3B82F6 | blue |
| Operate layer | #8B5CF6 | purple |
| Quality layer | #10B981 | green |
| Support layer | #F59E0B | amber |
| Quality 3 | #10B981 | green |
| Quality 2 | #F59E0B | amber |
| Quality 1 | #EF4444 | red |

## Typography

- `font-display` = DM Serif Display (for hero text, section headers, large numbers)
- Default body font = Outfit (for everything else)
- Section labels: `text-xs uppercase tracking-[0.15em] text-body-muted`

---

## REMAINING WORK: 3 files to create

### FILE 1: `src/components/taxonomy/Heatmap.tsx` ("use client")

THE STANDOUT VISUALIZATION of the entire dashboard.

**Props:** `{ skills: Skill[], roles: Role[], taskCategories: TaskCategory[] }`

**Behavior:**
- 10 rows (roles) x 15 columns (task categories)
- CSS Grid of `<div>` cells (NOT a charting library). Pure divs for full control.
- Each cell's color and opacity is determined by the skill count at that (role, category) intersection
- To compute counts: for each role and category, count skills where `skill.roles.includes(role.slug) && skill.task_category === category.slug`

**Colors:**
- Columns are grouped by layer (each category has a `layer` field: Build, Operate, Quality, Support)
- Use the layer color for that column group:
  - Build = `#3B82F6` (blue)
  - Operate = `#8B5CF6` (purple)
  - Quality = `#10B981` (green)
  - Support = `#F59E0B` (amber)
- Zero-count cells: `bg-navy-muted/30` (dim placeholder)
- Non-zero cells: layer color at varying opacity based on count:
  - 1 skill: 30% opacity
  - 2 skills: 50% opacity
  - 3+ skills: 80% opacity

**Layout details:**
- Column headers (category names): rotated 45 degrees, `text-[10px] text-body-muted`
- Row headers (role display names): left-aligned, `text-xs text-offwhite`
- Cell size: roughly 32x32px with 2px gap
- Hover tooltip showing: "Role: {role_name}, Category: {category_name}, Skills: {count}"
  - Use a simple absolute-positioned div for tooltip, controlled by useState
- Horizontally scrollable on mobile: wrap grid in `overflow-x-auto`

**Imports needed:**
```tsx
import { COLORS } from '@/lib/constants'
import type { Skill, Role, TaskCategory } from '@/lib/types'
```

---

### FILE 2: `src/app/taxonomy/page.tsx`

Server component. Import data via `getAllSkills()`, `getAllTaskCategories()`, `getAllRoles()`, `getAllFormatTypes()` from `@/lib/queries`.

**Layout:**
```
"Taxonomy" font-display text-4xl text-offwhite tracking-tight
"How skills map across layers, categories, roles, and formats" text-body-muted subtitle

TaxonomyGrid component (already built, pass skills + taskCategories)

"Format Types" section heading (font-display text-2xl text-offwhite, mt-16)
FormatTypeBar component (already built)
  - Compute data: group skills by format_type, count each, map slug to display_name via FORMAT_TYPES constant
  - Pass as: { data: { name: string, count: number }[] }

"Coverage Matrix" section heading (font-display text-2xl text-offwhite, mt-16)
Heatmap component (the new one you're creating)
  - Pass: { skills, roles, taskCategories }
```

**Imports needed:**
```tsx
import { PageContainer } from '@/components/layout/PageContainer'
import { TaxonomyGrid } from '@/components/taxonomy/TaxonomyGrid'
import { FormatTypeBar } from '@/components/taxonomy/FormatTypeBar'
import { Heatmap } from '@/components/taxonomy/Heatmap'
import { getAllSkills, getAllTaskCategories, getAllRoles, getAllFormatTypes } from '@/lib/queries'
import { FORMAT_TYPES } from '@/lib/constants'
```

Add metadata:
```tsx
export const metadata = {
  title: 'Taxonomy | Klysera Skill Bank',
  description: 'Explore how skills map across layers, categories, roles, and formats.',
}
```

---

### FILE 3: `src/app/roles/page.tsx`

Server component. Import via `getAllSkills()`, `getAllRoles()`, `getAllTaskCategories()` from `@/lib/queries`.

**Layout:**
```
"Roles" font-display text-4xl text-offwhite tracking-tight
"Explore skill coverage by engineering role" text-body-muted subtitle

Grouped by cluster: "AI Cluster", "Product Cluster", "Cloud Cluster"
For each cluster:
  - Cluster heading: text-xs uppercase tracking-[0.15em] text-body-muted, mt-12 mb-4
  - Grid of RoleCards: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
```

**Computing props for each RoleCard:**
- `skillCount`: count skills where `skill.roles.includes(role.slug)`
- `topCategories`: for skills matching this role, count by task_category, take the top 3 category display_names
  - Look up display_name via `TASK_CATEGORIES.find(c => c.slug === catSlug)?.display_name`

**Imports needed:**
```tsx
import { PageContainer } from '@/components/layout/PageContainer'
import { RoleCard } from '@/components/roles/RoleCard'
import { getAllSkills, getAllRoles, getAllTaskCategories } from '@/lib/queries'
import { TASK_CATEGORIES } from '@/lib/constants'
```

Add metadata:
```tsx
export const metadata = {
  title: 'Roles | Klysera Skill Bank',
  description: 'Explore skill coverage by engineering role.',
}
```

---

### FILE 4: `src/app/roles/[slug]/page.tsx`

Server component with `generateStaticParams`.

**`generateStaticParams`:**
```tsx
import { ROLES } from '@/lib/constants'

export function generateStaticParams() {
  return ROLES.map((role) => ({ slug: role.slug }))
}
```

**`generateMetadata`:**
```tsx
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const roles = await getAllRoles()
  const role = roles.find(r => r.slug === slug)
  return {
    title: `${role?.display_name ?? slug} | Klysera Skill Bank`,
  }
}
```

**Page function:**
- Await params: `const { slug } = await params`
- Fetch: `getAllSkills()`, `getAllRoles()`, `getAllTaskCategories()`
- Find role: `roles.find(r => r.slug === slug)` — if not found, call `notFound()` from `next/navigation`
- Filter skills for this role: `skills.filter(s => s.roles.includes(slug))`
- Compute `skillCountByCategory`: `Record<string, number>` mapping each category slug to the count of this role's skills in that category
- Compute quality breakdown: count of quality 1, 2, 3 among this role's skills
- Compute gaps: categories with 0 skills for this role, including their layer

**Layout:**
```
Role display_name in font-display text-4xl text-offwhite
Badges row: cluster badge + phase badge (same style as RoleCard)

Stat strip (grid-cols-2 md:grid-cols-4 gap-4, mt-8):
  StatCard: total skills for this role
  StatCard: quality 3 count, label "Production-ready"
  StatCard: quality 2 count, label "Usable"
  StatCard: quality 1 count, label "Concept"

"Category Coverage" section (mt-16)
  RoleCoverageChart (already built)
    Props: { categories: taskCategories, skillCountByCategory }

"Skills" section (mt-16)
  Simple table of this role's skills (not the full SkillTable, just a basic table):
    Columns: Skill Name, Category, Quality, Source
    Use QualityBadge for quality column
    Link source_link with external link icon
    Same dark theme styling as SkillTable

"Coverage Gaps" section (mt-16)
  RoleGapList (already built)
    Props: { gaps: { category_name: string, layer: string }[] }
```

**Imports needed:**
```tsx
import { notFound } from 'next/navigation'
import { PageContainer } from '@/components/layout/PageContainer'
import { StatCard } from '@/components/metrics/StatCard'
import { RoleCoverageChart } from '@/components/roles/RoleCoverageChart'
import { RoleGapList } from '@/components/roles/RoleGapList'
import { QualityBadge } from '@/components/skills/QualityBadge'
import { getAllSkills, getAllRoles, getAllTaskCategories } from '@/lib/queries'
import { ROLES, TASK_CATEGORIES, COLORS, QUALITY_LABELS } from '@/lib/constants'
```

---

## Existing Component Props Reference (for wiring)

**StatCard:** `{ value: string | number, label: string, suffix?: string }`

**RoleCard:** `{ role: Role, skillCount: number, topCategories: string[] }`

**RoleCoverageChart:** `{ categories: TaskCategory[], skillCountByCategory: Record<string, number> }`

**RoleGapList:** `{ gaps: { category_name: string, layer: string }[] }`

**QualityBadge:** `{ rating: 1 | 2 | 3 }`

**TaxonomyGrid:** `{ skills: Skill[], taskCategories: TaskCategory[] }`

**FormatTypeBar:** `{ data: { name: string, count: number }[] }`

**PageContainer:** `{ children: React.ReactNode }` — wraps content in `mx-auto max-w-7xl px-6 py-12 lg:px-8`

---

## How to verify

```bash
cd sb01-dashboard
npm run dev
# Visit localhost:3000 — Overview should render with charts and metrics
# Visit /skills — 30 skills, filterable and sortable
# Visit /taxonomy — layer grid, format bar, and heatmap
# Visit /roles — 10 role cards grouped by cluster
# Visit /roles/mlops — MLOps deep-dive with coverage chart and gaps
```

Build check: `npx next build` should compile with 0 errors.
