const Hebcal = require("hebcal")
const moment = require('moment')


async function convertHebreow(req, res) {
    try {
        const hebDateString = req.body.parameters.find(p => p.name === 'תאריך עברי').value
        const hebDate = moment(hebDateString, 'DDMMYYYY').toDate()
        const hebDateObj = new Hebcal.HDate(hebDate)
        const hebDateStr = hebDateObj.toString('h')
        const responseText = `${hebDateStr}`
        const responseData = {
            "actions": [{ "type": "SendMessage", "text": responseText }]
        }
        res.json(responseData)
    } catch (error) {
        console.error(error)
        res.status(500).send('An error occurred while retrieving the Torah portion.')
    }
}

async function convertHebreowGet(req, res) {
    try {
        const userInputDate = req.query.d
        console.log("🚀  ~ userInputDate:", userInputDate)
        const date = new Date(userInputDate)
        const hebDate = new Hebcal.HDate(date)
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
}


module.exports = {
    convertHebreow,
    convertHebreowGet,
}