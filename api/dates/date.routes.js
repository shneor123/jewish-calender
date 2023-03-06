const express = require('express')
const { jewishService } = require('./date.controller')
const router = express.Router()

router.get('/', jewishService.getConvertDate)
router.get('/gHeDate', jewishService.getHeDateTodey)
router.get('/gDate', jewishService.getDateTodey)


router.post('/date', jewishService.convertHebreow)
router.post('/date/gre', jewishService.convertGregotrian)
router.post('/zmanim/he', jewishService.heDateTodey)
router.post('/zmanim', jewishService.gDateTodey)

module.exports = router
