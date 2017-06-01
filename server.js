let express = require("express")
let path = require("path")

const app = express()
let bodyParser = require("body-parser")

const PORT = 5000

app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, "./client/build"))) //why dont i need this?
app.use(express.static(path.join(__dirname, "./node_modules")))

require("./server/config/mongoose.js")
require("./server/config/routes.js")(app)

app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`)
})