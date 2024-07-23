const validator = require('validator');

const verifySalary = (input) =>  validator.isDecimal(value.trim()) || 'Invalid number entered';

const verifyNames = (input)=>  !validator.isEmpty(value.trim()) && validator.isAlpha(value)|| 'Enter a valid response';

module.exports({verifyNames, verifySalary});