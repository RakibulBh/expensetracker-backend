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
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Expense = new mongoose.model("Expense", expenseSchema);

module.exports = Expense;