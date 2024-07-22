require('dotenv').config();
const inquirer = require('inquirer');
// This is an array that holds the cli prompt options of what action the user would like to perform
const {options} = require('./public/options/prompt-options');
// These functions will perform the correspoding action depending on what the user selects
const {firstOption, secondOption, thirdOption} = require("./public/options/response-functions");


async function init(){


    // Prompt the user on what feature they would like to use
    const answers = await inquirer.prompt([

        {
            type:"list",
            message:"What would you like to do?",
            name:"option",
            choices: options
        },


    ]);

    // Deconstruct the array to be used for the switch statmeent cases
    const [first, second, third, fourth] = options;

    // This switch statement will perform run one of the following functions depending on the users choice
    switch (answers.option){
        // This option is to view data from either a department, role, or employees
        case first:
        await firstOption();
        break;
        // To add a department, role, or employee
        case second:
        await secondOption();
        break;
        // Updates an emloyee role
        case third:
        await thirdOption();
        break;
        // This will end the function and terminate the prompts since init is recursive
        case fourth:
        return;
    }

   await init();

}


init();


