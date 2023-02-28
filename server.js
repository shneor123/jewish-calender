const express = require('express')
const Hebcal = require('hebcal')
const moment = require('moment')


const app = express()
app.use(express.json())

const datesRoutes = require('./api/dates/date.routes')
app.use('/bot/dates', datesRoutes)


// app.post('/bot/dates/date', async (req, res) => {
//     try {
//         const hebDateString = req.body.parameters.find(p => p.name === 'תאריך עברי').value
//         const hebDate = moment(hebDateString, 'DDMMYYYY').toDate()
//         const hebDateObj = new Hebcal.HDate(hebDate)
//         const hebDateStr = hebDateObj.toString('h')
//         const responseText = `${hebDateStr}`
//         const responseData = {
//             "actions": [{ "type": "SendMessage", "text": responseText }]
//         }
//         res.json(responseData)
//     } catch (error) {
//         console.error(error)
//         res.status(500).send('An error occurred while retrieving the Torah portion.')
//     }
// })

// app.get('/bot/dates', async (req, res) => {
//     try {
//         const userInputDate = req.query.d
//         console.log("🚀  ~ userInputDate:", userInputDate)
//         const date = new Date(userInputDate)
//         const hebDate = new Hebcal.HDate(date)
//         const torahPortion = hebDate.getSedra('he', true)

//         const responseText = ` ${torahPortion} התאריך המקביל: ${hebDate.toString('h')}`
//         const responseData = {
//             "actions": [{ "type": "SendMessage", "text": responseText }]
//         }
//         res.json(responseData)
//         console.log(responseData)
//     } catch (error) {
//         console.error(error)
//         res.status(500).send('An error occurred while retrieving the Torah portion.')
//     }
// })

function convertToHebDate(gDate) {
    const jsDate = new Date(gDate)
    const hDate = new Hebcal.HDate(jsDate)
    const hebDateStr = hDate.toString('h')
    return hebDateStr
}

app.post('/bot/dates/zmanim/he', async (req, res) => {
    try {
        const parameters = req.body.parameters
        const hebDateString = parameters.find(p => p.name === 'תאריך עברי').value
        let responseText = ''

        if (hebDateString === '') {
            const gDate = new Date()
            const hebDate = convertToHebDate(gDate)
            responseText = `התאריך העברי היום הוא: ${hebDate}`
        }

        const responseData = {
            "actions": [{ "type": "SendMessage", "text": responseText }]
        }
        res.json(responseData)
    } catch (error) {
        console.error(error)
        res.status(500).send('An error occurred while retrieving the dates.')
    }
})

app.post('/bot/dates/zmanim', async (req, res) => {
    try {
        const gregorianDateString = req.body.parameters.find(p => p.name === 'תאריך לועזי').value
        const todayDate = new Date()
        const todayHebrewDate = Hebcal.HDate(todayDate)
        const responseText = !gregorianDateString ? moment(todayDate).format('MM/DD/YYYY') : todayHebrewDate.toString('h')
        const responseData = {
            "actions": [{ "type": "SendMessage", "text": responseText }]
        }
        res.json(responseData)
    } catch (error) {
        console.error(error)
        res.status(500).send('An error occurred while retrieving the date.')
    }
})

const port = 3030
app.listen(port, () =>
    console.log(`Server is ready at ${port}`)
)




// http://localhost:3030/bot/dates?what=Dates&d=09/09/1998