import { createClient } from '@supabase/supabase-js'

// Deploy LOCAL de Supabase (npx supabase start).
// La URL y la key las imprime el comando `supabase start`.
// Usar la key "publishable" (o "anon"), nunca la "secret" / "service_role".
const SUPABASE_URL = 'http://127.0.0.1:54321'
const SUPABASE_KEY = 'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
