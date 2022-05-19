import * as yaml from "yaml"
import * as fs from "fs"
import { envMust } from "./utils"
export interface UserConfig {
    user: string
    timeZone: string
    hours: unknown
}
export function loadUserConfigs(): UserConfig[] {
    const userConfigsPath = envMust("USER_CONFIGS_PATH")
    const contents = fs.readFileSync(userConfigsPath, "utf-8")
    const documents = yaml.parseAllDocuments(contents)
    return documents.map(doc => doc.toJS())
}
