const sqlite3 = require('sqlite3').verbose();

// sqlite creates or opens lending.db
const db = new sqlite3.Database('./lending.db'); 

db.serialize(() => {
  // Create loans table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS loans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customerName TEXT,
      amount REAL,
      interestRate REAL,
      months INTEGER,
      emi REAL
    )
  `);

  // Create payments table to store payment history
  db.run(`
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customerName TEXT,
      paymentAmount REAL,
      paymentDate TEXT
    )
  `);
});

module.exports = db;
