// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jokixtyjmrhvjxibmigz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impva2l4dHlqbXJodmp4aWJtaWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNzQ4ODEsImV4cCI6MjA1Nzg1MDg4MX0.mpZhMxf7hlASMZruEc081nvgyNlU91oiAmUAeXEGfkM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);