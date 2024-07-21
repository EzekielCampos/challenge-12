const { createPool } = require("../../connection/connect-pool");



 


const getListOfDepartments = async()=>{

    const pool = createPool();
    const query = 'SELECT name FROM department';

    try{

        const client = await pool.connect();
        const result = await client.query(query);
        const departmentNames = result.rows.map(row => row.name);
        client.release();
        return departmentNames;

    }
    catch(error){
        console.log(error);
    }
    finally{

        pool.end();

    }

}


const getListOfEmployees = async()=>{

    const pool = createPool();
    const query = 'SELECT first_name,last_name FROM employee';

    try{

        const client = await pool.connect();
        const result = await client.query(query);
        const employeesNames = result.rows.map(row => row.first_name + " " + row.last_name);
        client.release();
        return employeesNames;

    }
    catch(error){
        console.log(error);
    }
    finally{

        pool.end();

    }

}

const getListOfRoles = async()=>{

    const pool = createPool();
    const query = 'SELECT title FROM role';

    try{

        const client = await pool.connect();
        const result = await client.query(query);
        const departmentNames = result.rows.map(row => row.title);
        client.release();
        return departmentNames;

    }
    catch(error){
        console.log(error);
    }
    finally{

        pool.end();

    }

}




  module.exports = {getListOfDepartments, getListOfEmployees,getListOfRoles}