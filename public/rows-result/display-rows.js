const {createPool} = require('../../connection/connect-pool')


const runQuery = async(queryString)=>{

    const pool = createPool();

    try{

        const client=  await pool.connect();

        const result = await client.query(queryString);
        
        const rows = result.rows;
        const table = rows.map(row => ({ ...row }));

        console.table(table);


        client.release();


    }
    catch(error){
        console.log(error);
    }
    finally{

        await pool.end();

    }


}

const safeQuery = async(queryString, value)=>{

    const pool = createPool();

    try{

        const client=  await pool.connect();

        const result = await client.query(queryString, value);
       

        client.release();


    }
    catch(error){
        console.log(error);
    }
    finally{

        await pool.end();

    }


}

module.exports = {runQuery, safeQuery}