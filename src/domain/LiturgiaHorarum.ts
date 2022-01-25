export interface LiturgiaHorarum {
    getPartes(): LiturgiaHorarumPars[];
}

export interface LiturgiaHorarumProvider {
  getLiturgiaHorarum(): LiturgiaHorarum;
}

export interface LiturgiaHorarumPars {
    slug: string;
    displayName: string;
    description: string;
    hour: Date;
    getLink(): Promise<string>
}

