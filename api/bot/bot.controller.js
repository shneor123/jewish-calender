const logger = require('../../services/logger.service')
const botService = require('./bot.service')

// GET LIST
async function getBots(req, res) {
    try {
        const bots = await botService.query(req.query)
        console.log('bots<>getBots</>', bots)
        logger.info('<>getBots</>', bots)
        res.json(bots)
    } catch (err) {
        logger.error('Cannot find bots:\n', err)
        res.status(500).send({ err: 'Failed to get bots' })
    }
}

// GET BY ID
async function getBotById(req, res) {
    try {
        const botId = req.params.botId
        const bot = await botService.getById(botId)
        res.json(bot)
    } catch (err) {
        logger.error(`Cannot find bot ${botId}:\n`, err)
        res.status(500).send({ err: 'Failed to get bot' })
    }
}

// POST (add bot)
async function addBot(req, res) {
    try {
        const bot = req.body
        const addedBot = await botService.add(bot)
        res.send(addedBot)
    } catch (err) {
        logger.error(`Cannot add bot:\n`, err)
        res.status(500).send({ err: 'Failed to add bot' })
    }
}

// PUT (Update bot)
async function updateBot(req, res) {
    try {
        const bot = req.body;
        const updatedBot = await botService.update(bot)
        res.json(updatedBot)
    } catch (err) {
        logger.error('Failed to update bot', err)
        res.status(500).send({ err: 'Failed to update bot' })

    }
}

// DELETE (Remove bot)
async function removeBot(req, res) {
    try {
        const boardId = req.params.botdId
        const removedId = await botService.remove(boardId)
        res.send(removedId)
    } catch (err) {
        logger.error(`Cannot remove bot ${botdId}:\n`, err)
        res.status(500).send({ err: 'Failed to remove bot' })
    }
}

// POST (JewishHebreow)
async function JewishHebreow(req, res) {
    try {
        const bot = req.body
        console.log("🚀 ~ file: bot.controller.js:58 ~ JewishHebreow ~ bot:", bot)
        const convert = await botService.convert(bot)
        res.send(convert)
    } catch (err) {
        logger.error(`Cannot add bot:\n`, err)
        res.status(500).send({ err: 'Failed to add bot' })
    }
}



module.exports = {
    getBots,
    getBotById,
    addBot,
    updateBot,
    removeBot,
    JewishHebreow
}