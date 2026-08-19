const SUPABASE_URL = 'https://ypsqcqxjrzuaxlbdklvm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_dBRFnVTYyfwvkF5Fzk2fiw_bSTg-egQ';

function getSupabase() {
    if (window.__supabase) return window.__supabase;
    window.__supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
            storage: window.localStorage
        }
    });
    return window.__supabase;
}
