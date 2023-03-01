const express = require('express')
const JewishDate = require('jewish-date')
const kosherZmanim = require('kosher-zmanim')
const bodyParser = require('body-parser')

const app = express()
app.use(express.json())
app.use(bodyParser.json())

const datesRoutes = require('./api/dates/date.routes')
const zmanimRoutes = require('./api/zmanim/zman.routes')

app.use('/api/dates', datesRoutes)
app.use('/api/zmanim', zmanimRoutes)



const port = 3030
app.listen(port, () =>
    console.log(`Server is ready at ${port}`)
)



// http://localhost:3030/api/dates?what=Dates&d=09/09/1998