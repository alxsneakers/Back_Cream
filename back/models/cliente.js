'use strict'

const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema= Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    pais: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },  
    f_nacimiento: {
        type: String,
        required: false
    },

});

module.exports = mongoose.model('cliente',ClienteSchema);