const express = require('express')
const bodyParser = require('body-parser')


const app = express()
app.use(express.json())
app.use(bodyParser.json())

const datesRoutes = require('./api/dates/date.routes')
const zmanimRoutes = require('./api/zmanim/zman.routes')

app.use('/api/dates', datesRoutes)
app.use('/api/zmanim', zmanimRoutes)



app.use('/', (req, res) => {
    console.log("hey")
    const responseData = {
        "actions": [
            { "type": "SetParameter", "name": "branch", "value": "הפיח" }
        ]
    }
    res.send(responseData)
})

const port = 3030
app.listen(port, () =>
    console.log(`Server is ready at ${port}`)
)

