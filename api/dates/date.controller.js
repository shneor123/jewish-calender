const Hebcal = require("hebcal")
const moment = require('moment')

async function getConvertHebrow(req, res) {
    try {
        const userInputDate = req.query.d
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

async function convertHebreow(req, res) {
    try {
        const parameters = req.body.parameters
        const hebDateString = parameters.find(p => p.name === 'תאריך עברי').value
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

async function heDateTodey(req, res) {
    try {
        const parameters = req.body.parameters
        const hebDateString = parameters.find(p => p.name === 'תאריך עברי').value
        let responseText = ''

        if (hebDateString === '') {
            const gDate = new Date()
            const hebDate = __convertToHebDate(gDate)
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
}

async function gDateTodey(req, res) {
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
}

async function convertGregotrian(req, res) {
    try {
        const parameters = req.body.parameters
        const hebrewDateString = parameters.find(p => p.name === 'תאריך לועזי').value
        const hebDate = Hebcal.HDate(hebrewDateString)
        const gregDate = hebDate.greg()
        const gregDateString = moment(gregDate).format('DD/MM/YYYY')
        const responseText = `The Gregorian date corresponding to the Hebrew date ${hebrewDateString} is ${gregDateString}.`
        const responseData = {
            "actions": [{ "type": "SendMessage", "text": responseText }]
        }
        res.json(responseData)
    } catch (error) {
        console.error(error)
        res.status(500).send('An error occurred while converting the Hebrew date to Gregorian date.')
    }
}




function __convertToHebDate(gDate) {
    const jsDate = new Date(gDate)
    const hDate = new Hebcal.HDate(jsDate)
    const hebDateStr = hDate.toString('h')
    return hebDateStr
}

module.exports = {
    getConvertHebrow,
    convertHebreow,
    heDateTodey,
    gDateTodey,
    convertGregotrian,
}