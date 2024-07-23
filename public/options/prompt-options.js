
// These are the prompt options for the app.js file, they are the intital options that the user can select from
const options =[

    'View company data',
    'Add to database',
    'Update employee role',
    'Exit'

];

// This array holds the different tables in the database
const tables = ['department', 'role', 'employee']



module.exports = {options, tables}