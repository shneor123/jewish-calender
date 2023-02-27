// const express = require('express')
// const cors = require('cors')
// const path = require('path')
// const cookieParser = require('cookie-parser')
// const Hebcal = require('hebcal')
// const axios = require('axios')

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

// const getTorahPortion = async (jewishData) => {
//     const currentDate = new Date();
//     const currentYear = jewishData ? currentDate.getFullYear() : ''
//     const currentMonth = jewishData ? currentDate.getMonth() + 1 : ''
//     const currentDay = jewishData ? currentDate.getDate() : ''
//     const apiSefria = `https://www.sefaria.org/api/calendars?timezone=Asia/Jerusalem&forward=20&lang=he${jewishData ? `&gy=${currentYear}&gm=${currentMonth}&gd=${currentDay}` : ''}`
//     try {
//         const { data: sefariaData } = await axios.get(apiSefria)
//         const torahPortionItem = sefariaData.calendar_items.find((item) => item.category === 'Tanakh')
//         if (torahPortionItem && torahPortionItem.displayValue) {
//             const { he } = torahPortionItem.displayValue
//             const torahPortionStrHe = `פרשת השבוע: ${he}`
//             return torahPortionStrHe
//         } else {
//             return 'Unable to retrieve Torah portion for this week.'
//         }
//     } catch (error) {
//         console.error(error)
//         return 'Error: Unable to retrieve Torah portion.'
//     }
// }

// app.get('/bot/dates', async (req, res) => {
//     try {
//         const d = req.query.d
//         const jewishDate = convertToJewishDate(d)
//         const jewishParash = await getTorahPortion(true) // assuming you want the Torah portion in Hebrew
//         const scoreData = {
//             "actions": [{ "type": "SendMessage", "text": `התאריך המקביל:-${jewishDate}  ${jewishParash}` }]
//         }
//         res.json(scoreData)
//     } catch (error) {
//         console.error(error)
//         res.status(500).send('An error occurred while retrieving the Torah portion.')
//     }
// })

// const port = 3030
// app.listen(port, () =>
//     console.log(`Server is ready at ${port}`)
// )


const express = require('express')
const Hebcal = require('hebcal')
const axios = require('axios')

const app = express()
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

const getTorahPortion = async (jewishData) => {
    const currentDate = new Date();
    const currentYear = jewishData ? currentDate.getFullYear() : ''
    const currentMonth = jewishData ? currentDate.getMonth() + 1 : ''
    const currentDay = jewishData ? currentDate.getDate() : ''
    const apiSefria = `https://www.sefaria.org/api/calendars?timezone=Asia/Jerusalem&forward=20&lang=he${jewishData ? `&gy=${currentYear}&gm=${currentMonth}&gd=${currentDay}` : ''}`
    try {
        const { data: sefariaData } = await axios.get(apiSefria)
        const torahPortionItem = sefariaData.calendar_items.find((item) => item.category === 'Tanakh')
        if (torahPortionItem && torahPortionItem.displayValue) {
            const { he } = torahPortionItem.displayValue
            const torahPortionStrHe = `פרשת השבוע: ${he}`
            return torahPortionStrHe
        } else {
            return 'Unable to retrieve Torah portion for this week.'
        }
    } catch (error) {
        console.error(error)
        return 'Error: Unable to retrieve Torah portion.'
    }
}


app.get('/bot/dates', async (req, res) => {
    try {
        const d = req.query.d
        const jewishDate = convertToJewishDate(d)
        const jewishParash = await getTorahPortion(true) // assuming you want the Torah portion in Hebrew
        const scoreData = {
            "actions": [{ "type": "SendMessage", "text": `התאריך המקביל:-${jewishDate}  ${jewishParash}` }]
        }
        res.json(scoreData)
    } catch (error) {
        console.error(error)
        res.status(500).send('An error occurred while retrieving the Torah portion.')
    }
})


const port = 3030
app.listen(port, () =>
    console.log(`Server is ready at ${port}`)
)

