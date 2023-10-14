const { httpError } = require('../helpers/handleError');
const userModel = require('../models/users');

/********** FUNCIONES PRINCIPALES **********/

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const listAll = await userModel.find({});
        if (listAll) {
            res.status(200).json({ message: 'Usuarios consultados con éxito.', data: listAll });
        } else {
            res.status(400).json({ message: 'Algo salió mal al intentar consultar todos los usuarios' });
        }
    } catch (error) {
        httpError(res, error);
    }
}

// Crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const { id, name, rol, email, password } = req.body;

        // Verificar si todos los parámetros requeridos están presentes
        if (!name || !rol || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios. Asegúrese de proporcionar name, rol, email y password.' });
        }

        // Verificar si ya existe un usuario con el mismo name
        const userExistente = await userModel.findOne({ name: name });

        if (userExistente) {
            return res.status(400).json({ message: 'Ya existe un usuario con ese name, intente con un name original.' });
        }

        // Crear un nuevo usuario
        const user = await userModel.create({
            id, name, rol, email, password
        });

        if (user) {
            // Enviar la respuesta con los datos del usuario creado
            res.status(201).json({ data: user, message: 'Usuario creado con éxito.' });
        } else {
            res.status(400).json({ message: 'Algo salió mal al intentar crear nuevo usuario' });
        }

    } catch (error) {
        // Manejar errores y enviar una respuesta de error
        httpError(res, error);
    }
}

/********** CRUD POR PROPIEDAD DE NAME **********/

// Obtener usuario por name
const getUserByName = async (req, res) => {
    try {
        const userName = req.params.name;
        const user = await userModel.findOne({ name: userName });
        if (user) {
            res.status(200).json({ message: 'Usuario consultado con éxito.', data: user });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado.' });
        }
    } catch (error) {
        httpError(res, error);
    }
}

// Actualizar usuario por name
const updateUserByName = async (req, res) => {
    try {
        const userName = req.params.name;
        const { name, rol, email, password } = req.body;
        const updateduser = await userModel.findOneAndUpdate(
            { name: userName },
            { name, rol, email, password },
            { new: true }
        );
        if (updateduser) {
            res.status(200).json({ message: 'Usuario actualizado con éxito.', data: updateduser });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado.' });
        }
    } catch (error) {
        httpError(res, error);
    }
}

// Eliminar usuario por name
const deleteUserByName = async (req, res) => {
    try {
        const userName = req.params.name;
        const deleteduser = await userModel.findOneAndRemove({ name: userName });
        if (deleteduser) {
            res.status(204).json({ message: 'Usuario eliminado con éxito.', data: deleteduser });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado.' });
        }
    } catch (error) {
        httpError(res, error);
    }
}

/********** CRUD POR PROPIEDAD DE ID **********/

// Obtener usuario por id
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findById(userId);
        if (user) {
            res.status(200).json({ data: user });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado.' });
        }
    } catch (error) {
        httpError(res, error);
    }
}

// Actualizar usuario por id
const updateUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, rol, email, password } = req.body;
        const updateduser = await userModel.findByIdAndUpdate(userId, {
            name, rol, email, password
        }, { new: true });
        if (updateduser) {
            res.status(200).json({ data: updateduser });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado.' });
        }
    } catch (error) {
        httpError(res, error);
    }
}

// Eliminar usuario por id
const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const deleteduser = await userModel.findByIdAndRemove(userId);
        if (deleteduser) {
            res.status(204).json({ message: 'Usuario eliminado con éxito.', data: deleteduser });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado.' });
        }
    } catch (error) {
        httpError(res, error);
    }
}

// Exportar funciones
module.exports = { getUsers, createUser, getUserByName, updateUserByName, deleteUserByName, getUserById, updateUserById, deleteUserById };
