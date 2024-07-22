

const {createPool} = require('../../connection/connect-pool');
// const {tables} = require('../options/prompt-options');
const {runQuery, safeQuery} = require('../rows-result/display-rows');
const test = 'employee'


class Query
{
    constructor(dataTable){

        this.dataTable = dataTable;
        this.query = `SELECT * FROM ${this.dataTable}`;
        this.employee = `SELECT e.id AS employee_id,
        e.first_name AS employee_first_name,
        e.last_name AS employee_last_name, department.name AS Department,
        role.title AS Title, role.salary AS Salary,   
        CASE WHEN m.first_name IS NOT NULL AND m.last_name IS NOT NULL THEN CONCAT(m.first_name, ' ', m.last_name)
        ELSE 'NULL' END AS manager
        FROM ${this.dataTable} e  LEFT JOIN employee m ON e.manager_id = m.id
    JOIN role ON e.role_id = role.id
    JOIN department ON role.department_id = department.id;` 

    }


    async displayData(){

    try{

        if(this.dataTable == test) {
            await runQuery(this.employee, this.dataTable);
        }

        else{
            await runQuery(this.query,this.dataTable);

        }


    }
        catch(error){
            console.log (error);
        }
    }
       


}


class Department extends Query{

    constructor(dataTable, name){
        super(dataTable);
        this.name = [name];
        this.query = `INSERT INTO ${this.dataTable}(name) VALUES ($1);`
    }


    async addData(){

        try{
            await safeQuery(this.query, this.name)

        }
        catch(error){
            console.log(error)
        }


    }


}



class Role extends Query{

    constructor(dataTable, title, salary, department){
        super(dataTable);
        this.title =title;
        this.salary = salary;
        this.placeholder= [title, salary];
        this.department = department;
        this.query = `INSERT INTO ${this.dataTable}(title, salary, department_id) 
        VALUES ($1, $2, ${this.department});`

    }

    async addData(){


        try{

        await safeQuery(this.query, this.placeholder);


        }
        catch(error){
            console.log(error);
        }


    }

    }




    class Employee extends Query{

        constructor(dataTable, firstName, lastName, role, manager){
            super(dataTable);
            this.firstName = firstName;
            this.lastName = lastName;
            this.placeholder = [firstName, lastName];
            this.role = role;
            this.manager = manager;
            this.query = `INSERT INTO ${this.dataTable}(first_name, last_name, role_id, manager_id) 
        VALUES ($1, $2, ${this.role}, ${this.manager});`;
        }

        async addData(){
            
            try{

                await safeQuery(this.query, this.placeholder);
            
            }
            catch(error){
                console.log(error);
            }


        }


    }



module.exports = {Query, Department, Role, Employee};



