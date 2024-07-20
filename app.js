require('dotenv').config();
const {Pool} = require("pg");
const inquirer = require('inquirer');

const {options} = require('./public/prompt-options');


const pool = new Pool(
{

    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: process.env.DB_NAME

},
console.log("Successs")

)


async function init(){


    const answers = await inquirer.prompt([

        {
            type:"list",
            message:"What would you like to do?",
            name:"option",
            choices: options
        },



    ]);


    if (answers.option === 'Exit'){

        return 

    }

   console.log(answers.option);


}


init();


module.exports = {pool};
