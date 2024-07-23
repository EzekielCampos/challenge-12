
const inquirer = require("inquirer");
// This Query class will be used to display the data
const {Query} = require('../classes/query-classes')
// These functions assist in adding information to the database depending on what the user selects
const {addingDepartment, addingRole, addingEmployee} = require('./adding-data-functions');
// This function updates the employee role
const {updatingEmployeeRole} = require('./updating-role');
// This array holds the different tables used in the database
const {tables} = require('../options/prompt-options');

// This functions is used to vew data
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

    // The users responses is then used as a parameter for the Query class
    const showData = new Query(response.option);
    // In the query class there is a method that will display the corresponding information in a table to the terminal
    await showData.displayData();


    }
    catch(error){
        console.log(error);
    }

}
// This option will allow the user to either add an emlployee, role, or a department
const secondOption = async() =>{


    const response = await inquirer.prompt([

        {
            type:"list",
            message:"What would you like to add?",
            name:"option",
            choices: tables
        },

    ]);

    // Deconstructing syntax from the options to be used in the switch statement
    const [department, role, employee] = tables
    console.log(department);

    switch(response.option){
        // This is the case if the user selects department
        case department:
            await addingDepartment(department);
            break;
            // This is the case if the user selects role
        case role:
            await addingRole(role);
            break;
            // This is the case if the user selects employee
        case employee:
            await addingEmployee(employee);
            break;

    }



}

// This function will update an employee role 
const thirdOption= async() =>{


    await updatingEmployeeRole();


}


module.exports = {firstOption, secondOption, thirdOption}