import { Named } from "@/utils";
import { Account } from "./Account";

export interface MessagingProvider {
  ID: MessagingProviderID;
}

export type MessagingProviderID = Named<string, "messagingProviderID">;

export interface Message {
  ID: MessageID;
  time: Date;
  text: string;
  providerID: MessagingProviderID;
  account: Account;
  direction: "user" | "system";
  responseTo?: Message;
}

export type MessageID = Named<string, "messageID">;
