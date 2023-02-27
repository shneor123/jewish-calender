const express = require('express')
const cookieParser = require('cookie-parser')
const Hebcal = require('hebcal')

const app = express()

app.use(cookieParser())
app.use(express.json())

const convertToJewishDate = (gregorianDate) => {
    const regex = /^(\d{1,2})[-.,/]?(\d{1,2})[-.,/]?(\d{4})$/
    const match = gregorianDate.match(regex)
    if (match) {
        const [, month, day, year] = match
        const hebrewDate = new Hebcal.HDate(new Date(year, month - 1, day || 1))
        return hebrewDate.toString('h')
    } else {
        throw new Error('Invalid date format. Please enter a date in the format MM/DD/YYYY, MM-DD-YYYY, or MM.DD.YYYY.')
    }
}


app.get('/bot/dates', (req, res) => {
    var d = req.query.d
    var dates = req.query.dates
    const jewishDate = convertToJewishDate(d);
    console.log('d', d)
    const scoreData = { "actions": [{ "type": "SendMessage", "text": jewishDate + ' -התאריך המקביל' }] }
    res.json(scoreData)
})

const port = 3030
app.listen(port, () =>
    console.log(`Server is ready at ${port}`)
)


// const express = require('express')
// const cors = require('cors')
// const path = require('path')
// const cookieParser = require('cookie-parser')
// const Hebcal = require('hebcal')

// const app = express()
// const http = require('http').createServer(app)

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

// const botRoutes = require('./api/bot/bot.routes')
// app.use('/api/bot', botRoutes)

// const convertToJewishDate = (gregorianDate) => {
//     const regex = /^(\d{1,2})[-.,/]?(\d{1,2})[-.,/]?(\d{4})$/
//     const match = gregorianDate.match(regex)
//     if (match) {
//         const [, month, day, year] = match
//         const hebrewDate = new Hebcal.HDate(new Date(year, month - 1, day || 1))
//         return hebrewDate.toString('h')
//     } else {
//         throw new Error('Invalid date format. Please enter a date in the format MM/DD/YYYY, MM-DD-YYYY, or MM.DD.YYYY.')
//     }
// }


// app.get('/bot/dates', (req, res) => {
//     var d = req.query.d
//     var dates = req.query.dates
//     const jewishDate = convertToJewishDate(d);
//     console.log('d', d)
//     const scoreData = { "actions": [{ "type": "SendMessage", "text": jewishDate + ' -התאריך המקביל' }] }
//     res.json(scoreData)
// })


// app.get('/**', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
// })

// const port = 3030
// app.listen(port, () =>
//     console.log(`Server is ready at ${port}`)
// )