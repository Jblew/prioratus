export interface UserConfig {
    email: string
    timeZone: string
    hours: unknown
}

export abstract class UserConfigRepository {
    abstract get(email: string): Promise<UserConfig | null>
}