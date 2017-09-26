const pg = require("pg");
const db = require("./db");
const name = process.argv[2];

function printPerson(person) {
  console.log(
    `- ${person.id}: ${person.first_name} ${person.last_name}, born  ${person.birthdate}`
  );
}

function printFindNameResults(result) {
  console.log(`Found ${result.rows.length} person(s) by the name '${name}':`);
  result.rows.forEach(printPerson);
}
function findPersonByName(done) {
  db.connect((error, client) => {
    console.log("Searching ...");
    client.query(
      "SELECT id,first_name,last_name,to_char(birthdate,'YYYY/MM/DD') as birthdate FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text",
      [name],
      (err, result) => {
        if (err) {
          return console.error("error running query", err);
        }
        done(result);
        db.close(client);
      }
    );
  });
}
findPersonByName(printFindNameResults);
