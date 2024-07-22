
require('dotenv').config();
// This package will gives a connection to the database
const {Pool} = require("pg");

// The function will create a new Pool each time it is run so that multiple request to the database can be made
const createPool =()=>{
    return new Pool(
        {
        // This is all the credentials to acceess the database
            user:process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: 'localhost',
            database: process.env.DB_NAME
        
        },
        )

} 
    

    module.exports = {createPool};
