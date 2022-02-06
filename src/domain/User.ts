import { Named } from "@/utils";

export interface User {
  ID: UserID;
  displayName: string;
  email: string;
  created: Date;
}

export type UserID = Named<string, User>;
