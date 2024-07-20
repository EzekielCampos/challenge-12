require('dotenv').config();
const inquirer = require('inquirer');
const {options} = require('./public/options/prompt-options');

const {test, firstOption} = require("./public/options/response-functions");




async function init(){


    const answers = await inquirer.prompt([

        {
            type:"list",
            message:"What would you like to do?",
            name:"option",
            choices: options
        },


    ]);

    const [first, second, third, fourth, fifth, sixth, seventh, eigth] = options;

    if(answers.option === first){

        await firstOption();

    }


    if (answers.option === 'Exit'){

        return 

    }

   console.log(answers.option);
   await init();


}


init();


