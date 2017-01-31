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

const printQuery = function (result) {
  result.rows.forEach((item) => {
    console.log(item.first_name);
  });
};

let callback = (err, result) => {
  if (err) {
    return console.error("error running query", err);
  }
  printQuery(result);
  client.end();
}

let template = "SELECT * FROM famous_people where UPPER(first_name) = UPPER($1::text) or UPPER(last_name) = UPPER($1::text)";

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(template, [queryName], callback);
});
