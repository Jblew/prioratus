import { Named } from "@/utils";

export interface MessagingProvider {
  ID: MessagingProviderID;
}

export type MessagingProviderID = Named<string, "messagingProviderID">;
