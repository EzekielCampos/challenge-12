
const inquirer = require("inquirer");

const {init} = require('../../app');

async function test(){


    const response = await inquirer.prompt([

        {
            type:"list",
            message:"Hello?",
            name:"option",
            choices: ['nothing', 'tired']
        },


    ]);

    console.log(response.option);





}

module.exports = {test}