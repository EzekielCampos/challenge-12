const { table } = require('table');
const {deptColumns, roleColumns, employeeColumns} = require('./column-names')



const departmentDisplay = async (data)=>{


    for (const row of data) {
        deptColumns.push([
            row.id,
            row.name,
            
        ]);
    }
//         await data.forEach((row) => {
//         deptColumns.push([row.id, row.name]);
// });
console.log(data);
console.log(deptColumns);
console.log(table(deptColumns));

}

const employeeDisplay = async (data)=>{

//     await data.forEach((row) => {
// employeeColumns.push([row.employee_id, row.employee_first_name, row.employee_last_name,
//     row.department, row.title, row.salary, row.manager]);

//     });

    for (const row of data) {
        employeeColumns.push([
            row.employee_id,
            row.employee_first_name,
            row.employee_last_name,
            row.department,
            row.title,
            row.salary, // Correcting the typo here
            row.manager
        ]);
    }
    console.log(table(employeeColumns));

}


const roleDisplay = async (data)=>{
    for (const row of data) {
        roleColumns.push([
            row.id,
            row.title,
            row.salary,
            row.department_id
        ]);
    }

//     await data.forEach((row) => {
// roleColumns.push([row.id, row.title, row.salary,
//     row.department_id]);

// });
    console.log(table(roleColumns));


}

module.exports = {roleDisplay, employeeDisplay, departmentDisplay};