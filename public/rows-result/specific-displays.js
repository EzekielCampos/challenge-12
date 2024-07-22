// This npm package helps create the tables to be displayed
const { table } = require('table');
// This columns holds the title for each column depending on what table is being displayed
const {deptColumns, roleColumns, employeeColumns} = require('./column-names')


// This function will display all the department data into a nice table using the table package
const departmentDisplay = async (data)=>{

    try{
        // This array will add all the data needed to be displayed into another array that will hold the title for each column
        for (const row of data) {
            deptColumns.push([
                row.id,
                row.name,
                
            ]);
        }
    // Displays the table of all the departments information
    console.log(table(deptColumns));
    }
    catch(error){
        console.log(error);
    }



}
// This function will display all the employees data into a nice table using the table package
const employeeDisplay = async (data)=>{


   try{
    // This array will add all the data needed to be displayed into another array that will hold the title for each column
    for (const row of data) {
        employeeColumns.push([
            row.employee_id,
            row.employee_first_name,
            row.employee_last_name,
            row.department,
            row.title,
            row.salary, 
            row.manager
        ]);
    }
    // Display the table of all the employees information
    console.log(table(employeeColumns));
   }catch(error){
    console.log(error);
   }

}

// This function will display all the job roles data into a nice table using the table package
const roleDisplay = async (data)=>{

    try{
        // This array will add all the data needed to be displayed into another array that will hold the title for each column
        for (const row of data) {
            roleColumns.push([
                row.id,
                row.title,
                row.salary,
                row.department
            ]);
        }
    
        // Displays the table of all the roles information
        console.log(table(roleColumns));
    }
    catch(error){
        console.log(error);
    }
  
}

module.exports = {roleDisplay, employeeDisplay, departmentDisplay};