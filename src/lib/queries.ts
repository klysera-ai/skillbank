import { supabase, isSupabaseConfigured } from './supabase'
import { SEED_SKILLS, ROLES, TASK_CATEGORIES, FORMAT_TYPES } from './constants'
import type { Skill, Role, TaskCategory, FormatType } from './types'

// ─────────────────────────────────────────────
// When Supabase is configured, query the DB.
// Otherwise, use the local seed data so the
// dashboard works in development without a DB.
// ─────────────────────────────────────────────

export async function getAllSkills(): Promise<Skill[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('skill_name', { ascending: true })
    if (error) throw error
    return data as Skill[]
  }

  // Local fallback
  return SEED_SKILLS.map((s, i) => ({
    id: i + 1,
    skill_name: s.skill_name,
    description: s.description,
    task_category: s.task_category,
    roles: [...s.roles],
    source_platform: s.source_platform,
    format_type: s.format_type,
    source_link: s.source_link,
    quality_rating: s.quality_rating as 1 | 2 | 3,
    phase: s.phase as 1 | 2 | 3,
    created_at: new Date(2026, 1, 24 + Math.floor(i / 5)).toISOString(),
    updated_at: new Date(2026, 1, 24 + Math.floor(i / 5)).toISOString(),
  }))
}

export async function getAllRoles(): Promise<Role[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('roles')
      .select('*')
      .order('sort_order', { ascending: true })
    if (error) throw error
    return data as Role[]
  }
  return ROLES as unknown as Role[]
}

export async function getAllTaskCategories(): Promise<TaskCategory[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('task_categories')
      .select('*')
      .order('sort_order', { ascending: true })
    if (error) throw error
    return data as TaskCategory[]
  }
  return TASK_CATEGORIES as unknown as TaskCategory[]
}

export async function getAllFormatTypes(): Promise<FormatType[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('format_types')
      .select('*')
      .order('sort_order', { ascending: true })
    if (error) throw error
    return data as FormatType[]
  }
  return FORMAT_TYPES as unknown as FormatType[]
}

export async function getSkillsByRole(roleSlug: string): Promise<Skill[]> {
  const allSkills = await getAllSkills()
  return allSkills.filter(s => s.roles.includes(roleSlug))
}

export async function getLatestSyncDate(): Promise<string | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('sync_log')
      .select('synced_at')
      .order('synced_at', { ascending: false })
      .limit(1)
    if (error || !data?.length) return null
    return data[0].synced_at
  }
  return new Date(2026, 1, 28).toISOString()
}
