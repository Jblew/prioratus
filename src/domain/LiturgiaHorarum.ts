import { Named } from "@/utils";

export interface LiturgiaHorarum {
  getPartes(): Record<LiturgiaHorarumParsSlug, LiturgiaHorarumPars>;
}

export interface LiturgiaHorarumProvider {
  getLiturgiaHorarum(): LiturgiaHorarum;
}

export interface LiturgiaHorarumPars {
  slug: LiturgiaHorarumParsSlug;
  displayName: string;
  description: string;
  hour: Date;
  getLink(): Promise<string>;
}

export type LiturgiaHorarumParsSlug = Named<string, "LiturgiaHorarumParsSlug">;

export function getLiturgiaHorarum(): LiturgiaHorarum {
  return {
    getPartes: () => getPartes(),
  };
}

function getPartes(): Record<LiturgiaHorarumParsSlug, LiturgiaHorarumPars> {
  return {
    ["officium-lectionis" as LiturgiaHorarumParsSlug]: {
      slug: "officium-lectionis" as LiturgiaHorarumParsSlug,
      displayName: "Officium Lectionis",
      description:
        "quod locum tenet antiqui Matutini, potest qualibet diei aut noctis hora recitari.",
      hour: new Date("00:00:00Z"),
      getLink: async () => "https://brewiarz.pl/dzis.php?link=gc",
    },
    ["laudes-matutinae" as LiturgiaHorarumParsSlug]: {
      slug: "laudes-matutinae" as LiturgiaHorarumParsSlug,
      displayName: "Laudes Matutinae",
      description: "dicuntur summo mane aut hora prima.",
      hour: new Date("07:00:00Z"),
      getLink: async () => "https://brewiarz.pl/dzis.php?link=jt",
    },
    ["tertia" as LiturgiaHorarumParsSlug]: {
      slug: "tertia" as LiturgiaHorarumParsSlug,
      displayName: "Tertia",
      description: "dicuntur iisdem horis, quarum secumferunt nomina.",
      hour: new Date("09:00:00Z"),
      getLink: async () => "https://brewiarz.pl/dzis.php?link=m1",
    },
    ["sexta" as LiturgiaHorarumParsSlug]: {
      slug: "sexta" as LiturgiaHorarumParsSlug,
      displayName: "Sexta",
      description: "dicuntur iisdem horis, quarum secumferunt nomina.",
      hour: new Date("12:00:00Z"),
      getLink: async () => "https://brewiarz.pl/dzis.php?link=m2",
    },
    ["nona" as LiturgiaHorarumParsSlug]: {
      slug: "nona" as LiturgiaHorarumParsSlug,
      displayName: "Nona",
      description: "dicuntur iisdem horis, quarum secumferunt nomina.",
      hour: new Date("15:00:00Z"),
      getLink: async () => "https://brewiarz.pl/dzis.php?link=m3",
    },
    ["vespera" as LiturgiaHorarumParsSlug]: {
      slug: "vespera" as LiturgiaHorarumParsSlug,
      displayName: "Vespera",
      description: "dicitur ad horam undecimam.",
      hour: new Date("18:00:00Z"),
      getLink: async () => "https://brewiarz.pl/dzis.php?link=np",
    },
    ["completorium" as LiturgiaHorarumParsSlug]: {
      slug: "completorium" as LiturgiaHorarumParsSlug,
      displayName: "Completorium",
      description: "noctu recitatur.",
      hour: new Date("21:00:00Z"),
      getLink: async () => "https://brewiarz.pl/dzis.php?link=k",
    },
  };
}
