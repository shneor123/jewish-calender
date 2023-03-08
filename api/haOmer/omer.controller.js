const { DateTime } = require('luxon')
const cron = require('node-cron')
const axios = require('axios')

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

//Get
async function getRemind(req, res) {
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


async function getRemindUser(req, res) {
  try {
    const reminderMessage = await __getReminderMessage()

    // TODO: fetch list of registered users from database or file
    const registeredUsers = []

    cron.schedule('0 18 * * *', () => {
      registeredUsers.forEach(async (user) => {
        // send Omer count message to the user
        const responseData = {
          actions: [{ type: 'SendMessage', text: reminderMessage }],
        }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(responseData),
        }
        await fetch(user.callbackUrl, requestOptions)
      })
    }, { timezone: TIMEZONE })

    __sendResponse(res, reminderMessage)
  } catch (error) {
    console.error('An error occurred in getRemindUser:', error)
    __sendResponse(res, null)
  }
}


module.exports = {
  getRemind,
  postRemindUser,
  getRemindUser
}


















// const USERNAME = 'johndoe' // replace with your username
// const TOKEN = '1234567890abcdef' // replace with your token
// const PLATFORM_TOKEN = 'p1atf0rm-t0k3n' // replace with the platform token you obtained from GetChat
// const REMINDER_MESSAGE = 'Remember to count the Omer today!' // customize the message as needed
// // Register a user and get a LeadId
// async function registerUser() {
//   try {
//     const response = await axios.post('http://cloud.inforu.co.il/api/Chatbot/GetLead', {
//       User: { Username: USERNAME, Token: TOKEN },
//       Data: { PlatformToken: PLATFORM_TOKEN, LeadId: 0 }
//     })
//     return response.data.Data.LeadId
//   } catch (error) {
//     console.error(error)
//   }
// }
// // Get the PlatformToken and Sender information for a registered user
// async function getUserInfo(leadId) {
//   const response = await axios.post('http://cloud.inforu.co.il/api/Chatbot/GetChat', {
//     User: { Username: USERNAME, Token: TOKEN },
//     Data: { PlatformToken: PLATFORM_TOKEN, Sender: `Lead${leadId}` }
//   })
//   return response.data.Data
// }
// // Send a reminder message to a user
// async function sendReminder(platformToken, sender) {
//   await axios.post(`http://cloud.inforu.co.il/api/${platformToken}/SendMessage`, {
//     User: { Username: USERNAME, Token: TOKEN },
//     Data: {
//       Sender: sender,
//       Recipients: [sender],
//       Channel: 'Whatsapp',
//       Message: REMINDER_MESSAGE
//     }
//   })
// }
// // Schedule a daily job to send reminders to all registered users
// async function scheduleReminders() {
//   const registeredUsers = [/* TODO: retrieve the list of registered users from your database or file */]
//   for (const leadId of registeredUsers) {
//     const userInfo = await getUserInfo(leadId)
//     await sendReminder(userInfo.PlatformToken, userInfo.Sender)
//   }
// }

// // Schedule the job to run every day at 3:00 pm
// cron.schedule('0 15 * * *', scheduleReminders)

