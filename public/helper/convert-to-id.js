const { createPool } = require("../../connection/connect-pool");


const getDepartmentId = async (department) => {
    // Gives access to the database 
    const pool = createPool();
    // This is the query to get the id number of a particular department
    const query = 'SELECT id FROM department WHERE name = $1';
    // This is the placeholder that will be used for the parameterized query
    const values = [department];
  
    try {
      // Connect to the database 
        const client = await pool.connect()
        // This query will find the id of the department using the name
      const result = await client.query(query, values);
      // If the results return something then the id will be returned
      if (result.rows.length > 0) {
        client.release();
        return result.rows[0].id;
      } else {
        // If the array is empty then that department does not exist
        console.log('Department not found');
        client.release();
        return null;
      }
    } catch (error) {
      console.error('Error executing query:', error);
    }finally{

      // This will exit out of the database
        pool.end();
      
      }
  };


const getRoleId = async (position) => {
    //This makes a connection to the database 
    const pool = createPool();
    // This query will get the id of the job title that is presented
    const query = 'SELECT id FROM role WHERE title = $1';
    // Placeholder value to be used for parameterized query
    const values = [position];
  
    try {
      // This gives access to the database
        const client = await pool.connect();
      // The query will look for the id of the title
      const result = await client.query(query, values);
      // If the the title is found in the database then it will return an id
      if (result.rows.length > 0) {
        client.release();
        return result.rows[0].id;
        // If the title does not exist it will return null
      } else {
        console.log('Role not found');
        client.release();
        return null;
      }
    } catch (error) {
      console.error('Error executing query:', error);
    }finally{

      // Disconnects from the database
        pool.end();
      
      }
  };


  const getEmployeeId = async (firstName, lastName) => {
    // Gives access to the database
    const pool = createPool();
    // This will get the employee id from their first and last name
    const query = 'SELECT id FROM employee WHERE first_name = $1 AND last_name = $2;';
    // Placeholder value to be used for parameterized query
    const values = [firstName, lastName];
  
    try {
        const client = await pool.connect();
        // This will look through the database to try and find the employee id
      const result = await client.query(query, values);
      // If the employee name is found then i it will return the id
      if (result.rows.length > 0) {
        client.release();
        return result.rows[0].id;
      } 
      // If not then it will return null and the id does not exist
      else {
        console.log('Employee not found');
        client.release();
        return null;
      }
    } catch (error) {
      console.error('Error executing query:', error);
    }finally{
      // Disconnects from the database
        pool.end();
      
      }
  };


  module.exports= {getRoleId, getDepartmentId, getEmployeeId};