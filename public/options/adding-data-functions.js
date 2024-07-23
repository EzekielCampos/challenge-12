const inquirer = require('inquirer');
// Different classes that each represent the tables that need to be manipulated from the database
const {Department, Role, Employee}= require('../classes/query-classes');
// These functions help get a list of necessary data so that it can be used for the prompts to select it
const {getListOfDepartments, getListOfEmployees,getListOfRoles} = require('../helper/helper-functions')
// The functions get the necessary id so that they can be used when using the insert query for required actions
const{getRoleId, getDepartmentId, getEmployeeId} = require('../helper/convert-to-id');
const {verifyNames, verifySalary} = require('../helper/validate-input');

const addingDepartment = async(table)=>{

    try{
        const response = await inquirer.prompt([

            {
                type:"text",
                message:"What is the name of the department",
                name:"nameOfDepartment",
                validate: value =>verifyNames(value),
                filter: value => value.trim()
            },
    
        ]);
    
        // This is the user response of what department they would like to add
        const {nameOfDepartment} = response;
    
        // Create a new class of Department and add the user response the type of table for parameters
        const dept = new Department(table, nameOfDepartment);
    
        // Use the addData method to perform the insert query to add a new department
        await dept.addData();

    }
    catch(error){

        console.log(error);
    }

}

const addingRole = async(table)=>{

    try{
        // This will return an array of all the departments that already exist in the database to be used for the prompts
    const departmentOptions = await getListOfDepartments();

    const response = await inquirer.prompt([

        {
            type:"text",
            message:"What is the name of the new role",
            name:"title",
            validate: value =>verifyNames(value),
            filter: value => value.trim()
            
        },
        {
            type:"text",
            message:"What is the salary?",
            name:"salary",
            // Checks if the value is numbers only
            validate: value => verifySalary(value),
           
        },
        {
            type:"list",
            message:"What is the name of the new role",
            name:"department",
            choices:departmentOptions
        },


    ]);

    // These are the responses that the user enter and selected for the prompts
    let {department, salary, title} = response;

    // Need to convert string into a number 
    salary = await parseFloat(salary);
    // This will convert the department name to it's corresponding id number to be used for creating the Role class
    const deptId = await getDepartmentId(department)

    // This class is created using the user answers in the parameters
    const role = new Role(table, title, salary, deptId)
    // This method will add a new role to the database using the user responses
    await role.addData();
    }
    catch(error){
        console.log(error);
    }

}

const addingEmployee = async(table)=>{

    try{
        // This option is used for when the user does not have a manager
        const noSupervisor = 'N/A';
        // This will return an array of all the employees names from the database
        const supervisors = await getListOfEmployees();
        // Add this option if the user does not have supervisor
        supervisors.push(noSupervisor);
        // This will return an array of all the roles from the database
        const positions = await getListOfRoles();
        const response = await inquirer.prompt([

            {
                type:"text",
                message:"What is the first name?",
                name:"firstName",
                validate: value =>verifyNames(value),
                filter: value => value.trim()
            },
            {
                type:"text",
                message:"What is the last name",
                name:"lastName",
                validate: value =>verifyNames(value),
                filter: value => value.trim()
        
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

        // The user responses from the prompts
        let {firstName, lastName, role, manager} = response;

        // In order to get the id of a person the first and last name must be separate so we split them
        manager = manager.split(' ');

        // Converts the role name to the corresponding id to be used for the Employee class
        role = await getRoleId(role);
        // Convert the employee first and last name to it's id to be used for the Employee class
        manager = await getEmployeeId(manager[0], manager[1]);
        // The employee class takes the users responses as parameters to add a new employee to the database
        const employee = new Employee(table, firstName, lastName, role, manager);
        // This method adds a new employee to the database
        await employee.addData();

        }
        catch(error){
            console.log(error);
        }




}





module.exports = {addingDepartment,addingRole, addingEmployee}