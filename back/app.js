'use strict'

const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()
const PORT= process.env.PORT || 3000;   



// Obtiene los routers
const cliente_route = require('./routes/cliente');
const admin_route = require('./routes/admin');


// Conexion bbdd 
mongoose.connect('mongodb://127.0.0.1:27017/CreamKicks').then(() =>{
    console.log('DataBase connect successfully.');
}).catch((err)=>{
    console.log('error connecting MongoDB: ' + err.message);
})

// Puesta en marcha del servidor
app.listen(PORT, ()=>{
    console.log(`Server running on: http://localhost:${PORT}`)
})




app.use(bodyparser.urlencoded({extended: true})); // Analizar la peticion Cuando registramos un cliente  enviamos toda la informacion en un json
app.use(bodyparser.json({limit: '50mb', extended: true})); // Analiza el objeto json 

// 28 - 34 Se usa porque al estar separado el front y el back en proyectos distintos, cuando se suban a produccion van a estar cada uno en un droplet (VPS - Servidores privados virtuales) diferente
// Back y Front Estan en puertos diferente y se da los permisos para qe se envien la data y no de problemas de cors 

// Las siguientes lineas son los permisos que permiten la conexion comunicacion entre back y front
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

// Asigna los routes a las rutas.
app.use('/api', cliente_route);
app.use('/api', admin_route);


module.exports = app;