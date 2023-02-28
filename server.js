const express = require('express')
const Hebcal = require('hebcal')
const moment = require('moment')

const app = express()
app.use(express.json())



app.post('/bot/dates/post', async (req, res) => {
    try {
        const hebDateString = req.body.parameters.find(p => p.name === 'תאריך עברי').value
        const hebDate = moment(hebDateString, 'DDMMYYYY').toDate()
        const hebDateStr = Hebcal.HDate(hebDate).toString('h')
        const responseText = `${hebDateStr}`
        const responseData = {
            "actions": [{ "type": "SendMessage", "text": responseText }]
        }
        res.json(responseData)
    } catch (error) {
        console.error(error)
        res.status(500).send('An error occurred while retrieving the Torah portion.')
    }
})


app.get('/bot/dates', async (req, res) => {
    try {
        const userInputDate = req.query.d
        console.log("🚀  ~ userInputDate:", userInputDate)
        const date = new Date(userInputDate)
        const hebDate = Hebcal.HDate(date)
        const torahPortion = hebDate.getSedra('he', true)

        const responseText = ` ${torahPortion} התאריך המקביל: ${hebDate.toString('h')}`
        const responseData = {
            "actions": [{ "type": "SendMessage", "text": responseText }]
        }
        res.json(responseData)
        console.log(responseData)
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