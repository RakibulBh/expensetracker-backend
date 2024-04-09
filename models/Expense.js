const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        min: 0,
        max: 1000000,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
}, {
  timestamps: false
})

const Expense = new mongoose.model("Expense", expenseSchema);

module.exports = Expense;