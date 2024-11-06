const express = require("express");
const { Pool } = require("pg");
const app = express();
const port = 3000;

app.use(express.json({ limit: "50mb" }));

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.post("/information", async (req, res) => {
  const { itens } = req.body;

  if (!itens || !Array.isArray(itens)) {
    return res.status(400).json({ error: "Itens is not an array" });
  }

  const values = [];
  const placeholders = itens
    .map(({ name, email, type, cellphone }, index) => {
      const offset = index * 4;
      values.push(name, email, type, cellphone);
      return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4})`;
    })
    .join(", ");

  const query = `
        INSERT INTO informations (name, email, type, cellphone) 
        VALUES ${placeholders}
    `;

  try {
    await pool.query(query, values);
    res.json({ createdItens: itens.length });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function startServer() {
  await pool.connect();
  app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
  });
}

startServer();
