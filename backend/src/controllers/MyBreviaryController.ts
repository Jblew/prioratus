import * as express from "express"
import { interfaces, controller, httpGet, request, BaseHttpController, requestParam } from "inversify-express-utils"
import { inject } from "inversify"
import { authOr403 } from "@/auth"
import { BreviaryDayFactory } from "@/domain"
import { DateTime } from "luxon"

@controller("/my/breviary", authOr403())
export class MyBreviaryController extends BaseHttpController implements interfaces.Controller {

    constructor(
        @inject(BreviaryDayFactory)
        private breviaryDayFactory: BreviaryDayFactory
    ) {
        super()
    }

    @httpGet("/:date")
    private async date(@requestParam("date") dateStr: string, @request() req: express.Request) {
        const user = req.oidc.user!
        const date = DateTime.fromISO(dateStr)
        const breviaryDay = this.breviaryDayFactory.getForUser(user.email, date)
        const views = await breviaryDay.getHoraViews()
        return this.ok(views)
    }
}