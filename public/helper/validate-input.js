const validator = require('validator');
// Validates that it contains only numbers
const verifySalary = async(input) =>  {

    try{
        return validator.isNumeric(input)|| 'Invalid number entered';
    }
    catch(error){
        console.log(error);
    }
}

const verifyNames = async(input)=>  {
    try{
        // This will check for only letters and spaces if it's between words
        const regex = /^[a-zA-Z\s]+$/;
        // Validates that string is not empty and that it only has words
        return !validator.isEmpty(input.trim()) && regex.test(input.trim())|| 'Enter a valid response';
    }
    catch(error){
        console.log(error);
    }
   
}

module.exports = {verifyNames, verifySalary} ;