const express = require('express')
const { jewishService } = require('./zman.controller')
const router = express.Router()

router.all('/next11months', jewishService.getNext11Month)
router.all('/next12months', jewishService.getNext12Month)

router.post('/next11', jewishService.next11Month)
router.post('/next12', jewishService.next12Month)


module.exports = router