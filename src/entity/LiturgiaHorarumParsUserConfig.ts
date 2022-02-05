import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";

@Entity({ name: "liturgia_horarum_pars_user_config" })
export class LiturgiaHorarumParsUserConfig {
  @Column()
  @PrimaryColumn()
  userEmail!: string;

  @Column()
  parsSlug!: string;

  @Column()
  enabled!: boolean;

  @Column()
  hour!: Date;
}
