if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
const cors = require("cors")
const express = require('express')
const errorHandler = require("./middleware/errorHandler")
const router = require("./routers")
const app = express()
const port = 3004
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)
app.use(errorHandler)

app.listen(port, () => {
    console.log("Server is running on port : ", `http://localhost:${port}/`)
})