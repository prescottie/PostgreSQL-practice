const knexSettings = require("./knexsettings");
const knex = require("knex")(knexSettings);

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
