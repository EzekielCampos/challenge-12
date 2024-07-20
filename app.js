require('dotenv').config();
const {Pool} = require("pg");
const inquirer = require('inquirer');


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
            message:"Select a license that was used for this repository",
            name:"test",
            choices: [1,2,3,4]
        },



    ]);


    if (answers.test === 4){

        return 

    }

   console.log(answers.test);


}


init();


module.exports = {pool};
