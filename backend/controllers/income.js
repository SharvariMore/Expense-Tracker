const IncomeSchema = require("../models/incomeModel");

exports.addIncome = async (req, res) => {
    const { title, amount, date, category, description } = req.body;

    const income = IncomeSchema({
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
        await income.save();
        res.status(200).json({message: 'Income Added!'});
    } catch (error) {
        res.status(500).json({message: 'Server Error!'})
    }

    console.log(income);
}

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1});
        res.status(200).json(incomes); 
    } catch (error) {
        res.status(500).json({message: 'Server Error!'})
    }    
}

exports.deleteIncomes = async (req, res) => {
   const { id } = req.params;
   IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
        res.status(200).json({message: 'Income Deleted!'}); 
    })
    .catch((error) => {
        res.status(500).json({message: 'Server Error!'}); 
    })
}