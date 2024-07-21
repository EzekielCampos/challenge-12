

const {createPool} = require('../../connection/connect-pool');
// const {tables} = require('../options/prompt-options');
const {runQuery} = require('../rows-result/display-rows');


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
        this.name = name;
        this.query = `INSERT INTO ${this.dataTable}(name) VALUES ('${this.name}');`
    }


    async addData(){

        try{
            await runQuery(this.query)

        }
        catch(error){
            console.log(error)
        }

        // const pool = createPool();

        // try{

        //     const client=  await pool.connect();
        //     console.log(this.query);

        //     const result = await pool.query(this.query);

        //     console.log(result);
            
        //     client.release();


        // }
        // catch(error){
        //     console.log(error);
        // }
        // finally{

        //     await pool.end();

        // }


    }


}



class Role extends Query{

    constructor(dataTable, title, salary, department){
        super(dataTable);
        this.title =title;
        this.salary = salary;
        this.department = department;
        this.query = `INSERT INTO ${this.dataTable}(title, salary, department_id) 
        VALUES ('${this.title}', ${this.salary}, ${this.department});`

    }

    async addData(){


        try{

        await runQuery(this.query);


        }
        catch(error){
            console.log(error);
        }


    }

        // const query = `SELECT department.id FROM department WHERE name = $1`;
        // const job = [this.department];





    }



module.exports = {Query, Department, Role};



