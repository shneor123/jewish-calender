const express = require('express')
const { getBotById, getBots, addBot, updateBot,JewishHebreow, removeBot } = require('./bot.controller')
const router = express.Router()

router.get('/', getBots)
router.get('/:botId', getBotById)
router.put('/', updateBot)
router.post('/', addBot)
router.delete('/:botId', removeBot)
router.post('/jewish/hebreow', JewishHebreow)

module.exports = router