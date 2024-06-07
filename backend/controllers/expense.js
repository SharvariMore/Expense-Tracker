const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
    const { title, amount, date, category, description } = req.body;

    const expense = ExpenseSchema({
        title,
        amount, 
        date, 
        category,
        description
    })

    try {
        if (!title || !date || !category || !description) {
            return res.status(400).json({message: 'All Fields are required!'});
        } if (amount <= 0 || !amount === 'number' ) {
            return res.status(400).json({message: 'Amount must be postive number!'});
        }
        await expense.save();
        res.status(200).json({message: 'Expense Added!'});
    } catch (error) {
        res.status(500).json({message: 'Server Error!'})
    }

    console.log(expense);
}

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt: -1});
        res.status(200).json(expenses); 
    } catch (error) {
        res.status(500).json({message: 'Server Error!'})
    }    
}

exports.deleteExpenses = async (req, res) => {
   const { id } = req.params;
   ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
        res.status(200).json({message: 'Expense Deleted!'}); 
    })
    .catch((error) => {
        res.status(500).json({message: 'Server Error!'}); 
    })
}
