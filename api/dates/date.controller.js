const Hebcal = require("hebcal")
const moment = require('moment')



class DatesService {

    static __convertToHebDate(gDate) {
        const jsDate = new Date(gDate)
        const hDate = new Hebcal.HDate(jsDate)
        const hebDateStr = hDate.toString("h")
        return hebDateStr
    }

    static __calculateNextMonths(inputDate, numOfMonths) {
        const dateRegex = /^(\d{1,2})[\-./]?(\d{1,2})[\-./]?(\d{4})$/
        const match = inputDate.match(dateRegex)
        let date
        if (match) {
            const [_, day, month, year] = match
            date = new Date(`${year}-${month}-${day}`)
        } else {
            date = new HebrewCalendar.HDate(inputDate).greg()
        }
        const hebrewDate = HebrewCalendar.HDate(date)
        hebrewDate.setMonth(hebrewDate.getMonth() + numOfMonths)
        return hebrewDate.toString('h')
    }


    async convertToHebrewDate(req, res) {
        console.log('body', req.body)
        try {
            const parameters = req.body.parameters
            let hebDateString = parameters.find(p => p.name === 'תאריך עברי').value
            const hebDate = moment(hebDateString, 'DDMMYYYY').toDate()
            hebDateString = hebDateString.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3")
            const hebDateObj = new Hebcal.HDate(hebDate)
            const hebDateStr = hebDateObj.toString('h')
            const responseText = `:התאריך העברי של ${hebDateString} :הוא ${hebDateStr}.`

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

    async convertToGregorianDate(req, res) {
        console.log('body', req.body)
        try {
            const parameters = req.body.parameters
            const hebrewDateString = parameters.find(p => p.name === 'תאריך לועזי').value
            const hebDate = Hebcal.HDate(hebrewDateString)
            const gregDate = hebDate.greg()
            const gregDateString = moment(gregDate).format('DD/MM/YYYY')
            const responseText = `:התאריך הלועזי של ${hebrewDateString} :הוא ${gregDateString}.`
            const responseData = {
                "actions": [{ "type": "SendMessage", "text": responseText }]
            }
            res.json(responseData)
            console.log(responseData)
        } catch (error) {
            console.error(error)
            res.status(500).send('An error occurred while converting the Hebrew date to Gregorian date.')
        }
    }

    async getCurrentHebrewDate(req, res) {
        console.log('body', req.body)
        try {
            const hebDateString = req.body.parameters.find(p => p.name === 'תאריך עברי').value
            let responseText = ''

            if (hebDateString === '') {
                const gDate = new Date()
                const hebDate = DatesService.__convertToHebDate(gDate)
                responseText = `התאריך העברי היום הוא: ${hebDate}`
            }

            const responseData = {
                "actions": [{ "type": "SendMessage", "text": responseText }]
            }
            res.json(responseData)
            console.log(responseData)
        } catch (error) {
            console.error(error)
            res.status(500).send('An error occurred while retrieving the dates.')
        }
    }

    async getCurrentGregorianDate(req, res) {
        try {
            console.log('body', req.body)
            const gregorianDateString = req.body.parameters.find(p => p.name === 'תאריך לועזי').value
            const todayDate = new Date()
            const todayHebrewDate = Hebcal.HDate(todayDate)
            const responseText = !gregorianDateString ? moment(todayDate).format('DD/MM/YYYY') : todayHebrewDate.toString('h')
            const responseData = {
                "actions": [{ "type": "SendMessage", "text": `${responseText} התאריך הלועזי היום הוא:` }]
            }
            res.json(responseData)
            console.log(responseData)

        } catch (error) {
            console.error(error)
            res.status(500).send('An error occurred while retrieving the date.')
        }
    }


    async getBarMitzvahDate(req, res) {
        try {
            console.log(req.body)
            const dob = req.body.parameters.find(param => param.name === 'חשבון בר מצווה').value
            // Parse the date of birth using Moment.js and add 13 years to get the date of bar mitzvah
            const barMitzvahDate = moment(dob, 'DD/MM/YYYY').add(13, 'years').format('DD/MM/YYYY')
            const hebDate = DatesService.__convertToHebDate(barMitzvahDate)
            const responseData = {
                "actions": [{ "type": "SendMessage", "text": `The date of bar mitzvah is ${hebDate}` }]
            }
            console.log(`The date of bar mitzvah is ${barMitzvahDate}`)

            res.json(responseData)
        } catch (error) {
            console.error(error)
            res.status(500).send('An error occurred while calculating the Bar Mitzvah date.')
        }
    }



    //Get
    async convertDateToHeb(req, res) {
        try {
            const userInputDate = req.query.d
            const date = new Date(userInputDate)
            let responseText = ""
            if (isNaN(date)) {
                // Input is not a valid date, assume it's a Hebrew date
                const hebDate = new Hebcal.HDate(userInputDate)
                const torahPortion = hebDate.getSedra('he', true)
                const hebDateString = hebDate.toString('h')

                const gregDate = hebDate.greg()
                const gregDateString = moment(gregDate).format('DD/MM/YYYY')

                responseText = `${torahPortion} התאריך המקביל של ${gregDateString} הוא ${gregDateString}.`
            } else {
                // Input is a valid date, assume it's a Gregorian date
                const gregDateString = moment(date).format('DD/MM/YYYY')
                const hebDate = new Hebcal.HDate(date)
                const torahPortion = hebDate.getSedra('he', true)
                const hebDateString = hebDate.toString('h')

                responseText = `${torahPortion} התאריך המקביל של ${gregDateString} הוא ${hebDateString}.`
            }

            const responseData = {
                "actions": [{ "type": "SendMessage", "text": responseText }]
            }
            res.json(responseData)
        } catch (error) {
            console.error(error)
            res.status(500).send('An error occurred while converting the date.')
        }
    }

    async getGregorianDateToday(req, res) {
        try {
            const gDate = new Date()
            const responseText = `התאריך לועזי היום הוא: ${moment(gDate).format('DD/MM/YYYY')}`
            const responseData = {
                "actions": [{ "type": "SendMessage", "text": responseText }]
            }
            res.json(responseData)
        } catch (error) {
            console.error(error)
            res.status(500).send('An error occurred while retrieving the date.')
        }
    }

    async getHebrewDateToday(req, res) {
        try {
            const hebDate = DatesService.__convertToHebDate(new Date())
            const responseText = `התאריך העברי היום הוא: ${hebDate}`
            const responseData = {
                "actions": [{ "type": "SendMessage", "text": responseText }]
            }
            res.json(responseData)
        } catch (error) {
            console.error(error)
            res.status(500).send('An error occurred while retrieving the date.')
        }
    }
}

const jewishService = new DatesService()

module.exports = {
    jewishService,
}
