import { Named } from "@/utils";

export interface User {
  ID: UserID;
  displayName: string;
}

export type UserID = Named<string, User>

