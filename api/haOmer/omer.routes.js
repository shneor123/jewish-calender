const express = require('express')
const { getRemindUser ,postRemindUser} = require('./omer.controller')
const router = express.Router()

router.get('/', getRemindUser)

router.post('/date', postRemindUser)


module.exports = router
