const express = require('express');
const router = express.Router();
const { createLoan, getAllLoans, updateLoan, deleteLoan,getLoanById } = require('../models/loanModel');

const calculateEMI = (P, R, N) => {
  const monthlyRate = R / (12 * 100);
  return (P * monthlyRate * Math.pow(1 + monthlyRate, N)) /
         (Math.pow(1 + monthlyRate, N) - 1);
};

router.post('/', (req, res) => {
  const { customerName, amount, interestRate, months } = req.body;

  if (!customerName || !amount || !interestRate || !months) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const emi = parseFloat(calculateEMI(amount, interestRate, months).toFixed(2));

  const loanData = {
    customerName,
    amount,
    interestRate,
    months,
    emi
  };

  createLoan(loanData, (err, newLoan) => {
    if (err) return res.status(500).json({ message: 'DB Error', error: err });
    res.status(201).json({ message: 'Loan created successfully', loan: newLoan });
  });
});




// GET all loans
router.get('/', (req, res) => {
  getAllLoans((err, loans) => {
    if (err) return res.status(500).json({ message: 'DB Error', error: err });
    res.status(200).json(loans);
  });
});





// PUT /loans/:id → Update loan
router.put('/:id', (req, res) => {
  const { customerName, amount, interestRate, months } = req.body;

  if (!customerName || !amount || !interestRate || !months) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const emi = parseFloat(calculateEMI(amount, interestRate, months).toFixed(2));
  const updatedData = { customerName, amount, interestRate, months, emi };

  updateLoan(req.params.id, updatedData, (err, updatedLoan) => {
    if (err) return res.status(500).json({ message: 'DB Error', error: err });
    res.status(200).json({ message: 'Loan updated successfully', loan: updatedLoan });
  });
});





// DELETE /loans/:id → Delete a loan
router.delete('/:id', (req, res) => {
  deleteLoan(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ message: 'DB Error', error: err });
    res.status(200).json(result);
  });
});



router.get('/:id', (req, res) => {
  getLoanById(req.params.id, (err, loan) => {
    if (err) return res.status(500).json({ message: 'DB Error', error: err });
    if (!loan) return res.status(404).json({ message: 'Loan not found' });
    res.status(200).json(loan);
  });
});



module.exports = router;

/*routes/loans.js is like a reception desk: it takes loan requests, checks them, calculates EMI, and tells the staff (model) to store it.

models/loanModel.js is like the accounting staff: they actually enter the loan into the database.*/