const mongoose = require('mongoose');

const expenseLedgerSchema = new mongoose.Schema(
  {
    description: { type: String, required: true, trim: true },
    amountPaid: { type: Number, required: true },
    expenseType: { type: String, enum: ['food', 'installments', 'other'], required: true },
    expenseId: { type: Number, required: true, unique: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ExpenseLedger', expenseLedgerSchema);
