
const inquirer = require("inquirer");
const {Query} = require('../classes/query-classes')

const {addingDepartment, addingRole, addingEmployee} = require('./adding-data-functions');
const {updatingEmployeeRole} = require('./updating-role');
const {tables} = require('../options/prompt-options');


const firstOption = async()=>{

    
    try{

    const response = await inquirer.prompt([

        {
            type:"list",
            message:"Which data would you like to view?",
            name:"option",
            choices: tables
        },

    ]);

    const showData = new Query(response.option);

    await showData.displayData();


    }
    catch(error){
        console.log(error);
    }

}

const secondOption= async() =>{


    const response = await inquirer.prompt([

        {
            type:"list",
            message:"What would you like to add?",
            name:"option",
            choices: tables
        },

    ]);
    console.log(response.option);


    const [department, role, employee] = tables
    console.log(department);

    switch(response.option){
        case department:
            await addingDepartment(department);
            break;
        case role:
            await addingRole(role);
            break;
        case employee:
            await addingEmployee(employee);
            break;

    }



}


const thirdOption= async() =>{


    await updatingEmployeeRole();


}


module.exports = {firstOption, secondOption, thirdOption}