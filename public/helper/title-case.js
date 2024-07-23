
// This function removes extra whitespace and capitalize the first letter of the word
const titleCase = (input) =>{


    input = input.trim();
    return input.split(' ')
    .map(word=> word.charAt(0).toUpperCase()+ word.slice(1).toLowerCase())
    .join(' ');
   
  };

  module.exports = {titleCase};