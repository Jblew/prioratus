import { Named } from "@/utils";
import { UserID } from "./User";

export interface MessageChannelProvider {
  slug: string;
  getUserChannel(userID: UserID): MessageChannel;
}

export interface MessageChannel {
    sendMessage(m: Message): Promise<void>
}

export interface Message {
    text: string;
    link: string;
    imageURL: string;
}

export type MessageChannelProviderSlug = Named<string, MessageChannelProvider>;
