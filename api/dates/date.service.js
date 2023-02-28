const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

const COLLECTION_NAME = 'bot'


async function query() {
  try {
    const criteria = {}
    const collection = await dbService.getCollection(COLLECTION_NAME)
    let bots = await collection.find(criteria).toArray()
    return bots
  } catch (err) {
    logger.error('cannot find boards', err)
    throw err
  }
}

async function getById(botId) {
  try {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    const bots = collection.findOne({ _id: ObjectId(botId) })
    return bots
  } catch (err) {
    throw err
  }
}

async function remove(botId) {
  try {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    await collection.deleteOne({ _id: ObjectId(botId) })
    return botId
  } catch (err) {
    throw err
  }
}

async function add(bot) {
  try {
    const botToAdd = {
      actions: {
        createdAt: Date.now(),
        gregorianDate: bot.gregorianDate,
        jewishDate: bot.jewishDate,
        inputDate: bot.inputDate,
        next11MonthsDate: bot.next11MonthsDate,
        next12MonthsDate: bot.next12MonthsDate,
        useLastDate: false,
        lastDate: bot.lastDate,
        jewishDateInHebrewStr: bot.jewishDateInHebrewStr,
        currentDate: bot.currentDate
      }
    }
    const collection = await dbService.getCollection(COLLECTION_NAME)
    await collection.insertOne(botToAdd)
    return botToAdd
  } catch (err) {
    logger.error('cannot insert review', err)
    throw err
  }
}

async function update(bot) {
  try {
    var id = ObjectId(bot._id)
    delete bot._id
    const collection = await dbService.getCollection(COLLECTION_NAME)
    await collection.updateOne({ _id: id }, { $set: { ...bot } })
    bot._id = id
    return bot
  } catch (err) {
    logger.error(`cannot update bot ${bot._id}`, err)
    throw err
  }
}

async function convert(bot) {
  try {
    var id = ObjectId(bot._id)
    delete bot._id
    const collection = await dbService.getCollection(COLLECTION_NAME)
    await collection.updateOne({ _id: id }, { $set: { ...bot } })
    bot._id = id
    return bot
  } catch (err) {
    logger.error(`cannot update bot ${bot._id}`, err)
    throw err
  }
}


// class BotService {
//   __COLLECTION_NAME = 'bot'

//   async convert(bot) {
//     try {
//       var id = ObjectId(bot._id)
//       delete bot._id
//       const collection = await dbService.getCollection(this.__COLLECTION_NAME)
//       await collection.updateOne({ _id: id }, { $set: { ...bot } })
//       bot._id = id
//       return bot
//     } catch (err) {
//       logger.error(`cannot update bot ${bot._id}`, err)
//       throw err
//     }
//   }
// }

// const botService = new BotService()

module.exports = {
  query,
  getById,
  add,
  update,
  remove,
  convert
}


