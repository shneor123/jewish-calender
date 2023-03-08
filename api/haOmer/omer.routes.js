const express = require('express')
const { getRemindUser, postRemindUser, getRemind } = require('./omer.controller')
const router = express.Router()

router.get('/', getRemind)

router.post('/date', postRemindUser)
router.post('/register', getRemindUser)


module.exports = router
