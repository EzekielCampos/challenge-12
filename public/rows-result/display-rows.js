const {createPool} = require('../../connection/connect-pool')


const runQuery = async(queryString)=>{

    const pool = createPool();

    try{

        const client=  await pool.connect();

        const result = await client.query(queryString);

        const table = result.rows.map(row=>{row});

        console.table(result.rows)


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

        console.table(result.rows)
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