const inquirer = require('inquirer');

const {getListOfEmployees, getListOfRoles} = require('../helper/helper-functions');

const{getRoleId, getEmployeeId} = require('../helper/convert-to-id');

const {safeQuery} = require('../rows-result/display-rows');


const updateQuery = async (table, employee, role)=> {


    const placeholder = [role, employee];
    const queryString =  `UPDATE ${table} SET role_id = $1 WHERE id = $2;`;

    console.log(queryString, placeholder);

    await safeQuery(queryString, placeholder);


}




const updatingEmployeeRole = async(table = 'employee')=>{

    const positions = await getListOfRoles();
    const workers = await getListOfEmployees()

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

        let {role, employee} = response;
        // console.log(response, table, role, employee);

        employee = employee.split(' ');
        employee = await getEmployeeId(employee[0], employee[1]);
        role = await getRoleId(role);

console.log(role, employee);

        await updateQuery(table, employee, role);

}


module.exports= {updatingEmployeeRole};