import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import * as domain from "@/domain";
import { Account } from "./Account";

@Entity()
export class User implements domain.User {
  @PrimaryGeneratedColumn("uuid")
  ID!: domain.UserID;

  @Column()
  displayName!: string;

  @Column()
  email!: string;

  @CreateDateColumn()
  created!: Date;

  @OneToMany((type) => Account, (account) => account.user)
  accounts!: Account[];
}
