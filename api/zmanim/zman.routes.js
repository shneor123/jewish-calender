const express = require('express')
const { next11Month, next12Month, getNext11Month, getNext12Month } = require('./zman.controller')
const router = express.Router()

router.get('/next11months', getNext11Month)
router.get('/next12months', getNext12Month)
router.post('/next11', next11Month)
router.post('/next12', next12Month)


module.exports = router