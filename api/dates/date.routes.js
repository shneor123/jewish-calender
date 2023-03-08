const express = require('express')
const { jewishService } = require('./date.controller')
const router = express.Router()

router.all('/', jewishService.convertDateToHeb)
router.all('/gHeDate', jewishService.getHebrewDateToday)
router.all('/gDate', jewishService.getGregorianDateToday)


router.post('/date', jewishService.convertToHebrewDate)
router.post('/date/gre', jewishService.convertToGregorianDate)
router.post('/zmanim/he', jewishService.getCurrentHebrewDate)
router.post('/zmanim', jewishService.getCurrentGregorianDate)

module.exports = router
