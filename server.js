const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(express.json())
app.use(bodyParser.json())

const datesRoutes = require('./api/dates/date.routes')
const zmanimRoutes = require('./api/zmanim/zman.routes')
const omerRoutes = require('./api/haOmer/omer.routes')

app.use('/api/dates', datesRoutes)
app.use('/api/zmanim', zmanimRoutes)
app.use('/api/omer', omerRoutes)


app.use('/', (req, res) => {
    console.log("hey")
    res.json("hello world!!")
})

const port = 3030
app.listen(port, () =>
    console.log(`Server is ready at ${port}`)
)
 















// app.get('/converted-date', async (req, res) => {
//     const { d, m, y, ass } = req.query
//     console.log("🚀 ~ file: server.js:18 ~ app.get ~ req.query:", d, m, y, ass)

//     const url = 'http://www.shoresh.org.il/dates/go.aspx'
//     const params = { what: 'gth', d, m, y, res: 'txt', ass }

//     try {
//         const response = await axios.get(url, { params })
//         console.log("🚀 ~ file: server.js:25 ~ app.get ~ response:", response.data)
//         const responseData = response.data.trim()

//         const hebDateString = responseData.split('\n')[0]
//         const torahPortion = responseData.split('\n')[1]

//         const responseText = `${hebDateString} ${torahPortion}`

//         const responseDataObj = {
//             "actions": [{ "type": "SendMessage", "text": responseText }]
//         }
//         res.json(responseDataObj)
//     } catch (error) {
//         console.error(error)
//         res.status(500).send('An error occurred while fetching the converted date.')
//     }
// })
// ssh root@103.95.119.14
// bnkSDCKwr83hiorq0_j
