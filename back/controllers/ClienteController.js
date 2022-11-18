'use strict'

// Variable para inicializar el modelo de cliente en el controlador
const Cliente = require('../models/cliente');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');


// Funciones cliente
const registro_cliente = async function(req,res){

    // Obtener los datos
    const data = req.body;// Va a recibir todos los datos
    var clientes_arr = [];

    // Verificacion de que el cliente no este registrado
    clientes_arr = await Cliente.find({email:data.email});

    if (clientes_arr.length == 0) {
        // Registro Cliente

        // Verificacion si ingreso una contraseña
        if (data.password) {
            // Encriptar contraseña
            bcrypt.hash(data.password,null,null, async function(err,hash){
                // Si hash - Si la contraseña fue encriptada
                if (hash) {
                    data.password = hash; 
                    var reg = await Cliente.create(data);
                    res.status(200).send({data:reg});

                }else{
                    res.status(200).send({message:'ErrorServer', data: undefined});

                }
            })
            
        } else {
            res.status(200).send({message:'no hay una contraseña', data: undefined});            
        }

    } else {
        res.status(200).send({message:'El correo ya existe en la base de datos', data: undefined});
    }
    
}
// Login cliente
const login_cliente = async function(req,res){
    const data = req.body;// Va a recibir todos los datos
    // Verificacion email en la bbdd
    var cliente_arr = [];
    cliente_arr = await Cliente.find({email:data.email});

    // Si el array esta vacio == 0
    if (cliente_arr.length == 0 ) {
        // No hay ningun usuario
        res.status(200).send({message: 'No se encontro el correo', data: undefined});
    } else {
        // Login
        let user = cliente_arr[0]; // El primer valor del array es el email del usuario

        // Verificacion contraseña enriptada con contraseña usuario
        bcrypt.compare(data.password, user.password, async function(error, check){
            if (check) {
                // Check responde falso o true
                // falso - Contraseñas no coinciden
                // True - Contraseñas coinciden
                
                // Contraseña correcta
                res.status(200).send({
                    data:user,
                    token: jwt.createToken(user)
                });
            } else {

                // Contraseña incorrecta
                res.status(200).send({message: 'Contraseña incorrecta', data: undefined});
            }
        })

    }
        
}



module.exports ={
    registro_cliente,
    login_cliente
}       