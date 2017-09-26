const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

const name = process.argv[2];

client.connect(err => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching...");
  client.query(
    "SELECT id,first_name,last_name,to_char(birthdate,'YYYY/MM/DD') as birthdate FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text",
    [name],
    (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      console.log(`Found 1 person(s) by the name '${name}'`);
      console.log(
        `- ${result.rows[0].id}: ${result.rows[0].first_name} ${result.rows[0]
          .last_name}, born  ${result.rows[0].birthdate}`
      );
      client.end();
    }
  );
});
