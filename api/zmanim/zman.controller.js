const HebrewCalendar = require("hebcal")


class ZmanimService {
    static __calculateNextMonths(inputDate, numOfMonths) {
        const date = new Date(inputDate);
        const hebrewDate = HebrewCalendar.HDate(date);
        hebrewDate.setMonth(hebrewDate.getMonth() + numOfMonths);
        return hebrewDate.toString('h');
    }
}

async function next11Month(req, res) {
    try {
        const inputDate = req.body.parameters.find(p => p.name === 'תאריך פטירה').value
        const next11MonthsDate = ZmanimService.__calculateNextMonths(inputDate, 11)
        const responseData = {
            "actions": [
                { "type": "SendMessage", "text": `תאריך העברי לאחר 11 חודשים הוא: ${next11MonthsDate}` }
            ]
        }
        res.json(responseData)
    } catch (error) {
        console.error(error)
        res.status(500).send('An error occurred while retrieving the date.')
    }
}

async function next12Month(req, res) {
    try {
        const inputDate = req.body.parameters.find(p => p.name === 'תאריך פטירה').value
        const next12MonthsDate = ZmanimService.__calculateNextMonths(inputDate, 12)
        const responseData = {
            "actions": [
                { "type": "SendMessage", "text": `תאריך העברי לאחר 12 חודשים הוא: ${next12MonthsDate}` }
            ]
        }
        res.json(responseData)
    } catch (error) {
        console.error(error)
        res.status(500).send('An error occurred while retrieving the date.')
    }
}

async function getNext11Month(req, res) {
    try {
        const inputDate = req.query.date
        const next11MonthsDate = ZmanimService.__calculateNextMonths(inputDate, 11)
        const responseData = {
            "actions": [
                { "type": "SendMessage", "text": `תאריך העברי לאחר 11 חודשים הוא: ${next11MonthsDate}` }
            ]
        }
        res.json(responseData)
    } catch (error) {
        console.error(error)
        res.status(500).send('An error occurred while retrieving the date.')
    }
}

async function getNext12Month(req, res) {
    try {
        const inputDate = req.query.date
        const next11MonthsDate = ZmanimService.__calculateNextMonths(inputDate, 12)
        const responseData = {
            "actions": [
                { "type": "SendMessage", "text": `תאריך העברי לאחר 12 חודשים הוא: ${next11MonthsDate}` }
            ]
        }
        res.json(responseData)
    } catch (error) {
        console.error(error)
        res.status(500).send('An error occurred while retrieving the date.')
    }
}


const jewishService = new ZmanimService()

module.exports = {
    next11Month,
    next12Month,
    getNext11Month,
    getNext12Month
}
