const express = require('express')
const { jewishService } = require('./date.controller')
const router = express.Router()

router.all('/', jewishService.getConvertDate)
router.all('/gHeDate', jewishService.getHeDateTodey)
router.all('/gDate', jewishService.getDateTodey)


router.post('/date', jewishService.convertHebreow)
router.post('/date/gre', jewishService.convertGregotrian)
router.post('/zmanim/he', jewishService.heDateTodey)
router.post('/zmanim', jewishService.gDateTodey)

module.exports = router


