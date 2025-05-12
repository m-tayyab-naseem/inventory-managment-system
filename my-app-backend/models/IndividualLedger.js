const mongoose = require('mongoose');

const individualLedgerSchema = new mongoose.Schema(
  {
    id: {type:String, required:true, unique: true},
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    installments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Installment',
      },
    ],
    dueAmount: { type: Number, required: true },
    totalAmountPaid: { type: Number, required: true },
    status: {type: String, required: true, enum:['pending','clear'] },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('IndividualLedger', individualLedgerSchema);
