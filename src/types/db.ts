import { Database } from "../types/supabase";
export type Polls = Database["public"]["Tables"]["Polls"]["Row"];
export type Vote = Database["public"]["Tables"]["Votes"]["Row"];
