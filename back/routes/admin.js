'use strict';

const express = require('express');
// Variable para inicializar el controlador de admin 
const adminController = require('../controllers/AdminController');

// Rutas
// Ruta que gestiona el motodo registro_admin - El registro manda datos al backend por lo tanto sera un metodo post
const api = express.Router();

// La ruta /registro_admin esta vinculada al controlador adminController al metodo registro_admin
api.post('/registro_admin', adminController.registro_admin);
api.post('/login_admin', adminController.login_admin);


module.exports = api;