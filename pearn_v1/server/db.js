const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "#1Pastis51",
  host: "localhost",
  port: 5432,
  database: "pern_v1"
});

module.exports = pool;