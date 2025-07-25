const db = require("../db");

function createPayment(paymentData, callback) {
  const { loanId, customerName, amount } = paymentData;
  const query = 'INSERT INTO payments (loanId, customerName, amount) VALUES (?, ?, ?)';
  db.query(query, [loanId, customerName, amount], (err, result) => {
    if (err) return callback(err);
    callback(null, { id: result.insertId, ...paymentData });
  });
}

function getPayments(callback) {
  const query = 'SELECT * FROM payments';
  db.query(query, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
}

module.exports = {
  createPayment,
  getPayments
};
