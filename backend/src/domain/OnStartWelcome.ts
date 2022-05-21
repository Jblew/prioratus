import { AutoStartService } from "@/utils"
import { provide } from "inversify-binding-decorators"

@provide(AutoStartService)
export class OnStartWelcome implements AutoStartService {
    async start() {
        console.log('Welcome!')
    }
}