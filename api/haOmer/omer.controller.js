const { DateTime } = require('luxon')
const cron = require('node-cron')

const START_DATE = '2023-04-16'
const TIMEZONE = 'Asia/Jerusalem'

function __getReminderMessage() {
  try {
    const startOmer = DateTime.fromISO(START_DATE, { zone: TIMEZONE })
    const now = DateTime.now().setZone(TIMEZONE)
    const daysSinceStart = now.diff(startOmer, 'days').toObject().days

    if (daysSinceStart >= 0 && daysSinceStart < 49) {
      const day = Math.floor(daysSinceStart) + 1
      let message = `היום ${day} לעומר. אל תשכח לספור!`
      if (day === 33) {
        message += ' יום ההילולה של רשב"י'
      }
      return message
    } else {
      return null
    }
  } catch (err) {
    console.error('An error occurred while getting the reminder message:', err)
    return null
  }
}

function __sendResponse(res, message) {
  try {
    if (message) {
      const responseData = {
        "actions": [{ "type": "SendMessage", "text": message }]
      }
      res.json(responseData)
    } else {
      const responseData = {
        "actions": [{ "type": "SendMessage", "text": "ספירת העומר הסתיימה לשנה זו!!" }]
      }
      res.json(responseData)
    }
  } catch (error) {
    console.error(`Error in sendResponse function: ${error.message}`)
  }
}


async function getRemindUser(req, res) {
  const reminderMessage = await __getReminderMessage()
  __sendResponse(res, reminderMessage)
  try {
    cron.schedule('19 10 * * *', () => {
      const reminderMessage = __getReminderMessage()
      if (reminderMessage) {
        console.log(reminderMessage)
      }
    }, { timezone: TIMEZONE })
  } catch (error) {
    console.error(error)
  }
}

async function postRemindUser(req, res) {
  console.log(req.body)
  try {
    const reminderMessage = await __getReminderMessage()
    __sendResponse(res, reminderMessage)
  } catch (error) {
    console.error(`Error in myAsyncFunction: ${error.message}`)
    __sendResponse(res, null)
  }
}





async function postRegister(req, res) {
  console.log(req.body)
  try {
    const { chat } = req.body
    const userId = chat.sender // assuming that chat.sender contains the user's unique identifier

    // save user details to database or any other storage mechanism
    // you can also set a flag or attribute indicating that the user has registered for daily reminders

    // send confirmation message to user
    const message = "You have successfully registered for daily reminders."
    await sendMessage(userId, message) // assuming that there is a function named sendMessage that sends a message to the user
    res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: err.message })
  }
}


module.exports = {
  getRemindUser,
  postRemindUser,
  postRegister
}

