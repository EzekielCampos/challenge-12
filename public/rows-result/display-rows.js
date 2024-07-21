const {createPool} = require('../../connection/connect-pool')


const runQuery = async(queryString)=>{

    const pool = createPool();

    try{

        const client=  await pool.connect();
        console.log(this.query);

        const result = await pool.query(queryString);

        console.log(result.rows)
        client.release();


    }
    catch(error){
        console.log(error);
    }
    finally{

        await pool.end();

    }


}

module.exports = {runQueryQuery}