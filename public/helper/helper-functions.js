const { createPool } = require("../../connection/connect-pool");

// This function will return an array containing all the departments in the database
const getListOfDepartments = async()=>{

    // This functions provides access to the database 
    const pool = createPool();
    // This query targets the name column from department
    const query = 'SELECT name FROM department';

    try{

        // Connect to the database
        const client = await pool.connect();
        // Now we use a query to perform a specific action
        const result = await client.query(query);
        // From the results of the query we are going to place the name of the department into an array
        const departmentNames = result.rows.map(row => row.name);
        // Once we are done accessing from the database we will release the client
        client.release();
        // Return the array of department names
        return departmentNames;

    }
    catch(error){
        console.log(error);
    }
    finally{

        // This function will call once the try block ends and will exit out of the database
        pool.end();

    }

}

// This function returns an array of all the employees names from the database
const getListOfEmployees = async()=>{
    // This functions provides access to the database 
    const pool = createPool();
    // This query targets the first and last name of the employee
    const query = 'SELECT first_name,last_name FROM employee';

    try{

        // Connect to the database
        const client = await pool.connect();
        // Now we use a query to perform a specific action
        const result = await client.query(query);
        // This will take the result and take the two attributes inside the objects and create a string for first and last name
        const employeesNames = result.rows.map(row => row.first_name + " " + row.last_name);
        // Releases the client from database
        client.release();
        return employeesNames;

    }
    catch(error){
        console.log(error);
    }
    finally{
        // This function will call once the try block ends and will exit out of the database
        pool.end();

    }

}

// This function will return an array of all the titles from the table of roles 
const getListOfRoles = async()=>{    


    // This functions provides access to the database 
    const pool = createPool();
    // This query targets the title of the job from the role table
    const query = 'SELECT title FROM role';

    try{
                

        
        // Connect to the database
        const client = await pool.connect();
        // Now we use a query to perform a specific action
        const result = await client.query(query);
        //  This will hold the array of each title that is part of the role table
        const departmentNames = result.rows.map(row => row.title);
        client.release();
        return departmentNames;

    }
    catch(error){
        console.log(error);
    }
    finally{
        // This function will call once the try block ends and will exit out of the database
        pool.end();

    }

}




  module.exports = {getListOfDepartments, getListOfEmployees,getListOfRoles}