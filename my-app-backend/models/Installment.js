const mongoose = require('mongoose');

const installmentSchema = new mongoose.Schema(
  {
    installmentId: { type: String, required: true, unique: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    productModelNumber: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    installmentPaid: { type: Number, required: true },
    datePaid: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Installment', installmentSchema);
