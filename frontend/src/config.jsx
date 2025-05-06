// If you wish to use Supabase 
// Supabase API configuration
const SUPABASE_URL = 'https://<yourUniqueURL>.supabase.co';
const SUPABASE_API_KEY = '<yourPublicAnonKey>';

// Users API endpoint
const USERS_ENDPOINT = '/rest/v1/<yourTableName>';

// Combined Supabase API configuration
export const VITE_SUPA = `${SUPABASE_URL}${USERS_ENDPOINT}?apikey=${SUPABASE_API_KEY}`;
