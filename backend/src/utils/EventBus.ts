export type EventBusListener<T> = (evt: T) => Promise<void> | void
export type EventKey<T> = Newable<T> | Abstract<T>

export class EventBus {
    private listeners: Map<EventKey<any>, Set<EventBusListener<any>>> = new Map()

    public send<T>(key: EventKey<T>, evt: T) {
        this.notifyListeners(key, evt).catch(console.error)
    }

    public subscribe<T>(key: EventKey<T>, listener: EventBusListener<T>): { unsubscribe(): void } {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, new Set())
        }
        this.listeners.get(key)!.add(listener)
        return {
            unsubscribe: () => {
                this.listeners.get(key)?.delete(listener)
            }
        }
    }

    private async notifyListeners<T>(key: EventKey<T>, evt: T) {
        const listenersOfThisEvt = this.listeners.get(key) || []
        const results = await Promise.allSettled(
            [...listenersOfThisEvt.values()].map(async (listener) => listener(evt))
        )
        const failureReasons = results
            .filter(result => result.status === "rejected")
            .map(result => (result as PromiseRejectedResult).reason)
        if (failureReasons.length > 0) {
            throw new Error(
                `Failed (n=${failureReasons.length}) event bus listener callbacks. ` +
                `Reasons: ${failureReasons.map(reason => `${reason}`).join("; ")}`)
        }
    }
}

type Newable<T> = new (...args: never[]) => T
interface Abstract<T> {
    prototype: T
}