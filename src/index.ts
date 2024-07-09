import express, { json, urlencoded } from "express"
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import moment from "moment-timezone"

import router from "./router/createRouter"
import mongoose from "mongoose"

const app = express()
const server = http.createServer(app)
const MONGO_URL =  process.env.MONGO_URL;

app.use(
  cors({
    credentials: true,
  })
)
app.use(json({ limit: "50mb" }))
app.use(
  urlencoded({
    extended: false,
  }),
)

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())


mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
mongoose.set('strictQuery', true);
mongoose.connection.on("error", (error: Error) => console.log(error))

server.listen(8081, () => {
  console.log("Server running on http://localhost:8081/")
})

app.use("/api/", router())

moment.tz.setDefault("Asia/Kolkata");