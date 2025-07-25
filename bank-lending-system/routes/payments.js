// routes/payments.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /payments
router.post("/", (req, res) => {
  const { customerName, amount } = req.body;

  if (!customerName || !amount) {
    return res.status(400).json({ message: "Missing customerName or amount" });
  }

  // Step 1: Check if customer has an active loan
  db.get("SELECT * FROM loans WHERE customerName = ?", [customerName], (err, row) => {
    if (err) {
      return res.status(500).json({ message: "DB error", error: err });
    }

    if (!row) {
      return res.status(404).json({ message: "Loan not found" });
    }

    const updatedAmount = row.amount - parseFloat(amount);

    // Step 2: Update loan balance
    db.run("UPDATE loans SET amount = ? WHERE customerName = ?", [updatedAmount, customerName], function (err) {
      if (err) {
        return res.status(500).json({ message: "Update failed", error: err });
      }

      const paymentDate = new Date().toISOString();

      // Step 3: Record payment in payments table
      db.run("INSERT INTO payments (customerName, paymentAmount, paymentDate) VALUES (?, ?, ?)",
        [customerName, amount, paymentDate], function (err) {
          if (err) {
            return res.status(500).json({ message: "Payment log failed", error: err });
          }

          return res.status(200).json({
            message: "Payment successful",
            updatedLoan: {
              customerName,
              originalAmount: row.amount,
              paidAmount: amount,
              remainingAmount: updatedAmount
            }
          });
        });
    });
  });
});

module.exports = router;
