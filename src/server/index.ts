import { createClient } from '@supabase/supabase-js'
import appjson from '@/config'

const supabaseUrl = appjson.REACT_APP_SUPABASE_URL as string
const supabaseAnonKey = appjson.REACT_APP_SUPABASE_ANON_KEY as string

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase