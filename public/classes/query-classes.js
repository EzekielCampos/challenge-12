
// Functions gives access to database
const {createPool} = require('../../connection/connect-pool');
//  These functions will perform the query operations that are passed in 
const {runQuery, safeQuery} = require('../rows-result/display-rows');
const {tables} = require('../options/prompt-options');


// This is the base class that holds the necessary parameters to display the data to the user
class Query
{
    constructor(dataTable){

        // This attribute is the table that is currently being used 
        this.dataTable = dataTable;
        // This query will output all the department data 
        this.department = `SELECT * FROM ${this.dataTable}`;


        this.role = `SELECT role.id, role.title, role.salary, department.name AS department FROM ${this.dataTable}
        LEFT JOIN department ON role.department_id = department.id`;

        // This attribute will hold a specific query to list all the information about the employee and join all tables
        this.employee = `SELECT e.id AS employee_id,
        e.first_name AS employee_first_name,
        e.last_name AS employee_last_name, department.name AS Department,
        role.title AS Title, role.salary AS Salary,   
        CASE WHEN m.first_name IS NOT NULL AND m.last_name IS NOT NULL THEN CONCAT(m.first_name, ' ', m.last_name)
        ELSE 'NULL' END AS manager
        FROM ${this.dataTable} e LEFT JOIN employee m ON e.manager_id = m.id
    JOIN role ON e.role_id = role.id
    JOIN department ON role.department_id = department.id ORDER BY e.id;` 

    }


    // This method will use the attributes to display the data
    async displayData(){

    try{

        const [department, role, employee] = tables;

        switch(this.dataTable){
            case department:
                await runQuery(this.department, this.dataTable);
                break;
            case role:
                await runQuery(this.role, this.dataTable);
                break;
            case employee:
                await runQuery(this.employee, this.dataTable);
                break;
        }




    }
        catch(error){
            console.log (error);
        }
    }
       


}

// The Department class will be used to add a new department to the database
class Department extends Query{

    // The constructor takes the type of table which is Department and the name of the new department
    constructor(dataTable, name){
        super(dataTable);
        // This is an array so that this value can be used in the parameterized query to avoid injections
        this.name = [name];
        this.query = `INSERT INTO ${this.dataTable}(name) VALUES ($1);`
    }


    async addData(){

        try{
            // The safeQuery function is used to display the table
            await safeQuery(this.query, this.name)

        }
        catch(error){
            console.log(error)
        }


    }


}


// The Role class is used to add a new role to the database
class Role extends Query{

    // All the necessary columns needed to added a role to the database
    constructor(dataTable, title, salary, department){
        super(dataTable);
        this.title =title;
        this.salary = salary;
        this.placeholder= [title, salary];
        this.department = department;
        // This query is used to add a new job to the table
        this.query = `INSERT INTO ${this.dataTable}(title, salary, department_id) 
        VALUES ($1, $2, ${this.department});`

    }

    async addData(){


        try{
        // The safeQuery function is used to display the table
        await safeQuery(this.query, this.placeholder);
        }
        catch(error){
            console.log(error);
        }

    }

    }



// This class will help create a new employee to add to the database
class Employee extends Query{
        // These parameters are the necessary columns needed to create a new employee
        constructor(dataTable, firstName, lastName, role, manager){
            super(dataTable);
            this.firstName = firstName;
            this.lastName = lastName;
            this.placeholder = [firstName, lastName];
            this.role = role;
            this.manager = manager;
            // This query will insert a new employee to the table
            this.query = `INSERT INTO ${this.dataTable}(first_name, last_name, role_id, manager_id) 
        VALUES ($1, $2, ${this.role}, ${this.manager});`;
        }

        async addData(){
            
            try{
                // The safeQuery function is used to display the table
                await safeQuery(this.query, this.placeholder);
            
            }
            catch(error){
                console.log(error);
            }

        }

    }



module.exports = {Query, Department, Role, Employee};



