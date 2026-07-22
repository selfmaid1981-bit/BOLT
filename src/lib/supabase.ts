import { createClient } from '@supabase/supabase-js';

export class SupabaseConfigurationError extends Error {
  constructor() {
    super('Missing Supabase environment variables');
    this.name = 'SupabaseConfigurationError';
  }
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

const missingConfigKeys = [
  !supabaseUrl && 'VITE_SUPABASE_URL',
  !supabaseAnonKey && 'VITE_SUPABASE_ANON_KEY',
].filter(Boolean) as string[];

const hasSupabaseConfig = missingConfigKeys.length === 0;

if (!hasSupabaseConfig) {
  const readableList = missingConfigKeys.join(' & ');
  console.warn(
    `Supabase environment variables are not configured (${readableList}). Quote requests will not be submitted until these values are provided.`
  );
}

const supabaseClient = hasSupabaseConfig
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export const supabase = supabaseClient;
export const isSupabaseConfigured = hasSupabaseConfig;
export const missingSupabaseConfigKeys = missingConfigKeys;

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
  if (!supabaseClient) {
    throw new SupabaseConfigurationError();
  }

  const { data, error } = await supabaseClient
    .from('quote_requests')
    .insert([quoteData])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
