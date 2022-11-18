'use strict'

// Variable para inicializar el modelo de admin en el controlador
const Admin = require('../models/admin');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');

// Funciones admin
const registro_admin = async function(req,res){

    // Obtener los datos
    const data = req.body;// Va a recibir todos los datos
    var admins_arr = [];

    // Verificacion de que el admin no este registrado
    admins_arr = await Admin.find({email:data.email});

    if (admins_arr.length == 0) {
        // Registro admin

        // Verificacion si ingreso una contraseña
        if (data.password) {
            bcrypt.hash(data.password,null,null, async function(err,hash){
                // Si hash - Si la contraseña fue encriptada
                if (hash) {
                    data.password = hash; 
                    var reg = await Admin.create(data);
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

// Login admin
const login_admin = async function(req,res){
    const data = req.body;// Va a recibir todos los datos
    // Verificacion email en la bbdd
    var admin_arr = [];
    admin_arr = await Admin.find({email:data.email});

    // Si el array esta vacio == 0
    if (admin_arr.length == 0 ) {
        // No hay ningun usuario
        res.status(200).send({message: 'No se encontro el correo', data: undefined});
    } else {
        // Login
        let user = admin_arr[0]; // El primer valor del array es el email del usuario

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


module.exports={
    registro_admin,
    login_admin
}