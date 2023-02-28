const express = require('express')
const { convertHebreow, convertHebreowGet } = require('./date.controller')
const router = express.Router()

router.get('/', convertHebreowGet)
router.post('/date', convertHebreow)

module.exports = router