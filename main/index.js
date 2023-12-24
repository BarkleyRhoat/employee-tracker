const { table } = require('table');

const mysql = require('mysql2/promise');

let db = null;

const init = async () => {
    db = await mysql.createConnection(
        {
            host: 'localhost',
            // MySQL username, 
            user: 'root', 
            password: 'root',
            database: 'employee_db'
        }
    );
    console.log(`Connected to the employee_db database.`);
    console.log(db);
    
    // TODO use inquirer if you want

  // use prepared_statement
  // const objInput = {
  //   // must match database column and values
  //   name: "Nelson"
  // }
  // const idata = await db.query("INSERT INTO island SET ?", objInput)

  const results = await db.query("SELECT * FROM department;");

  // get data from results
  const data = results[0];
  console.log(data);

  const arrOfArr = data.map( row => Object.values(row));
  //print table
  console.log(table(arrOfArr));
}
init();