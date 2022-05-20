import * as express from "express"
import { interfaces, controller, httpGet, request, BaseHttpController } from "inversify-express-utils"
import { inject } from "inversify"
import { authOr403 } from "@/auth"
import { UserConfigRepository } from "@/domain"

@controller("/me", authOr403())
export class MeController extends BaseHttpController implements interfaces.Controller {

    constructor(
        @inject(UserConfigRepository)
        private userConfigRepo: UserConfigRepository
    ) {
        super()
    }

    @httpGet("/")
    private index(@request() req: express.Request) {
        const user = req.oidc.user!
        const enrolledInBeta = this.userConfigRepo.get(user.email!) !== null
        const profile = {
            ...user,
            enrolledInBeta,
        }
        return this.ok(profile)
    }

    @httpGet("/horas", authOr403())
    private profile(@request() req: express.Request) {
        return this.ok({ horas: [] })
    }
}