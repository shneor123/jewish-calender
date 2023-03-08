const HebrewCalendar = require("hebcal")
const moment = require('moment-timezone')
class ZmanimService {

    static __parseDate(inputDate) {
        const dateRegex = /^(\d{1,2})[\-./]?(\d{1,2})[\-./]?(\d{4})$/
        const match = inputDate.match(dateRegex)
        let date
        if (match) {
            const [_, day, month, year] = match
            date = new Date(`${year}-${month}-${day}`)
        } else {
            date = new HebrewCalendar.HDate(inputDate).greg()
        }
        return date
    }

    static __calculateNextDates(inputDate, months, days) {
        const date = ZmanimService.__parseDate(inputDate)
        const hebrewDate = HebrewCalendar.HDate(date)
        hebrewDate.setMonth(hebrewDate.getMonth() + months)
        hebrewDate.setDate(hebrewDate.getDate() + days)
        return hebrewDate.toString("h")
    }

    async nextMonths(req, res) {
        console.log("body", req.body)
        try {
            const inputDate = req.body.parameters.find((p) => p.name === "תאריך פטירה").value
            const inputDateFormatted = inputDate.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3")

            const next7DaysDate = ZmanimService.__calculateNextDates(inputDate, 0, 7) // 0 represents 0 months, and 7 represents 7 days
            const next1MonthDate = ZmanimService.__calculateNextDates(inputDate, 1, 0)
            const next11MonthsDate = ZmanimService.__calculateNextDates(inputDate, 11, 0)
            const next12MonthsDate = ZmanimService.__calculateNextDates(inputDate, 12, 0)

            const responseData = {
                actions: [
                    { type: "SendMessage", text: `תאריך העברי של ${inputDateFormatted} לאחר 7 ימים הוא: ${next7DaysDate}`, },
                    { type: "SendMessage", text: `תאריך העברי של ${inputDateFormatted} לאחר 1 חודש הוא: ${next1MonthDate}`, },
                    { type: "SendMessage", text: `תאריך העברי של ${inputDateFormatted} לאחר 11 חודשים הוא: ${next11MonthsDate}`, },
                    { type: "SendMessage", text: `תאריך העברי של ${inputDateFormatted} לאחר 12 חודשים הוא: ${next12MonthsDate}`, },
                    { type: "SendItem", options:[{"type": "Command", "text": "לפני השקיעה"  }], },
                    { type: "SendItem", options:[{"type": "Command", "text": "אחרי השקיעה"  }], }
                ],
            }

            res.json(JSON.stringify(responseData))
            console.log(responseData)
        } catch (error) {
            console.error(error)
            res.status(500).send("An error occurred while retrieving the date.")
        }
    }

    //Get
    async getNext11or12Month(req, res) {
        try {
            const inputDate = req.query.d
            const next11MonthsDate = ZmanimService.__calculateNextMonths(inputDate, 11)
            const next12MonthsDate = ZmanimService.__calculateNextMonths(inputDate, 12)
            const responseData = {
                "actions": [
                    { "type": "SendMessage", "text": `תאריך העברי של ${inputDate} לאחר 11 חודשים הוא: ${next11MonthsDate} ` },
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