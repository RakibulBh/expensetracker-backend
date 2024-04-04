const express = require('express');

const Expense  = require('../models/Expense.js')
const { createExpense, getExpense, getExpenses, updateExpense, deleteExpense} = require('../controllers/expenses.js');

const requireAuth = require('../middleware/requireAuth.js')

const router = express.Router()

router.use(requireAuth);

/* Create */

router.post('/', createExpense);

/* Read */

router.get('/:id', getExpense);
router.get('/', getExpenses);

/* Update */

router.patch('/:id', updateExpense);

/* Delete */

router.delete('/:id', deleteExpense);

module.exports = router;