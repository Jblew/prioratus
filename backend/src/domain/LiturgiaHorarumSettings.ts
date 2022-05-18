import { LiturgiaHorarumParsSlug, UserID } from ".";

export interface LiturgiaHorarumSettings {
  user: UserID;
  parsSettings: ParsSettings;
}

export interface ParsSettings {
  parsSlug: LiturgiaHorarumParsSlug;
  enabled: boolean;
  hour?: Date;
}
