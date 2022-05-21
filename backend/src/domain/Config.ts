import { DateTime } from 'luxon'

export abstract class Config {
    abstract horas: Record<string, HoraConfig>
}

export interface HoraConfig {
    key: string,
    name: string,
    shortName: string,
    defaultHour: string,
    link: Record<LangCode, { href: (dt: DateTime) => string }>
}

export type LangCode = string
