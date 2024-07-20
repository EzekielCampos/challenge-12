
const inquirer = require("inquirer");

const {createPool} = require('../../connection/connect-pool');


const firstOption = async()=>{

    const pool = createPool();
    
    try{

    const response = await inquirer.prompt([

        {
            type:"list",
            message:"Which data would you like to view?",
            name:"option",
            choices: ['department', 'role', 'employee']
        },

    ]);

    console.log(response.option);

       const client=  await pool.connect();

        const result = await pool.query(`SELECT * FROM ${response.option} `);

        console.log(result.rows);
        
        client.release();


    }
    catch(error){
        console.log(error);
    }
    finally{

        await pool.end();

    }




}

async function test(){


    const response = await inquirer.prompt([

        {
            type:"list",
            message:"Hello?",
            name:"option",
            choices: ['nothing', 'tired']
        },

    ]);

    console.log(response.option);


}

// firstOption();

module.exports = {test, firstOption}