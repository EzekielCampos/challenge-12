
const inquirer = require("inquirer");

const {pool} = require('../../connection/connect-pool');



const firstOption = async()=>{

    try{

        const client = await pool.connect();

        const result = await client.query('SELECT * FROM department;');

        console.log(result.rows);
        
        client.release();


    }
    catch(error){
        await pool.end();
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