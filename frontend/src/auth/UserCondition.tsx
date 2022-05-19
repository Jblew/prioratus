import { UserProfile } from "./types"
import {
    getAuthState,
    onAuthStateChanged,
} from "./service"
import { useEffect, useState } from "react"

export function UserCondition(
    { condition, met, unmet, error }:
        {
            condition: (profile: UserProfile) => boolean,
            met: React.ReactNode,
            unmet: React.ReactNode,
            error: React.ReactNode,
        }
) {
    const [authState, setAuthState] = useState(getAuthState())
    useEffect(() => {
        const { unsubscribe } = onAuthStateChanged((authState) =>
            setAuthState(authState)
        )
        return function cleanup() {
            unsubscribe()
        }
    }, [])

    if (authState.state == "loggedIn") {
        let conditionResult = false
        try {
            conditionResult = condition(authState.profile!)
        } catch (err) {
            console.warn("UserCondition: error while evaluating condition: ", err)
            return <>{error}</>
        }
        if (conditionResult) {
            return <>{met}</>
        }
        return <>{unmet}</>
    }
    console.warn("UserCondition: cannot evaluate condition, user not logged in")
    return <>{error}</>
}