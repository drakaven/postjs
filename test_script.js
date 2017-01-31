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

const queryName = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log(queryName);
  //client.query("SELECT $1::int AS number", ["1"], (err, result) => {
  client.query("SELECT * FROM famous_people where UPPER(first_name) = UPPER($1::text) or UPPER(last_name) = UPPER($1::text)", [queryName], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    
    //console.log(result);
    console.log(result.rowCount); //output: 1


    client.end();
  });
});