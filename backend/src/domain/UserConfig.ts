import { Named } from "@/utils"

export interface UserConfig {
    email: string
    timeZone: string
    hours: Record<string, TimeStr>
}

export type TimeStr = Named<string, "TimeStr">

export abstract class UserConfigRepository {
    abstract get(email: string): Promise<UserConfig | null>
}