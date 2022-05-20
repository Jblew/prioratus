import { UserConfig, UserConfigRepository } from "./domain"
import * as yaml from "yaml"
import * as fs from "fs"

export class UserConfigRepositoryYAML extends UserConfigRepository {
    private userConfigs: UserConfig[]

    constructor(path: string) {
        super()
        this.userConfigs = this.load(path)
    }

    get(email: string): Promise<UserConfig | null> {
        return Promise.resolve(this.userConfigs.find(uc => uc.email === email) || null)
    }

    private load(path: string): UserConfig[] {
        const contents = fs.readFileSync(path, "utf-8")
        const documents = yaml.parseAllDocuments(contents)
        return documents.map(doc => doc.toJS())
    }
}