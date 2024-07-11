const cors = require("cors")
const express = require('express')
const router = require('./routers')
const app = express()
const port = 3001
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.listen(port, () => {
    console.log("Server is running on port : ", port)
})