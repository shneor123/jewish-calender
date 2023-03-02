const HebrewCalendar = require("hebcal")
const axios = require('axios')


class ZmanimService {

    static __calculateNextMonths(inputDate, numOfMonths) {
        let date
        if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(inputDate)) {
            date = new Date(inputDate)
            console.log("🚀 ~ date:", date)
        } else {
            // date = new Date(inputDate)
            date = new HebrewCalendar.HDate(inputDate).greg()
            console.log("🚀 ~ else date:", date)

        }
        const hebrewDate = HebrewCalendar.HDate(date)
        hebrewDate.setMonth(hebrewDate.getMonth() + numOfMonths)
        return hebrewDate.toString('h')
    }

    async next11Month(req, res) {
        try {
            const inputDate = req.body.parameters.find(p => p.name === 'תאריך פטירה').value
            const next11MonthsDate = ZmanimService.__calculateNextMonths(inputDate, 11)
            const responseData = {
                "actions": [
                    { "type": "SendMessage", "text": `תאריך העברי לאחר 11 חודשים הוא: ${next11MonthsDate} ` }
                ]
            }
            res.json(responseData)
        } catch (error) {
            console.error(error)
            res.status(500).send('An error occurred while retrieving the date.')
        }
    }

    //Post
    async next12Month(req, res) {
        try {
            const inputDate = req.body.parameters.find(p => p.name === 'תאריך פטירה').value
            const next12MonthsDate = ZmanimService.__calculateNextMonths(inputDate, 12)
            const responseData = {
                "actions": [
                    { "type": "SendMessage", "text": `תאריך העברי לאחר 12 חודשים הוא: ${next12MonthsDate} ` }
                ]
            }
            res.json(responseData)
        } catch (error) {
            console.error(error)
            res.status(500).send('An error occurred while retrieving the date.')
        }
    }

    //Get
    async getNext11Month(req, res) {
        try {
            const inputDate = req.query.d
            const next11MonthsDate = ZmanimService.__calculateNextMonths(inputDate, 11)
            const responseData = {
                "actions": [
                    { "type": "SendMessage", "text": `תאריך העברי לאחר 11 חודשים הוא: ${next11MonthsDate} ` }
                ]
            }
            res.json(responseData)
        } catch (error) {
            console.error(error)
            res.status(500).send('An error occurred while retrieving the date.')
        }
    }
    //Get
    async getNext12Month(req, res) {
        try {
            const inputDate = req.query.d
            const next11MonthsDate = ZmanimService.__calculateNextMonths(inputDate, 12)
            const responseData = {
                "actions": [
                    { "type": "SendMessage", "text": `תאריך העברי לאחר 12 חודשים הוא: ${next11MonthsDate} ` }
                ]
            }
            res.json(responseData)
        } catch (error) {
            console.error(error)
            res.status(500).send('An error occurred while retrieving the date.')
        }
    }
}

const jewishService = new ZmanimService()

module.exports = {
    jewishService
}