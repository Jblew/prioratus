import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";
import * as domain from "@/domain";
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
}
