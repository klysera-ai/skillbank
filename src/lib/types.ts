export interface Skill {
  id: number
  skill_name: string
  description: string
  task_category: string
  roles: string[]
  source_platform: string
  format_type: string
  source_link: string | null
  quality_rating: 1 | 2 | 3
  phase: 1 | 2 | 3
  created_at: string
  updated_at: string
}

export interface Role {
  slug: string
  display_name: string
  phase: 1 | 2 | 3
  cluster_name: string
  sort_order: number
}

export interface TaskCategory {
  slug: string
  display_name: string
  layer: 'Build' | 'Operate' | 'Quality' | 'Support'
  sort_order: number
}

export interface FormatType {
  slug: string
  display_name: string
  sort_order: number
}

export interface SyncLogEntry {
  id: number
  synced_at: string
  rows_synced: number
  rows_added: number
  rows_updated: number
  status: string
}
