const express = require('express')
const { getRemindUser, postRemindUser, postRegister } = require('./omer.controller')
const router = express.Router()

router.get('/', getRemindUser)

router.post('/date', postRemindUser)
router.post('/register', postRegister)


module.exports = router
