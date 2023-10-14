const express = require('express');
const router = express.Router();
const checkOrigin = require('../middleware/origin');
const { getUsers, createUser, getUserByName, updateUserByName, deleteUserByName, getUserById, updateUserById, deleteUserById } = require('../controlles/users');

// Ruta principales
router.get('/', getUsers); // Ruta para obtener todos los elementos
router.post('/', createUser); // Ruta para actualizar un elemento (debería ser router.patch)

// Rutas CRUD propiedad ID

/*
router.get('/:id', getUserById); // Ruta para obtener un elemento por ID
router.patch('/:id', updateUserById); // Ruta para actualizar un elemento (debería ser router.patch)
router.delete('/:id', deleteUserById; // Ruta para eliminar un elemento
*/

// Rutas CRUD propiedad name

router.get('/:name', getUserByName); // Ruta para obtener un elemento por Name
router.patch('/:name', updateUserByName); // Ruta para actualizar un elemento (debería ser router.patch)
router.delete('/:name', deleteUserByName); // Ruta para eliminar un elemento

module.exports = router;
