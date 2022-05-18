import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import * as domain from "@/domain";
import { User } from "./User";
import { Message } from "./Message";

@Entity()
export class Account implements domain.Account {
  @PrimaryGeneratedColumn("uuid")
  ID!: domain.AccountID;

  @Column({ type: "varchar" })
  providerID!: domain.MessagingProviderID;

  @ManyToOne((type) => User, (user) => user.accounts)
  @JoinColumn()
  user!: User;

  @OneToMany((type) => Message, (message) => message.account)
  messages!: Message[];
}
