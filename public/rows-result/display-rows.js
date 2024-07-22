const {createPool} = require('../../connection/connect-pool')
const {tables} = require('../options/prompt-options')
const {roleDisplay, employeeDisplay, departmentDisplay} = require('./specific-displays')

const runQuery = async(queryString, type)=>{

    const pool = createPool();

    try{

        const client=  await pool.connect();

        const result = await client.query(queryString);

        const [department, role, employee] = tables;
        
     
        let rows = result.rows;

        console.log(rows);
      
        switch(type){
            case department:
                await departmentDisplay(rows);
                break;
            case role:
                await roleDisplay(rows);
                break;
            case employee:
                await employeeDisplay(rows);
                break;
        }


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