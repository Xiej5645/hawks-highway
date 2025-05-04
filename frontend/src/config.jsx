// Supabase API configuration
const SUPABASE_URL = 'https://foagyxxqjxjknjasktus.supabase.co';
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvYWd5eHhxanhqa25qYXNrdHVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMTQzNzYsImV4cCI6MjA2MTg5MDM3Nn0.kM-3fBQlAYnBJVN89oYrhS5p_4PcFrsS_EdwxreK5VM';

// Users API endpoint
const USERS_ENDPOINT = '/rest/v1/users';

// Combined Supabase API configuration
export const VITE_SUPA = `${SUPABASE_URL}${USERS_ENDPOINT}?apikey=${SUPABASE_API_KEY}`;