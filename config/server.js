"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { databaseConnection } from "./database.js"
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import companyRoutes from "../src/company/company.routes.js"
import apiLimiter from "../src/middleware/rate-limit.js"

const middlewares = (app) => {
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  )
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", `http://localhost:${process.env.PORT}`],
          connectSrc: ["'self'", `http://localhost:${process.env.PORT}`],
          imgSrc: ["'self'", "data:"],
          styleSrc: ["'self'", "'unsafe-inline'"],
        },
      },
    })
  )
  app.use(morgan("dev"))
  app.use(apiLimiter)
}

const routes = (app) => {
  app.use("/coperex-enterprise/v1/auth", authRoutes)
  app.use("/coperex-enterprise/v1/user", userRoutes)
  app.use("/coperex-enterprise/v1/company", companyRoutes)
}

const connectDB = async () => {
  try {
    await databaseConnection()
  } catch (err) {
    console.log(`Server  | Database connection failed: ${err}`)
    process.exit(1)
  }
}

export const initServer = () => {
  const app = express()
  try {
    middlewares(app)
    connectDB()
    routes(app)
    app.listen(process.env.PORT)
    console.log(`Server  | Running on port ${process.env.PORT}`)
  } catch (err) {
    console.log(`Server  | Init failed: ${err}`)
  }
}
