

const {createPool} = require('../../connection/connect-pool');
// const {tables} = require('../options/prompt-options');


class Query
{
    constructor(dataTable){

        this.dataTable = dataTable;

    }


    async displayData(){
        const pool = createPool();

        try{

            const client=  await pool.connect();

            const result = await pool.query(`SELECT * FROM ${this.dataTable} `);

            console.log(result.rows);
            
            client.release();


        }
        catch(error){
            console.log(error);
        }
        finally{

            await pool.end();

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

        const pool = createPool();

        try{

            const client=  await pool.connect();
            console.log(this.query);

            const result = await pool.query(this.query);

            console.log(result);
            
            client.release();


        }
        catch(error){
            console.log(error);
        }
        finally{

            await pool.end();

        }


    }


}

module.exports = {Query, Department};



