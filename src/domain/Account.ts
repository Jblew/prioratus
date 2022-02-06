import { Named } from "@/utils";
import { MessagingProviderID } from ".";
import { UserID } from "./User";

export interface Account {
  ID: AccountID;
  providerID: MessagingProviderID;
  userID: UserID;
}

export type AccountID = Named<string, "accountID">;
