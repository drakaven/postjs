const settings = require("./settings"); // settings.json
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    port: settings.port,
    ssl: settings.ssl
  }
});

const pg = require('knex')({
  client: 'pg',
  connection: 'postgres://vagrant@localhost:5432/dbname',
  searchPath: 'knex,public'
});

// could use this to construct and object
const firstName = process.argv[2];
const lastName = process.argv[3];
const date = process.argv[4];


const printQuery = function (result) {
  result.rows.forEach((item) => {
    console.log(item.first_name, item.last_name);
  });
};

let callback = (err, result) => {
  if (err) {
    return console.error("error running query", err);
  }
  printQuery(result);
  client.end();
}



knex('famous_people').insert({first_name: firstName, last_name: lastName, birthdate: date})
.timeout(10000)

.then(function(response){
  console.log(response);
})
.catch(function(error) { })

.then(function(){
    knex.destroy();
});

