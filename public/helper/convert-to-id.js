const { createPool } = require("../../connection/connect-pool");

const getDepartmentId = async (department) => {
    const pool = createPool();
    const query = 'SELECT id FROM department WHERE name = $1';
    const values = [department];
  
    try {
        const client = await pool.connect()
      const result = await client.query(query, values);
      if (result.rows.length > 0) {
        client.release();
        return result.rows[0].id;
      } else {
        console.log('Department not found');
        client.release();
        return null;
      }
    } catch (error) {
      console.error('Error executing query:', error);
    }finally{

        pool.end();
      
      }
  };


const getRoleId = async (position) => {
    const pool = createPool();
    const query = 'SELECT id FROM role WHERE title = $1';
    const values = [position];
  
    try {
        const client = await pool.connect()
      const result = await client.query(query, values);
      if (result.rows.length > 0) {
        client.release();
        return result.rows[0].id;
      } else {
        console.log('Department not found');
        client.release();
        return null;
      }
    } catch (error) {
      console.error('Error executing query:', error);
    }finally{

        pool.end();
      
      }
  };

  const getEmployeeId = async (firstName, lastName) => {
    const pool = createPool();
    const query = 'SELECT id FROM employee WHERE first_name = $1 AND last_name = $2;'
    const values = [firstName, lastName];
  
    try {
        const client = await pool.connect()
      const result = await client.query(query, values);
      if (result.rows.length > 0) {
        client.release();
        return result.rows[0].id;
      } else {
        console.log('Department not found');
        client.release();
        return null;
      }
    } catch (error) {
      console.error('Error executing query:', error);
    }finally{

        pool.end();
      
      }
  };


  module.exports= {getRoleId, getDepartmentId, getEmployeeId};