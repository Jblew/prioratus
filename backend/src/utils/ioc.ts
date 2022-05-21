export abstract class AutoStartService {
    abstract start(): Promise<void>
}