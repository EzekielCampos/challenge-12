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




  module.exports = {getDepartmentId, getListOfDepartments}