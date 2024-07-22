require('dotenv').config();
const {Pool} = require("pg");

const createPool =()=>{
    return new Pool(
        {
        
            user:process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: 'localhost',
            database: process.env.DB_NAME
        
        },
        )

} 
    

    module.exports = {createPool};
