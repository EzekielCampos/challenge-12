

const {createPool} = require('../../connection/connect-pool');


class Query
{
    constructor(dataTable){

        this.dataTable = dataTable;

    }


    async displayData(){
        const pool = createPool();

        try{

            const client=  await pool.connect();

            const result = await pool.query(`SELECT * FROM ${response.option} `);

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

module.exports = {Query};



