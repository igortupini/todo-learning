var { Pool } = require('pg');

//Database Config
var pool = new Pool({
    user: process.env.PGUSER,
    host: 'localhost',
    database: process.env.PGDB,
    password: process.env.PGPASS,
    port: '5432'
});

pool.connect();

module.exports = {
    query: (text,params,callback)=>{
        return pool.query(text,params,callback);
    }
}