import { Named } from "@/utils";
import { User } from "./User";
import { MessagingProviderID } from "./Messaging";

export interface Account {
  ID: AccountID;
  providerID: MessagingProviderID;
  user: User;
}

export type AccountID = Named<string, "accountID">;
