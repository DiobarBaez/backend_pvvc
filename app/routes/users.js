const express = require('express');
const router = express.Router();
const checkOrigin = require('../middleware/origin');
const { getUsers, createUser, getUserByName, updateUserByName, deleteUserByName, getUserById, updateUserById, deleteUserById } = require('../controlles/users');

router.get('/', getUsers); 
router.post('/', createUser); 
router.get('/:name', getUserByName); 
router.patch('/:name', updateUserByName);
router.delete('/:name', deleteUserByName);

module.exports = router;
