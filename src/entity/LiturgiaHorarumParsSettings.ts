import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class LiturgiaHorarumParsSettings {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userEmail!: string;

  @Column()
  parsSlug!: string;

  @Column()
  enabled!: boolean;

  @Column()
  hour!: Date;
}
