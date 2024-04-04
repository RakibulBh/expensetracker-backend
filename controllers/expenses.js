const Expense = require('../models/Expense.js');

/* Create */

const createExpense = async (req, res) => {

    const { title , category, amount} = req.body;

    try {
        const newExpense = await Expense.create({title, category, amount, userId: req.user._id});
        res.status(200).json(newExpense)
    } catch(error) {
        res.status(400).json({ message: error.message });
    }

}

/* Read */

const getExpense = async (req, res) => {

    const {id} = req.params;

    const expense = await Expense.findOne({id});

    if (!expense) return res.status(400).json({message: 'expense not found'});

    return res.status(200).json(expense);

}

const getExpenses = async (req, res) => {

    const expenses = await Expense.find({userId: req.user._id}).sort({createdAt: -1});

    return res.status(200).json(expenses);
};

/* Update */

const updateExpense = async (req, res) => {
    const { id } = req.params;

    const newData = req.body; 

    try {
        const updatedExpense = await Expense.findByIdAndUpdate(id, newData, { new: true });
        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        
        const user = req.user._id

        const expenses = await Expense.find({userId: user}).sort({createdAt: -1});

        res.status(200).json(expenses);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating expense' });
    }
}


/* Delete */


const deleteExpense = async (req, res) => {

    try {
        const {id} = req.params;

        const deletedExpense = await Expense.findByIdAndDelete(id);

        res.status(200).json(deletedExpense);
    } catch {
        res.status(400).json({message: 'expense not found'});
    }

}

module.exports = {
    getExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
    createExpense
}