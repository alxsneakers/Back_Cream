'use strict';

const express = require('express');
// Variable para inicializar el controlador de cliente 
const clienteController = require('../controllers/ClienteController');

// Rutas
const api = express.Router();

// Ruta que gestiona el motodo registro_cliente - El registro manda datos al backend por lo tanto sera un metodo post
// Metodo post por que es un registro
// La ruta / registro_cliente esta vinculada al controlador clienteController al metodo registro_cliente
api.post('/registro_cliente', clienteController.registro_cliente);
api.post('/login_cliente', clienteController.login_cliente);

module.exports = api;