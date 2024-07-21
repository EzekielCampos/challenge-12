
const inquirer = require('inquirer');

const {Department, Role, Employee}= require('../classes/query-classes');

const {getListOfDepartments, getListOfEmployees,getListOfRoles} = require('../helper/helper-functions')

const{getRoleId, getDepartmentId, getEmployeeId} = require('../helper/convert-to-id');

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

const noSupervisor = 'N/A';

const supervisors = await getListOfEmployees();
supervisors.push(noSupervisor);
const positions = await getListOfRoles();
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
            choices:positions
        },
        {
            type:"list",
            message:"Who is their manager?",
            name:"manager",
            choices:supervisors
        },


    ]);

    let {firstName, lastName, role, manager} = response;

    manager = manager.split(' ');

    role = await getRoleId(role);
    manager = await getEmployeeId(manager[0], manager[1]);

    const employee = new Employee(table, firstName, lastName, role, manager);

    await employee.addData();



}

// const updatingEmployeeRole = async(table = 'employee')=>{

//     const positions = await getListOfRoles();
//     const workers = await getListOfEmployees()

//     const response = await inquirer.prompt([

//         {
//             type:"list",
//             message:"Which employee would you like to update?",
//             name:"employee",
//             choices:workers
//         },
//         {
//             type:"list",
//             message:"SELECT",
//             name:"role",
//             choices:positions
    
//         },]);

//         console.log(table);

//         console.log(response);


// }





module.exports = {addingDepartment,addingRole, addingEmployee}