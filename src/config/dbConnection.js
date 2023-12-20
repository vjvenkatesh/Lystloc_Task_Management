const sql=require("mysql2");


const pool=sql.createPool({
    host:process.env.MYSQL_URL,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE,
    namedPlaceholders: true,
}).promise();


module.exports=pool;
