const express = require('express')
const { jewishService } = require('./zman.controller')
const router = express.Router()

router.all('/nextmonths', jewishService.getNext11or12Month)

router.post('/next', jewishService.nextMonths)


module.exports = router