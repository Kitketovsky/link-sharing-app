import type { ExtendedDatabase } from "./extended";

export type TablesRow<T extends keyof ExtendedDatabase["public"]["Tables"]> =
  ExtendedDatabase["public"]["Tables"][T]["Row"];

export type TablesInsert<T extends keyof ExtendedDatabase["public"]["Tables"]> =
  ExtendedDatabase["public"]["Tables"][T]["Insert"];

export type TablesUpdate<T extends keyof ExtendedDatabase["public"]["Tables"]> =
  ExtendedDatabase["public"]["Tables"][T]["Update"];
