import type { ILink } from "./../ILink";
import type { MergeDeep } from "type-fest";
import type { Database } from "./supabase";

export type ExtendedDatabase = MergeDeep<
  Database,
  {
    public: {
      Tables: {
        users: {
          Row: Omit<Database["public"]["Tables"]["users"]["Row"], "links"> & {
            links: ILink[];
          };
          Insert: Omit<
            Database["public"]["Tables"]["users"]["Insert"],
            "links"
          > & {
            links: ILink[];
          };
          Update: Omit<
            Database["public"]["Tables"]["users"]["Update"],
            "links"
          > & {
            links: ILink[];
          };
        };
      };
    };
  }
>;
