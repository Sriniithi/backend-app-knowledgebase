const sql = require('mssql');
const dotenv = require('dotenv');
dotenv.config();

const dbConfig = {
  user: process.env.AZURE_SQL_USER,
  password: process.env.AZURE_SQL_PASSWORD,
  server: process.env.AZURE_SQL_SERVER,
  database: process.env.AZURE_SQL_DB,
  options: {
    encrypt: process.env.AZURE_SQL_ENCRYPT === "true", // true for Azure SQL, false for local SQL
    trustServerCertificate: process.env.AZURE_SQL_ENCRYPT === "false", // true only for local SQL
  },
};

console.log("🔧 Database Config Loaded:", {
  server: dbConfig.server,
  database: dbConfig.database,
  encrypt: dbConfig.options.encrypt,
  trustServerCertificate: dbConfig.options.trustServerCertificate
});

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log("✔ Successfully connected to SQL database");
    return pool;
  })
  .catch(err => {
    console.error("❌ Database connection failed:", err.message);
    throw err;
  });

module.exports = { sql, poolPromise };
