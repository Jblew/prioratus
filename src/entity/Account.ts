import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import * as domain from "@/domain";
import { User } from "./User";

@Entity()
export class Account implements domain.Account {
  @PrimaryGeneratedColumn("uuid")
  ID!: domain.AccountID;

  @Column({ type: "varchar" })
  providerID!: domain.MessagingProviderID;

  @ManyToOne((type) => User, (user) => user.accounts)
  @JoinColumn()
  user!: User;
}
