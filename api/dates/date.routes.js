const express = require('express')
const { jewishService } = require('./date.controller')
const router = express.Router()

router.all('/', jewishService.getConvertDate)
// router.all('/gHeDate', jewishService.getHeDateTodey)
router.all('/gDate', jewishService.getDateTodey)


router.all('/date', jewishService.convertHebreow)
router.all('/date/gre', jewishService.convertGregotrian)
router.all('/zmanim/he', jewishService.heDateTodey)
router.all('/zmanim', jewishService.gDateTodey)

module.exports = router
