const Expense = require('../models/Expense.js');
const { formatDate, getWeekStartAndEnd } = require('../helpers/formatDate.js');

/* Create */

const createExpense = async (req, res) => {

    const { title , category, amount} = req.body;

    try {
        const newExpense = await Expense.create({title, category, amount, userId: req.user._id});
        res.status(200).json(newExpense)
    } catch(error) {
        res.status(400).json({ error: error.message });
    }

}

/* Read */

const getExpense = async (req, res) => {

    const {id} = req.params;

    const expense = await Expense.findOne({id});

    if (!expense) return res.status(400).json({error: 'expense not found'});

    return res.status(200).json(expense);

}

const getExpenses = async (req, res) => {

    const expenses = await Expense.find({userId: req.user._id}).sort({createdAt: -1});

    return res.status(200).json(expenses);
};

/* Update */

const updateExpense = async (req, res) => {
    const { id } = req.params;

    let newData = req.body; 

    if (newData.createdAt) {
        newData = {
            ...newData,
            createdAt: new Date(newData.createdAt)
        };
    }

    try {

        const updatedExpense = await Expense.findByIdAndUpdate(id, newData, { new: true });
        
        if (!updatedExpense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        
        const user = req.user._id

        const expenses = await Expense.find({userId: user}).sort({createdAt: -1});

        res.status(200).json(expenses);
    } catch (error) {
        return res.status(500).json({ error: 'Error updating expense' });
    }
}


/* Delete */


const deleteExpense = async (req, res) => {

    try {
        const {id} = req.params;

        const deletedExpense = await Expense.findByIdAndDelete(id);
        
        res.status(200).json(deletedExpense);
    } catch {
        res.status(400).json({error: 'expense not found'});
    }

}

// this month

const expensesCurrentMonth = async (req, res) => {
    const today = new Date();
    const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const lastDayOfCurrentMonth = new Date(firstDayOfNextMonth - 1);

    const dateRange = `${formatDate(firstDayOfCurrentMonth)} - ${formatDate(lastDayOfCurrentMonth)}`;

    try {
        const userId = req.user._id.toString();

        const currentMonthExpenses = await Expense.find({
            userId,
            createdAt: { $gte: firstDayOfCurrentMonth, $lte: lastDayOfCurrentMonth }
        });

        res.status(200).json({ expenses: currentMonthExpenses, dateRange }); // Changed key from 'error' to 'expenses'

    } catch (e) {
        res.status(400).json({ error: 'Error fetching current month expenses' });
    }
}

// weekly expense

const expensesCurrentWeek = async (req, res) => {
    try {
        const { startOfWeek, endOfWeek } = getWeekStartAndEnd();
        const dateRange = `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;

        const userId = req.user._id.toString();

        const currentWeekExpenses = await Expense.find({
            userId,
            createdAt: { $gte: startOfWeek, $lt: endOfWeek }
        }).select('amount');

        res.status(200).json({ expenses: currentWeekExpenses, dateRange });


    } catch (e) {
        res.status(400).json({error: 'Weekly stats could not be found'});
    }
    
}

// monhtly expense

const expensesLastMonth = async (req, res) => {
    try {
        const today = new Date();
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1); // First day of last month
        const startOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
        const endOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0); // Last day of last month
        
        const dateRange = `${formatDate(startOfLastMonth)} - ${formatDate(endOfLastMonth)}`;
        const userId = req.user._id.toString();

        const lastMonthExpenses = await Expense.find({
            userId,
            createdAt: { $gte: startOfLastMonth, $lt: endOfLastMonth }
        });

        res.status(200).json({ expenses: lastMonthExpenses, dateRange });
    } catch (e) {
        res.status(400).json({ error: 'expenses not found' });
    }
};

module.exports = {
    getExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
    createExpense,
    expensesCurrentMonth,
    expensesCurrentWeek,
    expensesLastMonth
}