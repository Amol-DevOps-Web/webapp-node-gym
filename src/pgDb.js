//CRUD create, read update and delete operation 

const {Pool,Client} = require('pg')


const client = new Client({
    host:'localhost',
    user:'postgres',
    database:'maintabale',
    password:'postgres',
    port:'5432'
});



module.exports= client;
