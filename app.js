require('dotenv').config();
const inquirer = require('inquirer');
const {options} = require('./public/options/prompt-options');

const {firstOption, secondOption, thirdOption} = require("./public/options/response-functions");


async function init(){


    const answers = await inquirer.prompt([

        {
            type:"list",
            message:"What would you like to do?",
            name:"option",
            choices: options
        },


    ]);

    const [first, second, third, fourth] = options;

    switch (answers.option){
        case first:
        await firstOption();
        break;
        case second:
        await secondOption();
        break;
        case third:
        await thirdOption();
        break;
        case fourth:
        return;
    }

   await init();

}


init();


