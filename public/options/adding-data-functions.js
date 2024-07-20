
const inquirer = require('inquirer');

const {Department}= require('../query/query-classes');




const addingDepartment = async(table)=>{

    try{
        const response = await inquirer.prompt([

            {
                type:"text",
                message:"What is the name of the department",
                name:"nameOfDepartment",
            },
    
        ]);
    
    
        const {nameOfDepartment} = response;
    
        const dept = new Department(table, nameOfDepartment);
    
        await dept.addData();

    }
    catch(error){

        console.log(error);
    }


    




}





module.exports = {addingDepartment}