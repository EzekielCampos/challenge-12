const { table } = require('table');
const {deptColumns, roleColumns, employeeColumns} = require('./column-names')



const departmentDisplay = async (data)=>{


    try{
        for (const row of data) {
            deptColumns.push([
                row.id,
                row.name,
                
            ]);
        }
    
    console.log(table(deptColumns));
    }
    catch(error){
        console.log(error);
    }



}

const employeeDisplay = async (data)=>{


   try{
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
    console.log(table(employeeColumns));
   }catch(error){
    console.log(error);
   }

}


const roleDisplay = async (data)=>{

    try{
        for (const row of data) {
            roleColumns.push([
                row.id,
                row.title,
                row.salary,
                row.department_id
            ]);
        }
    
    
        console.log(table(roleColumns));
    }
    catch(error){
        console.log(error);
    }
  


}

module.exports = {roleDisplay, employeeDisplay, departmentDisplay};