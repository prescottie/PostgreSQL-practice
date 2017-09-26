const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "development",
    password: "development",
    database: "vagrant"
  }
});

const name = process.argv[2];
function printResult(result) {
  console.log(`Found 1 person(s) by the name '${name}'`);
  console.log(
    `- ${result.rows[0].id}: ${result.rows[0].first_name} ${result.rows[0]
      .last_name}, born  ${result.rows[0].birthdate}`
  );
}

knex.client.connect(err => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching...");
  knex.client.query(
    "SELECT id,first_name,last_name,to_char(birthdate,'YYYY/MM/DD') as birthdate FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text",
    [name],
    (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      printResult(result);
      knex.client.end();
    }
  );
});
