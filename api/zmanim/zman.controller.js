const HebrewCalendar = require("hebcal")


class ZmanimService {

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
      

    async next11Month(req, res) {
        console.log('body', req.body)
        try {
            let inputDate = req.body.parameters.find(p => p.name === 'תאריך פטירה').value
            inputDate = inputDate.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3")
            const next11MonthsDate = ZmanimService.__calculateNextMonths(inputDate, 11)
            const responseData = {
                "actions": [
                    { "type": "SendMessage", "text": `תאריך העברי של ${inputDate} לאחר 11 חודשים הוא: ${next11MonthsDate} ` }
                ]
            }
            res.json(responseData)
            console.log(responseData)
        } catch (error) {
            console.error(error)
            res.status(500).send('An error occurred while retrieving the date.')
        }
    }

    async next12Month(req, res) {
        console.log('body', req.body)
        try {
            let inputDate = req.body.parameters.find(p => p.name === 'תאריך פטירה').value
            inputDate = inputDate.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3")
            const next12MonthsDate = ZmanimService.__calculateNextMonths(inputDate, 12)
            const responseData = {
                "actions": [
                    { "type": "SendMessage", "text": `תאריך העברי של ${inputDate} לאחר 12 חודשים הוא: ${next12MonthsDate} ` }
                ]
            }
            res.json(responseData)
            console.log(responseData)
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
                    { "type": "SendMessage", "text": `תאריך העברי של ${inputDate} לאחר 11 חודשים הוא: ${next11MonthsDate} ` }
                ]
            }
            res.json(responseData)
            console.log(responseData)
        } catch (error) {
            console.error(error)
            res.status(500).send('An error occurred while retrieving the date.')
        }
    }
    //Get
    async getNext12Month(req, res) {
        try {
            const inputDate = req.query.d
            const next12MonthsDate = ZmanimService.__calculateNextMonths(inputDate, 12)
            const responseData = {
                "actions": [
                    { "type": "SendMessage", "text": `תאריך העברי של ${inputDate} לאחר 12 חודשים הוא: ${next12MonthsDate} ` }
                ]
            }
            res.json(responseData)
            console.log(responseData)
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