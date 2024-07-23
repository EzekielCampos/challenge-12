// Gives access to database
const {createPool} = require('../../connection/connect-pool')
// This holds the array of the table names from the database
const {tables} = require('../options/prompt-options')
// This will display specific tables and information for each table from the database
const {roleDisplay, employeeDisplay, departmentDisplay} = require('./specific-displays')

// This function will run the query that do not have user text inputs
const runQuery = async(queryString, type)=>{

    // This gives access to the database
    const pool = createPool();

    try{
        // This connects client directly to the database to perform some action
        const client=  await pool.connect();
        // This will run the query string and return an array
        const result = await client.query(queryString);

        // Depending on what table is used this will be used for the switch options
        const [department, role, employee] = tables;
        
        let rows = result.rows;
        // Since each table has different columns and different data that needs to be displayed, each table has a unique function to display the info
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


        // Release the client from the database 
        client.release();


    }
    catch(error){
        console.log(error);
    }
    finally{

        // Disconnects from the database
        await pool.end();

    }


}

// This function is a parameterized query for user input that were logged in, mainly used to add new data
const safeQuery = async(queryString, value)=>{

    const pool = createPool();

    try{
        // Connects client directly to the database
        const client=  await pool.connect();
        // This will perform the query operation
        const result = await client.query(queryString, value);
       

        client.release();


    }
    catch(error){
        console.log(error);
    }
    finally{
        // Disconnects from the database
        await pool.end();

    }


}

module.exports = {runQuery, safeQuery}