export interface UserProfile {
    name: string
    nickname: string
    picture?: string
    email: string
    [k: string]: unknown
}

export type AuthStateName = "loading" | "error" | "loggedIn" | "loggedOut"
export interface AuthState {
    state: AuthStateName
    profile?: UserProfile
}