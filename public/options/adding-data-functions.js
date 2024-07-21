
const inquirer = require('inquirer');

const {Department, Role, Employee}= require('../classes/query-classes');

const {getListOfDepartments, getDepartmentId, getListOfEmployees} = require('../helper/helper-functions')


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

    const {department, salary, title} = response;

    const deptId = await getDepartmentId(department)

    const role = new Role(table, title, salary, deptId)
    await role.addData();

}

const addingEmployee = async(table)=>{

const supervisors = await getListOfEmployees();
    const response = await inquirer.prompt([

        {
            type:"text",
            message:"What is the first name?",
            name:"firstName",
        },
        {
            type:"text",
            message:"What is the last name",
            name:"lastName",
    
        },
        {
            type:"list",
            message:"What position do they hold?",
            name:"role",
            choices:['test']
        },
        {
            type:"list",
            message:"Who is their manager?",
            name:"Manager",
            choices:['test']
        },


    ]);

    console.log(response);


}








module.exports = {addingDepartment,addingRole, addingEmployee}