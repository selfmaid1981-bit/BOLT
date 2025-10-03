import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface QuoteRequest {
  id?: string;
  service_type: string;
  property_size: string;
  bedrooms: number;
  bathrooms: number;
  frequency: string;
  extras: string[];
  estimated_price: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export async function submitQuoteRequest(quoteData: QuoteRequest) {
  const { data, error } = await supabase
    .from('quote_requests')
    .insert([quoteData])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
