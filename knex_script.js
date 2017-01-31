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


const queryName = process.argv[2];
console.log(queryName);

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




knex.select().from('famous_people').where( 'first_name' , queryName).orWhere('last_name' , queryName)
.timeout(10000)

.then(function(response){
  console.log(response);
})
.catch(function(error) { })

.then(function(){
    knex.destroy();
});

