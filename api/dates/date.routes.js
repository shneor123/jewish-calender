const express = require('express')
const { convertHebreow, getConvertHebrow, heDateTodey, gDateTodey, convertGregotrian } = require('./date.controller')
const router = express.Router()

router.get('/', getConvertHebrow)
router.post('/date', convertHebreow)
router.post('/date/gre', convertGregotrian)
router.post('/zmanim/he', heDateTodey)
router.post('/zmanim', gDateTodey)

module.exports = router
