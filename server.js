const express = require('express')
const Hebcal = require('hebcal')

const app = express()
app.use(express.json())

app.get('/bot/dates', async (req, res) => {
    try {
        const userInputDate = req.query.d
        const date = new Date(userInputDate)
        const hebDate = Hebcal.HDate(date)
        const torahPortion = hebDate.getSedra('he', true)

        const responseText = `התאריך המקביל: ${hebDate.toString('h')}  ${torahPortion}`
        const responseData = {
            "actions": [{ "type": "SendMessage", "text": responseText }]
        }
        res.json(responseData)
    } catch (error) {
        console.error(error)
        res.status(500).send('An error occurred while retrieving the Torah portion.')
    }
})


const port = 3030
app.listen(port, () =>
    console.log(`Server is ready at ${port}`)
)


















// http://localhost:3030/bot/dates?what=Dates&d=09/09/1998


// const express = require('express')
// const cors = require('cors')
// const path = require('path')
// const cookieParser = require('cookie-parser')
// const Hebcal = require('hebcal')
// const http = require('http')

// const app = express()
// app.use(express.json())

// // Config the Express App
// app.use(express.static('public'))
// app.use(cookieParser())
// app.use(express.json())
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.resolve(__dirname, 'public')))
// } else {
//     const corsOptions = {
//         origin: [
//             'http://127.0.0.1:8080',
//             'http://localhost:8080',
//             'http://127.0.0.1:3000',
//             'http://localhost:3000'
//         ],
//         credentials: true
//     }
//     app.use(cors(corsOptions))
// }

// // const botRoutes = require('./api/bot/bot.routes')
// // app.use('/api/bot', botRoutes)

// app.get('/bot/dates', async (req, res) => {
//     try {
//         const userInputDate = req.query.d
//         const date = new Date(userInputDate)
//         const hebDate = Hebcal.HDate(date)
//         const torahPortion = hebDate.getSedra('he', true)

//         const responseText = `התאריך המקביל: ${hebDate.toString('h')}  ${torahPortion}`
//         const responseData = {
//             "actions": [{ "type": "SendMessage", "text": responseText }]
//         }
//         res.json(responseData)
//     } catch (error) {
//         console.error(error)
//         res.status(500).send('An error occurred while retrieving the Torah portion.')
//     }
// })

// const port = 3030
// app.listen(port, () =>
//     console.log(`Server is ready at ${port}`)
// )