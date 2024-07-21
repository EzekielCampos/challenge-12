

const {createPool} = require('../../connection/connect-pool');
// const {tables} = require('../options/prompt-options');
const {runQuery, safeQuery} = require('../rows-result/display-rows');


class Query
{
    constructor(dataTable){

        this.dataTable = dataTable;
        this.query = `SELECT * FROM ${this.dataTable}`;

    }


    async displayData(){

    try{

        await runQuery(this.query);


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



