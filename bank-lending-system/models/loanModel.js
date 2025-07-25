const db = require('../db');

const createLoan = (loanData, callback) => {
  const { customerName, amount, interestRate, months, emi } = loanData;
  db.run(
    `INSERT INTO loans (customerName, amount, interestRate, months, emi) VALUES (?, ?, ?, ?, ?)`,
    [customerName, amount, interestRate, months, emi],
    function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID, ...loanData });
    }
  );
};

const getAllLoans = (callback) => {
  db.all(`SELECT * FROM loans`, [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
};



const updateLoan = (id, updatedData, callback) => {
  const { customerName, amount, interestRate, months, emi } = updatedData;
  const query = `
    UPDATE loans
    SET customerName = ?, amount = ?, interestRate = ?, months = ?, emi = ?
    WHERE id = ?
  `;
  db.run(query, [customerName, amount, interestRate, months, emi, id], function (err) {
    if (err) return callback(err);
    callback(null, { id, ...updatedData });
  });
};

const deleteLoan = (id, callback) => {
  const query = `DELETE FROM loans WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) return callback(err);
    callback(null, { message: 'Loan deleted', id });
  });
};


const getLoanById = (id, callback) => {
  db.get(`SELECT * FROM loans WHERE id = ?`, [id], (err, row) => {
    if (err) return callback(err);
    callback(null, row);
  });
};


module.exports = {
  createLoan,
  getAllLoans,
  updateLoan,
  deleteLoan,
  getLoanById, // 👈 export this too
};



/*Frontend sends a loan request (user details).

Controller calculates the EMI.

This model function saves the complete loan to the loans table.

A success response is sent back to the frontend.

*/