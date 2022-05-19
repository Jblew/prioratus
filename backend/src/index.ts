import express from "express"
import { getAuthMiddleware } from "@/auth"
import { getRoutes } from "./router"
import morgan from "morgan"
import { PrismaClient } from '@prisma/client'
import { loadUserConfigs } from "./userconfigs"

const prisma = new PrismaClient()
const userConfigs = loadUserConfigs()
console.log("User configs:", JSON.stringify(userConfigs, undefined, 2))

async function run() {
  const app = express()
  const port = process.env.PORT || 3000
  const routeBase = process.env.ROUTE_BASE || "/"

  await prisma.notification.create({
    data: {
      content: "Notification at " + new Date().toISOString()
    }
  })
  const notificationCount = await prisma.notification.count()
  console.log(`Database contains ${notificationCount} notification`)

  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  )
  app.use(routeBase, getAuthMiddleware())
  app.use(routeBase, getRoutes({ userConfigs }))

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

run().catch((err) => {
  console.error("Error in main loop, exitting", err)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
