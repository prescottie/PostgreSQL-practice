const knex = require("knex")({
  client: "pg",
  version: "7.2",
  connection: {
    user: "development",
    password: "development",
    database: "vagrant",
    hostname: "localhost",
    port: 5432,
    ssl: true
  }
});

const name = process.argv[2];

function printPerson(person) {
  console.log(
    `- ${person.id}: ${person.first_name} ${person.last_name}, born  ${person.birthdate}`
  );
}

function printFindNameResults(result) {
  console.log(`Found ${result.length} person(s) by the name '${name}':`);
  result.forEach(printPerson);
  process.exit();
}

function findPersonByName(done) {
  console.log("Searching...");
  knex("famous_people")
    .select("id", "first_name", "last_name", "birthdate")
    .where("first_name", name)
    .orWhere("last_name", name)
    .asCallback((err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      done(result);
    });
}

findPersonByName(printFindNameResults);
