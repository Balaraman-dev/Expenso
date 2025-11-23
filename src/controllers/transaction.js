import connectDB from "../config/database.js";
import Transaction from "../models/transaction.js";
import Category from "../models/category.js";
connectDB();

const transactionadd = async (req, res) => {
    const userId = req.user ? req.user.id : null;
    const { cdate, payment, category, amount, desc, tab } = req.body;
    try {
        if (!(cdate && payment && category && amount && desc && tab)) {
            return res.render("transaction", { msg: "Fill all fields", msg_type: "error" });
        }
        let newCategory = new Category({
            name: category,
            type: tab,
            user_id: userId,
        });
        await newCategory.save();

        let newTransaction = new Transaction({
            amount: amount,
            date: cdate,
            description: desc,
            Payment: payment,
            user_id: userId,
            category_id: newCategory._id
        });
        await newTransaction.save();

        return res.status(202).redirect("/home");
    } catch (e) {
        res.status(404).json({ msg: "Error occured in transaction add" });
        console.log(e);
    }

}


const transactionUpdate = async (req, res) => {
    const userId = req.user ? req.user.id : null;
    const { transactionId, cdate, payment, category, amount, desc, tab } = req.body;
    if (!transactionId) {
        return res.status(400).render("transaction", { msg: "Missing transaction id", msg_type: "error" });
    }

    try {
        const tx = await Transaction.findOne({ _id: transactionId, user_id: userId });
        if (!tx) return res.status(404).render("transaction", { msg: "Transaction not found", msg_type: "error" });

        let cat = await Category.findById(tx.category_id);
        if (cat) {
            cat.name = category || cat.name;
            cat.type = tab || cat.type;
            cat.user_id = userId;
            await cat.save();
        } else if (category) {
            cat = new Category({ name: category, type: tab || 'other', user_id: userId });
            await cat.save();
            tx.category_id = cat._id;
        }

        tx.amount = amount || tx.amount;
        tx.date = cdate || tx.date;
        tx.description = desc || tx.description;
        tx.Payment = payment || tx.Payment;

        await tx.save();
        return res.redirect('/home');
    } catch (e) {
        console.log(e);
        return res.status(500).render('transaction', { msg: 'Error updating transaction', msg_type: 'error' });
    }
}


const transactionDelete = async (req, res) => {
    const userId = req.user ? req.user.id : null;
    const { transactionId } = req.body;
    if (!transactionId) return res.status(400).render('transaction', { msg: 'Missing transaction id', msg_type: 'error' });

    try {
        const tx = await Transaction.findOneAndDelete({ _id: transactionId, user_id: userId });
        if (!tx) return res.status(404).render('transaction', { msg: 'Transaction not found', msg_type: 'error' });

        try {
            const other = await Transaction.findOne({ category_id: tx.category_id });
            if (!other) {
                await Category.findByIdAndDelete(tx.category_id);
            }
        } catch (inner) {
            console.log('Error cleaning category', inner);
        }

        return res.redirect('/home');
    } catch (e) {
        console.log(e);
        return res.status(500).render('transaction', { msg: 'Error deleting transaction', msg_type: 'error' });
    }
}

export default { transactionadd, transactionUpdate, transactionDelete };