import "reflect-metadata"
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import { staticConfig } from "./config-static"
import { Config, UserConfigRepository } from "./domain"
import "./controllers"
import "./domain"
import { UserConfigRepositoryYAML } from "./UserConfigRepositoryYAML"
import { envMust, EventBus, AutoStartService } from "./utils"
import { PrismaClient } from '@prisma/client'
import morgan from "morgan"
import { getAuthMiddleware } from "./auth"
import { buildProviderModule } from "inversify-binding-decorators"

const prisma = new PrismaClient()
const container = new Container()
container.bind<Config>(Config).toConstantValue(staticConfig)
container.bind<PrismaClient>(PrismaClient).toConstantValue(prisma)
container.bind(EventBus).toSelf().inSingletonScope()
container.bind<UserConfigRepository>(UserConfigRepository)
    .toConstantValue(new UserConfigRepositoryYAML(envMust("USER_CONFIGS_PATH")))
container.load(buildProviderModule());
//
(async () => {
    await Promise.all(
        container.getAll(AutoStartService).map(service => service.start())
    ).catch(err => Promise.reject(
        new Error(`Some of the AutoStartService promises failed to resolve: ${err}`))
    )

    const rootPath = process.env.ROUTE_BASE || "/"
    const server = new InversifyExpressServer(
        container,
        null,
        { rootPath }
    )
    server.setConfig((app) => {
        app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))
        app.use(rootPath, getAuthMiddleware())
    })

    const app = server.build()
    const port = process.env.PORT || 3000
    app.listen(port, () => console.log(`Listening on ${port}`))
})().catch((err) => {
    console.error("Error in main loop, exitting", err)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})