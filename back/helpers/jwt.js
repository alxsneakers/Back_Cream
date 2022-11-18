'use strict'

const jwt = require('jwt-simple'); // Paquete para decodificar tokens
const moment = require('moment'); // Paquete moment
const secret = 'CreamKicks'; // Contraseña para encriptar los datos

// La funcion recibe como parametro todo el objeto del usuario
exports.createToken = function(user){
    // se generara el token con todos los datos de payload 
    const payload = {
        sub: user._id,
        nombre: user.nombre,
        apellidos: user.apellidos,
        email:user.email,
        iat: moment().unix(),
        exp: moment().add(30    ,'days').unix()
    }
        
    return jwt.encode(payload,secret);
}