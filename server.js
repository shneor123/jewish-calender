const express = require('express')
const bodyParser = require('body-parser')


const app = express()
app.use(express.json())
app.use(bodyParser.json())

const datesRoutes = require('./api/dates/date.routes')
const zmanimRoutes = require('./api/zmanim/zman.routes')

app.use('/api/dates', datesRoutes)

app.use('/api/zmanim', zmanimRoutes)
app.use('/api/zmanim', (req, res) => {
res.send("hello world!")
})

const port = 3030
app.listen(port, () =>
    console.log(`Server is ready at ${port}`)
)