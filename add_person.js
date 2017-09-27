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

const firstName = process.argv[2];
const lastName = process.argv[3];
const dob = process.argv[4];

function addPerson(done) {
  knex("famous_people")
    .insert({
      first_name: firstName,
      last_name: lastName,
      birthdate: dob
    })
    .asCallback((err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      done();
    });
}
addPerson(() => {
  console.log("person added");
  process.exit();
});
