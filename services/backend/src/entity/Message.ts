import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import * as domain from "@/domain";
import { Account } from "./Account";
import { MessagingProviderID } from "@/domain";

@Entity()
export class Message implements domain.Message {
  @PrimaryGeneratedColumn("uuid")
  ID!: domain.MessageID;

  @CreateDateColumn()
  time!: Date;

  @Column({ type: "text" })
  text!: string;

  @Column({ type: "varchar" })
  providerID!: MessagingProviderID;

  @ManyToOne((type) => Account, (account) => account.messages)
  @JoinColumn()
  account!: Account;

  @Column()
  direction!: "user" | "system";

  @OneToOne((type) => Message, (message) => message.ID)
  responseTo?: Message | undefined;
}
