import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface AssessmentLead {
  name: string;
  email: string;
  company?: string;
}

export async function createAssessmentLead(lead: AssessmentLead) {
  const { data, error } = await supabase
    .from('assessment_leads')
    .insert([
      {
        name: lead.name,
        email: lead.email,
        company: lead.company || null,
        created_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) throw error;
  return data;
}
