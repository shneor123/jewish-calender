const { DateTime } = require('luxon')
const cron = require('node-cron')

const START_DATE = '2023-02-02'
const TIMEZONE = 'Asia/Jerusalem'

function getReminderMessage() {
  const startOmer = DateTime.fromISO(START_DATE, { zone: TIMEZONE })
  const now = DateTime.now().setZone(TIMEZONE)
  const daysSinceStart = now.diff(startOmer, 'days').toObject().days

  if (daysSinceStart >= 0 && daysSinceStart < 49) {
    const day = Math.floor(daysSinceStart) + 1
    const message = `היום ${day} לעומר. אל תשכח לספור!`
    return message
  } else {
    return null
  }
}




function sendResponse(res, message) {
  if (message) {
    const responseData = {
      "actions": [{ "type": "SendMessage", "text": message }]
    }
    res.json(responseData)
  } else {
    const responseData = {
      "actions": [
        { "type": "SendMessage", "text": "Sefirat HaOmer has ended" }
      ]
    }
    res.json(responseData)
  }
}

function getRemindUser(req, res) {
  const reminderMessage = getReminderMessage()
  sendResponse(res, reminderMessage)

  cron.schedule('19 10 * * *', () => {
    const reminderMessage = getReminderMessage()
    if (reminderMessage) {
      console.log(reminderMessage)
    }
  }, { timezone: TIMEZONE })
}

function postRemindUser(req, res) {
  const reminderMessage = getReminderMessage()
  sendResponse(res, reminderMessage)
}


module.exports = {
  getRemindUser,
  postRemindUser
}