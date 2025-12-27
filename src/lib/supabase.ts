
import { createClient } from '@supabase/supabase-js'

// Fallback to different possible naming conventions
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_PROJECT_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

console.log('[Supabase Config] URL:', supabaseUrl ? 'Set' : 'Missing')
console.log('[Supabase Config] Key:', supabaseAnonKey ? 'Set' : 'Missing')

if (!supabaseUrl || !supabaseAnonKey) {
    // eslint-disable-next-line no-console
    console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
    console.error('Available Environment Variables:', import.meta.env)
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')

