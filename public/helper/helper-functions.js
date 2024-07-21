const { createPool } = require("../../connection/connect-pool");





const getDepartmentId = async (department) => {
    const pool = createPool();
    const query = 'SELECT id FROM department WHERE name = $1';
    const values = [department];
  
    try {
      const result = await pool.query(query, values);
      if (result.rows.length > 0) {
        return result.rows[0].id;
      } else {
        console.log('Department not found');
        return null;
      }
    } catch (error) {
      console.error('Error executing query:', error);
    }
  };

  module.exports = {getDepartmentId}