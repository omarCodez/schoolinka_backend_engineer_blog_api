import express, { Express, NextFunction, Request, Response } from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"
import http from "http"

const app: Express = express()

app.set("strict routing", true)

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
)

app.use(cookieParser())

app.use(morgan("tiny"))

app.disable("x-powered-by")

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({
      message: "Hello, Blog Api",
    })
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    })
  }
})

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Route does Not Exist",
  })
})

let port: number
port = process.env.NODE_ENV === "development" ? 8083 : 9999

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server Listening on port ${port}`)
})

server.on("error", (e: any) => {
  if (e.code === "EADDRINUSE") {
    port += 6
    console.error("Port already in use : retrying")
    setTimeout(() => {
      server.close()

      server.listen(port)
    }, 1000)
  }
})
