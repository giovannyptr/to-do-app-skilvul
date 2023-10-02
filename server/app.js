const express = require('express')
const app = express()
PORT = process.env.PORT
const routes = require('./routes/index')

app.use(require("cors")());

//bodyparser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(routes)


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})