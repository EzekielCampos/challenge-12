
const inquirer = require('inquirer');

const {Department, Role}= require('../classes/query-classes');

const {getListOfDepartments} = require('../helper/helper-functions')


const addingDepartment = async(table)=>{

    try{
        const response = await inquirer.prompt([

            {
                type:"text",
                message:"What is the name of the department",
                name:"nameOfDepartment",
            },
    
        ]);
    
    
        const {nameOfDepartment} = response;
    
        const dept = new Department(table, nameOfDepartment);
    
        await dept.addData();

    }
    catch(error){

        console.log(error);
    }

}

const addingRole = async(table)=>{

    const departmentOptions = await getListOfDepartments();

    const response = await inquirer.prompt([

        {
            type:"text",
            message:"What is the name of the new role",
            name:"title",
        },
        {
            type:"text",
            message:"What is the salary?",
            name:"salary",
            validate: function (value) {
                const valid = !isNaN(parseFloat(value)) && isFinite(value);
                return valid || 'Please enter a valid number';
              },
              filter: Number,
        },
        {
            type:"list",
            message:"What is the name of the new role",
            name:"department",
            choices:departmentOptions
        },


    ]);

    console.log(response.department);

    const {department, salary, title} = response;

    const role = new Role(table, title, salary, department)



}





module.exports = {addingDepartment,addingRole}