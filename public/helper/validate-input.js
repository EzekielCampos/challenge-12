const validator = require('validator');
// Validates that it contains only numbers
const verifySalary = (input) =>  {


        return validator.isNumeric(input)|| 'Invalid number entered';
   
   
}

const verifyNames = (input)=>  {
    
    // This will check for only letters and spaces if it's between words
    const regex = /^[a-zA-Z\s]+$/;
    // Validates that string is not empty and that it only has words
    return !validator.isEmpty(input.trim()) && regex.test(input.trim())|| 'Enter a valid response';

   
}

module.exports = {verifyNames, verifySalary} ;