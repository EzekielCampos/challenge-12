const inquirer = require('inquirer');
// Function will get a list of the necessary items to be used for inquirer
const {getListOfEmployees, getListOfRoles} = require('../helper/helper-functions');
// Convert the data into the specified id that go with them
const{getRoleId, getEmployeeId} = require('../helper/convert-to-id');
// This will perfom the query operaiton
const {safeQuery} = require('../rows-result/display-rows');

// This function will take the data from the prompts and place it to the query string to update the role
const updateQuery = async (table, employee, role)=> {

        try{
            // The placeholder are used for the parameterized query to avoind sql injections
            const placeholder = [role, employee];
            // This is the query string that will update the employee's role
            const queryString =  `UPDATE ${table} SET role_id = $1 WHERE id = $2;`;
        
            // Call the method perform the parameterized query
            await safeQuery(queryString, placeholder);
        
        }
        catch(error){
            console.log(error);
        }
  

}




const updatingEmployeeRole = async(table = 'employee')=>{

    try{
        // This array will be used for the user to select which role they want to select for the employee
    const positions = await getListOfRoles();
    // This will give the user the option of which employee they would like choose to update
    const workers = await getListOfEmployees();

    const response = await inquirer.prompt([

        {
            type:"list",
            message:"Which employee would you like to update?",
            name:"employee",
            choices:workers
        },
        {
            type:"list",
            message:"SELECT",
            name:"role",
            choices:positions
    
        },]);

        // This is the user responses that will be used to update the employee
        let {role, employee} = response;
        // Need to split the employee name since the first and last name are sepearate columns in the database
        employee = employee.split(' ');
        // Once the names are split they will get the corresponding id of the employee
        employee = await getEmployeeId(employee[0], employee[1]);
        // Get the id of the role that the user selected
        role = await getRoleId(role);

        // Once all the necessary data is here call the update query function
        await updateQuery(table, employee, role);
        console.log("Employee role updated!");
    }
    catch(error){
        console.log(error);
    }

}


module.exports= {updatingEmployeeRole};