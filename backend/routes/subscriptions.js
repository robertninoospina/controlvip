const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // tu contraseña de MySQL si tienes una
  database: "subscriptions_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");
});

// Get all subscriptions
router.get("/", (req, res) => {
  connection.query("SELECT * FROM subscriptions", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get a single subscription by ID
router.get("/:id", (req, res) => {
  connection.query(
    "SELECT * FROM subscriptions WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    }
  );
});

// Create a new subscription
router.post("/", (req, res) => {
  const {
    usuario_tracker,
    usuario_discord,
    email,
    valor_pagado,
    descripcion,
    start_date,
    end_date,
  } = req.body;
  connection.query(
    "INSERT INTO subscriptions (usuario_tracker, usuario_discord, email, valor_pagado, descripcion, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      usuario_tracker,
      usuario_discord,
      email,
      valor_pagado,
      descripcion,
      start_date,
      end_date,
    ],
    (err, results) => {
      if (err) throw err;
      res.json({ id: results.insertId, ...req.body });
    }
  );
});

// Update a subscription
router.put("/:id", (req, res) => {
  const {
    usuario_tracker,
    usuario_discord,
    email,
    valor_pagado,
    descripcion,
    start_date,
    end_date,
  } = req.body;
  connection.query(
    "UPDATE subscriptions SET usuario_tracker = ?, usuario_discord = ?, email = ?, valor_pagado = ?, descripcion = ?, start_date = ?, end_date = ? WHERE id = ?",
    [
      usuario_tracker,
      usuario_discord,
      email,
      valor_pagado,
      descripcion,
      start_date,
      end_date,
      req.params.id,
    ],
    (err, results) => {
      if (err) throw err;
      res.json({ id: req.params.id, ...req.body });
    }
  );
});

// Delete a subscription
router.delete("/:id", (req, res) => {
  connection.query(
    "DELETE FROM subscriptions WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) throw err;
      res.json({ message: "Subscription deleted" });
    }
  );
});

module.exports = router;
