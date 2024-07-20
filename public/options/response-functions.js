
const inquirer = require("inquirer");

const {createPool} = require('../../connection/connect-pool');

const {Query} = require('../query/query-classes');

const firstOption = async()=>{

    // const pool = createPool();
    
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

    const showData = new Query(response.option);

    await showData.displayData();

    //    const client=  await pool.connect();

    //     const result = await pool.query(`SELECT * FROM ${response.option} `);

    //     console.log(result.rows);
        
    //     client.release();


    }
    catch(error){
        console.log(error);
    }
    // finally{

    //     await pool.end();

    // }

}

const secondOption= async() =>{


    const response = await inquirer.prompt([

        {
            type:"list",
            message:"What would you like to add?",
            name:"option",
            choices: ['department', 'role', 'employee']
        },

    ]);

    console.log(response.option);


}


const thirdOption= async() =>{


    const response = await inquirer.prompt([

        {
            type:"list",
            message:"Select an Employee to update?",
            name:"option",
            choices: ['employee']
        },

    ]);

    console.log(response.option);


}


module.exports = {firstOption, secondOption, thirdOption}