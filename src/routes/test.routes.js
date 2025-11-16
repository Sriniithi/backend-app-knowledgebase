const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.get("/db-test", async (req, res) => {
  try {
    await sql.connect(require("../config/db").config);
    const result = await sql.query`SELECT GETDATE() AS Now`;
    res.json({ message: "DB Connected!", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
