const express = require('express');
const router = require('.');
const cUser = require('../controllers/user.controller')

router.get('/', cUser.getAllUsers)
router.get('/:id', cUser.getUserByID)
router.post('/', cUser.createUser)
router.put('/:id', cUser.updateUser)
router.delete('/:id', cUser.deleteUser)

module.exports = router