import { inject } from "inversify"
import { provide } from "inversify-binding-decorators"
import { DateTime } from "luxon"
import { Config } from "./Config"
import { UserConfig, UserConfigRepository } from "./UserConfig"

@provide(BreviaryDayFactory)
export class BreviaryDayFactory {
    constructor(
        @inject(UserConfigRepository)
        private userConfigsRepo: UserConfigRepository,
        @inject(Config)
        private config: Config
    ) { }

    getForUser(email: string, date: DateTime): BreviaryDay {
        return new BreviaryDay(email, date, this.userConfigsRepo, this.config)
    }
}

export class BreviaryDay {
    constructor(
        private email: string,
        private date: DateTime,
        private userConfigsRepo: UserConfigRepository,
        private config: Config
    ) { }

    async getHoraViews(): Promise<UserHoraView[]> {
        const userConfig = await this.userConfigsRepo.get(this.email)
        if (!userConfig) {
            throw new Error(`Missing UserConfig for ${this.email}`)
        }
        return Object.keys(userConfig.hours)
            .map(horaKey => this.mapUserConfigHora(horaKey, userConfig.hours[horaKey], userConfig))
    }

    private mapUserConfigHora(key: string, userTime: string, userConfig: UserConfig): UserHoraView {
        const zone = userConfig.timeZone
        const horaConf = this.config.horas[key]!
        const date = this.date.setZone(zone).startOf("day")
        const time = date.plus(DateTime.fromISO(userTime, { zone }))
        return {
            name: horaConf.shortName,
            time,
            link: { href: horaConf.link.pl.href(time) },
            tasks: []
        }
    }
}

export interface UserHoraView {
    name: string
    time: DateTime
    link: { href: string }
    tasks: []
}
